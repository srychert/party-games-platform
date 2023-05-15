package pl.srychert.PartyGamesPlatform.controller.rest;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pl.srychert.PartyGamesPlatform.model.user.User;
import pl.srychert.PartyGamesPlatform.service.auth.TokenService;
import pl.srychert.PartyGamesPlatform.service.auth.UserService;

@RestController
@RequestMapping("api/v1/auth")
@AllArgsConstructor
public class AuthController {
    @Autowired
    private final TokenService tokenService;

    @Autowired
    private final UserService userService;

    @PostMapping(path = "login")
    public String login(Authentication authentication) {
        return tokenService.generateToken(authentication);
    }

    @PostMapping(path = "logout")
    public void logout(Authentication authentication) {
        tokenService.putTokenIntoBlockList((Jwt) authentication.getCredentials());
    }

    @GetMapping(path = "token")
    public Boolean checkIfValid(Authentication authentication) {
        if (authentication == null) return false;
        return authentication.isAuthenticated();
    }

    @PostMapping(path = "register")
    public User register(@Valid @RequestBody User user) {
        user.setActive(true);
        return userService.addUser(user);
    }

}
