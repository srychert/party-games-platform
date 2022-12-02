package pl.srychert.PartyGamesPlatform.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfigurationSource;
import pl.srychert.PartyGamesPlatform.service.CustomAuthenticationProvider;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfiguration {

    @Autowired
    private CustomAuthenticationProvider authenticationProvider;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((auth) -> {
                            auth
                                    .antMatchers("/",
                                            "/favicon.ico",
                                            "/**/*.png",
                                            "/**/*.gif",
                                            "/**/*.svg",
                                            "/**/*.jpg",
                                            "/**/*.html",
                                            "/**/*.css",
                                            "/**/*.js").permitAll()
                                    .antMatchers("/api/v1/users/**").hasAnyRole("ADMIN", "USER")
                                    .antMatchers("/api/v1/games/**").hasAnyRole("ADMIN", "USER")
                                    .antMatchers("/").permitAll()
                                    .anyRequest().authenticated();
                        }
                );
                // by default uses a Bean by the name of corsConfigurationSource
                http.cors().and();
                http.csrf().disable();
//                http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
//                http.formLogin(withDefaults());
                http.formLogin(httpSecurityFormLoginConfigurer -> {
//                    httpSecurityFormLoginConfigurer.loginPage("/login");
                    System.out.println("Custom login page: ");
                    System.out.println(httpSecurityFormLoginConfigurer.isCustomLoginPage());
//                    httpSecurityFormLoginConfigurer.loginProcessingUrl("/perform_login");
//                    httpSecurityFormLoginConfigurer.successForwardUrl("http://localhost:3000/host");
//                    httpSecurityFormLoginConfigurer.defaultSuccessUrl("http://localhost:3000/host", true);

                });
        return http.build();
    }

    @Autowired
    public void setupAuthenticationProvider(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider);
    }
}
