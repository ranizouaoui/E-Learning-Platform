package in.pfe.elearning.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import in.pfe.elearning.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private String id;
	private String username;
	private String email;

	@JsonIgnore
	private String password;
	private Boolean verified;

	private Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImpl(String id, String email, String password,
			Collection<? extends GrantedAuthority> authorities,boolean v) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.authorities = authorities;
		this.verified=v;
	}



	public static UserDetailsImpl build(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name()))
				.collect(Collectors.toList());

		return new UserDetailsImpl(
				user.getId(), 
				user.getEmail(),
				user.getPassword(), 
				authorities,
				user.getVerified()
		);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public String getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}



	public Boolean getVerified() {
		return verified;
	}

	@Override
	public String getUsername() {
		return username;
	}


	@Override
	public String getPassword() {
		return password;
	}


	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}
}
