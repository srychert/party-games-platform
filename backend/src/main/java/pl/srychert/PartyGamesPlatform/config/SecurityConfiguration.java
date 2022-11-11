package pl.srychert.PartyGamesPlatform.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfigurationSource;
import pl.srychert.PartyGamesPlatform.service.CustomAuthenticationProvider;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
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
                                    .antMatchers("/api/v1/games/new/**").hasRole("ADMIN")
                                    .antMatchers("/api/v1/games/**").hasAnyRole("ADMIN", "USER")
                                    .antMatchers("/").permitAll();
                        }
                );
                // by default uses a Bean by the name of corsConfigurationSource
                http.cors().and();
                http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
                http.formLogin(withDefaults());
        return http.build();
    }

    @Autowired
    public void setupAuthenticationProvider(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider);
    }
}
