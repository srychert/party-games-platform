package pl.srychert.PartyGamesPlatform.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pl.srychert.PartyGamesPlatform.model.User;
import pl.srychert.PartyGamesPlatform.model.UserRepository;

import java.util.Optional;


@Component
public class AuthComponent {
    
    @Autowired
    UserRepository userRepository;

    public boolean hasPermission(String id) {
        System.out.println(id);
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(name);

        Optional<User> user = userRepository.findByUserName(name);

        String userId = user.map(User::getId).orElse(null);
        System.out.println(userId);

        return id.equals(userId);
    }
}
