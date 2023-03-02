package pl.srychert.PartyGamesPlatform.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.exception.ApiRequestException;
import pl.srychert.PartyGamesPlatform.model.User;
import pl.srychert.PartyGamesPlatform.repository.UserRepository;

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

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUser(String id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public User addUser(User user) {
        checkForDuplicates(user);
        User newUser = new User(
                user.getUserName(),
                passwordEncoder.encode(user.getPassword()),
                user.isActive(),
                user.getEmail());

        return userRepository.insert(newUser);
    }

    public User deleteUser(String id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
        }
        return user.orElseThrow(() -> new ApiRequestException("No such User id in DB"));
    }

    public User updateUser(String id, User user) {
        User updatedUser = userRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such User id in DB"));

        String userName = user.getUserName();
        String email = user.getEmail();

        if (!userName.equals(updatedUser.getUserName())) {
            checkForDuplicateUserName(userName);
            updatedUser.setUserName(userName);
        }

        if (!email.equals(updatedUser.getEmail())) {
            checkForDuplicateEmail(email);
            updatedUser.setEmail(email);
        }

        updatedUser.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(updatedUser);
    }

    public User updateUserName(String id, String userName) {
        if (userName == null || userName.equals("")) {
            throw new ApiRequestException("UserName can't be empty");
        }

        User updatedUser = userRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such User id in DB"));

        checkForDuplicateUserName(userName);
        updatedUser.setUserName(userName);

        return userRepository.save(updatedUser);
    }

    public User updatePassword(String id, String password) {
        if (password == null || password.equals("")) {
            throw new ApiRequestException("Password can't be empty");
        }

        User updatedUser = userRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such User id in DB"));

        updatedUser.setPassword(passwordEncoder.encode(password));

        return userRepository.save(updatedUser);
    }

    public User updateRoles(String id, List<String> roles) {
        // check necessary because user could send empty body through controller
        if (roles == null) {
            throw new ApiRequestException("roles can't be null");
        }
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such User id in DB"));

        user.setRoles(roles);
        return userRepository.save(user);
    }

    public User updateActive(String id, boolean active) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such User id in DB"));

        user.setActive(active);
        return userRepository.save(user);
    }

    public User updateExpire(String id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such User id in DB"));

        user.setAccountExpiryTime(LocalDate.now(ZoneId.of("Europe/Warsaw")).plusYears(1));
        user.setCredentialsExpiryTime(LocalDate.now(ZoneId.of("Europe/Warsaw")).plusYears(1));
        return userRepository.save(user);
    }

    public void checkForDuplicates(User user) {
        checkForDuplicateUserName(user.getUserName());
        checkForDuplicateEmail(user.getEmail());
    }

    public void checkForDuplicateUserName(String username) {
        if (userRepository.findByUserName(username).isPresent()) {
            throw new ApiRequestException("Duplicate userName field");
        }
    }

    public void checkForDuplicateEmail(String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new ApiRequestException("Duplicate email field");
        }
    }

}
