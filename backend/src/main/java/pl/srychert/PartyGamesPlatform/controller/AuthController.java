package pl.srychert.PartyGamesPlatform.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.srychert.PartyGamesPlatform.service.TokenService;

@RestController
@RequestMapping("api/v1/token")
@AllArgsConstructor
public class AuthController {
    @Autowired
    private final TokenService tokenService;

    @PostMapping
    public String token(Authentication authentication) {
        return tokenService.generateToken(authentication);
    }

    @GetMapping
    public Boolean checkIfValid(Authentication authentication){
        return authentication.isAuthenticated();
    }

}
