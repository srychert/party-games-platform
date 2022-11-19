package pl.srychert.PartyGamesPlatform.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.exception.ApiRequestException;
import pl.srychert.PartyGamesPlatform.model.User;
import pl.srychert.PartyGamesPlatform.model.UserRepository;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUser(String id){
        return userRepository.findById(id);
    }

    public User addUser(User user){
        checkForDuplicates(user);
        User newUser = new User(
                user.getUserName(),
                passwordEncoder.encode(user.getPassword()),
                user.isActive(),
                user.getRoles(),
                user.getEmail());

        return userRepository.insert(newUser);
    }

    public User deleteUser(String id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) {
            userRepository.deleteById(id);
        }
        return user.orElseThrow(() -> new ApiRequestException("No such User id in DB"));
    }

    public User updateUser(String id, User user){
        User updatedUser = userRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such User id in DB"));

        String userName = user.getUserName();
        String email = user.getEmail();

        if(!userName.equals(updatedUser.getUserName())){
            checkForDuplicateUserName(userName);
            updatedUser.setUserName(userName);
        }

        if(!email.equals(updatedUser.getEmail())){
            checkForDuplicateEmail(email);
            updatedUser.setEmail(email);
        }

        updatedUser.setPassword(passwordEncoder.encode(user.getPassword()));
        updatedUser.setRoles(user.getRoles());

        return userRepository.save(updatedUser);
    }

    public User updateActive(String id, boolean active){
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such User id in DB"));

        user.setActive(active);
        return userRepository.save(user);
    }

    public User updateExpire(String id){
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such User id in DB"));

        user.setAccountExpiryTime(LocalDate.now(ZoneId.of("Europe/Warsaw")).plusYears(1));
        user.setCredentialsExpiryTime(LocalDate.now(ZoneId.of("Europe/Warsaw")).plusYears(1));
        return userRepository.save(user);
    }

    public void checkForDuplicates(User user){
        checkForDuplicateUserName(user.getUserName());
        checkForDuplicateEmail(user.getEmail());
    }

    public void checkForDuplicateUserName(String username) {
        if(userRepository.findByUserName(username).isPresent()){
            throw new ApiRequestException("Duplicate userName field");
        }
    }

    public void checkForDuplicateEmail(String email) {
        if(userRepository.findByEmail(email).isPresent()){
            throw new ApiRequestException("Duplicate email field");
        }
    }

}
