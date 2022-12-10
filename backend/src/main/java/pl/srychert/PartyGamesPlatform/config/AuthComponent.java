package pl.srychert.PartyGamesPlatform.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pl.srychert.PartyGamesPlatform.model.User;
import pl.srychert.PartyGamesPlatform.model.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Component
public class AuthComponent {
    @Autowired
    UserRepository userRepository;

    public boolean hasPermission(String id) {
        if(isAdmin()){
            return true;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();

        // Grant permission if user is the owner
        Optional<User> user = userRepository.findByUserName(name);
        String userId = user.map(User::getId).orElse(null);

        return id.equals(userId);
    }

    public boolean hasPermissionByName(String userName) {
        if(isAdmin()){
            return true;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();

        return userName.equals(name);
    }

    public boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return authorities.contains("SCOPE_ADMIN");
    }
}
