package in.pfe.elearning.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import in.pfe.elearning.entity.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import in.pfe.elearning.entity.Role.ERole;
import in.pfe.elearning.payload.request.ForgotPasswordRequest;
import in.pfe.elearning.payload.request.LoginRequest;
import in.pfe.elearning.payload.request.ResetPasswordRequest;
import in.pfe.elearning.payload.request.SignupRequest;
import in.pfe.elearning.payload.response.JwtResponse;
import in.pfe.elearning.payload.response.MessageResponse;
import in.pfe.elearning.repository.ParentRepository;
import in.pfe.elearning.repository.PasswordResetTokenRepository;
import in.pfe.elearning.repository.RoleRepository;
import in.pfe.elearning.repository.TeacherRepository;
import in.pfe.elearning.repository.UserRepository;
import in.pfe.elearning.security.jwt.JwtUtils;
import in.pfe.elearning.security.services.UserDetailsImpl;
import in.pfe.elearning.services.EmailService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final ParentRepository parentRepository;
    private final TeacherRepository teacherRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
	private final PasswordResetTokenRepository passwordResetTokenRepository;
	private final EmailService emailService;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, ParentRepository parentRepository, TeacherRepository teacherRepository, RoleRepository roleRepository, PasswordEncoder encoder,PasswordResetTokenRepository passwordResetTokenRepository , EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.parentRepository = parentRepository;
        this.teacherRepository = teacherRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
		this.passwordResetTokenRepository = passwordResetTokenRepository;
		this.emailService = emailService;
    }

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());



		return ResponseEntity.ok(new JwtResponse(jwt,
												 userDetails.getId(),
												 userDetails.getEmail(),

												 roles,
				userDetails.getVerified()
		));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		System.out.println(signUpRequest.getTel());

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}
		final Parent[] parent = {null};
		final Teacher[] teacher = {null};
		// Create new user's account
		User user = new User(
							 signUpRequest.getFirstname(),
							 signUpRequest.getLastname(),
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()),
							 signUpRequest.getDate_of_birth(),
				             signUpRequest.getTel()

							 );

		Set<String> strRoles = signUpRequest.getRoles();
		List<Role> roles = new ArrayList();
		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_PARENT)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);

		} else {

			strRoles.forEach(role -> {
				switch (role) {
				case "ROLE_TEACHER":
					Role modRole = roleRepository.findByName(ERole.ROLE_TEACHER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);
					teacher[0] = user.toTeacher();
					break;
				case "ROLE_ADMIN":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_PARENT)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
					parent[0] = user.toParent();
				}
			});
		}
		if (signUpRequest.getRoles().contains("ROLE_TEACHER")) {
			teacher[0].setRoles(roles);
			teacher[0].setTeacherverification(signUpRequest.getTeacherverification());
			teacherRepository.save(teacher[0]);
		} 
		else if (signUpRequest.getRoles().contains("ROLE_ADMIN")) {
			user.setRoles(roles);
			userRepository.save(user);
		}
		else {
			parent[0].setRoles(roles);
			parentRepository.save(parent[0]);
		}
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
		Optional<User> userOptional = userRepository.findByEmail(forgotPasswordRequest.getEmail());
		if (!userOptional.isPresent()) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: User does not exist!"));
		}

		User user = userOptional.get();
		String token = UUID.randomUUID().toString();
		passwordResetTokenRepository.save(new PasswordResetToken(token, user));
		emailService.sendPasswordResetEmail(user.getEmail(), token);
		return ResponseEntity.ok(new MessageResponse("Password reset email sent!"));
	}

	@PostMapping("/reset-password")
public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
    Optional<PasswordResetToken> tokenOptional = passwordResetTokenRepository.findByToken(resetPasswordRequest.getToken());
    if (!tokenOptional.isPresent()) {
        return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid or expired token!"));
    }

    PasswordResetToken token = tokenOptional.get();


    if (token.getExpiryDate().isBefore(LocalDateTime.now())) {
        return ResponseEntity.badRequest().body(new MessageResponse("Error: Token has expired!"));
    }

    User user = token.getUser();
    user.setPassword(encoder.encode(resetPasswordRequest.getNewPassword()));
    userRepository.save(user);
    passwordResetTokenRepository.delete(token);

    return ResponseEntity.ok(new MessageResponse("Password reset successfully!"));
}

	@PutMapping("/verify/{id}")
	public ResponseEntity<?> verifyUser(@PathVariable String id) {
		Optional<User> userOptional = userRepository.findByEmail(id);
		if (!userOptional.isPresent()) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: User does not exist!"));
		}
		User user = userOptional.get();
		user.setVerified(true);
		userRepository.save(user);
		return ResponseEntity.ok(new MessageResponse("User verified successfully!"));
	}

	@GetMapping("/user/{email}")
	public ResponseEntity<?> getUser(@PathVariable String email) {
		Optional<User> userOptional = userRepository.findByEmail(email);
		if (!userOptional.isPresent()) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: User does not exist!"));
		}
		User user = userOptional.get();
		return ResponseEntity.ok(user);
	}
	@PutMapping("/user/update/teacher/{id}")
	public User updateuser(@PathVariable String id,@RequestBody Teacher user) {
		System.out.println(user.getRoles());

			System.out.println("hey");
			user.setId(id);
		List<Role> roles = new ArrayList();
		Role userRole = roleRepository.findByName(ERole.ROLE_TEACHER)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		roles.add(userRole);



		user.setRoles(roles);
			return teacherRepository.save(user);


	}
	@PutMapping("/user/update/parent/{id}")
	public User updateparent(@PathVariable String id,@RequestBody Parent user) {
		System.out.println(user.getRoles());


		user.setId(id);
		List<Role> roles = new ArrayList();
		Role userRole = roleRepository.findByName(ERole.ROLE_PARENT)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		roles.add(userRole);
		List<Student> students = new ArrayList();
		user.setChildren(students);
		user.setRoles(roles);

		return parentRepository.save(user);


	}










}
