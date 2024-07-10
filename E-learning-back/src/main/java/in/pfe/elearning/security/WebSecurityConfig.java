package in.pfe.elearning.security;
/* */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import in.pfe.elearning.security.jwt.AuthEntryPointJwt;
import in.pfe.elearning.security.jwt.AuthTokenFilter;
import in.pfe.elearning.security.services.UserDetailsServiceImpl;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
//(securedEnabled = true,
//jsr250Enabled = true,
//prePostEnabled = true) // by default
public class WebSecurityConfig { // extends WebSecurityConfigurerAdapter {
  @Autowired
  UserDetailsServiceImpl userDetailsService;

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }

//@Override
//public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
//  authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
//}

  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder());

    return authProvider;
  }

//@Bean
//@Override
//public AuthenticationManager authenticationManagerBean() throws Exception {
//  return super.authenticationManagerBean();
//}

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

//@Override
//protected void configure(HttpSecurity http) throws Exception {
//  http.cors().and().csrf().disable()
//    .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
//    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//    .authorizeRequests().antMatchers("/api/auth/**").permitAll()
//    .antMatchers("/api/test/**").permitAll()
//    .anyRequest().authenticated();
//
//  http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
//}


@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
      .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authorizeHttpRequests(auth -> auth
        /*
        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**", "/webjars/**").permitAll()
        .requestMatchers("/api/auth/**").permitAll()
        .requestMatchers("/api/courses/courses", "/api/courses/schoolLevel/**").permitAll()
        .requestMatchers("/api/courses/").authenticated()
        .requestMatchers("/api/Parents/**").hasAnyRole("PARENT", "ADMIN")
        .requestMatchers("/api/Teachers/**").hasAnyRole("TEACHER", "ADMIN")
        .requestMatchers("/api/tests/teacherID/**").hasAnyRole("TEACHER") 
        .requestMatchers("/api/tests/schoolLevel/**").hasAnyRole("TEACHER")  
        .requestMatchers("/api/tests/testId/**").hasAnyRole("TEACHER")
        .requestMatchers("/api/tests/**").hasAnyRole("STUDENT", "ADMIN")
        .requestMatchers("/corrections/**").hasAnyRole("TEACHER", "ADMIN", "STUDENT")
        .requestMatchers("/meetings/**").hasAnyRole("TEACHER", "ADMIN", "STUDENT")
        .requestMatchers("/api/auth/**").permitAll()
        */
        .anyRequest().permitAll()
      );

    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
}
}
