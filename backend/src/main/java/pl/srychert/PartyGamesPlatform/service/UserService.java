package pl.srychert.PartyGamesPlatform.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.model.User;
import pl.srychert.PartyGamesPlatform.model.UserRepository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUser(String id){
        return userRepository.findById(id);
    }

    public void addUser(User user){
        userRepository.insert(user);
    }

    public User deleteUser(String id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) {
            userRepository.deleteById(id);
        }
        return user.orElse(null);
    }

    public User updateUser(String id, String userName, String password, String roles, String email){;
        User user = userRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException(String.format("Game with ID %s does not exist", id)));
        if(userName != null){
            user.setUserName(userName);
        }
        if(password != null){
            user.setPassword(password);
        }
        if(roles != null){
            user.setRoles(roles);
        }
        if(email != null){
            user.setEmail(email);
        }
        return userRepository.save(user);
    }

    public User updateActive(String id, boolean active){
        User user = userRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException(String.format("Game with ID %s does not exist", id)));

        user.setActive(active);
        return userRepository.save(user);
    }

    public User updateExpire(String id){
        User user = userRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException(String.format("Game with ID %s does not exist", id)));

        user.setAccountExpiryTime(LocalDateTime.now().plusMonths(1L));
        user.setCredentialsExpiryTime(LocalDateTime.now().plusMonths(1L));
        return userRepository.save(user);
    }

}
