package pl.srychert.PartyGamesPlatform.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.srychert.PartyGamesPlatform.model.User;
import pl.srychert.PartyGamesPlatform.service.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getUsers(){
        return userService.getAllUsers();
    }

    @GetMapping(path = "{userId}")
    @PreAuthorize("@authComponent.hasPermission(#id)")
    public Optional<User> getUser(@AuthenticationPrincipal User user, @PathVariable("userId") String id){
        return userService.getUser(id);
    }

    @PostMapping
    public User addUser(@Valid @RequestBody User user){
        return userService.addUser(user);
    }

    @DeleteMapping(path = "{userId}")
    public User deleteUser(@PathVariable("userId") String id){
        return userService.deleteUser(id);
    }

    @PutMapping(path = "{userId}")
    public User updateUser(
            @PathVariable("userId") String id, @Valid @RequestBody User user){
        return userService.updateUser(id, user);
    }

    @PatchMapping(path = "{userId}")
    public User updateActive(@PathVariable("userId") String id, @RequestParam boolean active){
        return userService.updateActive(id, active);
    }

    @PatchMapping(path = "{userId}/expire")
    public User updateExpire(@PathVariable("userId") String id){
        return userService.updateExpire(id);
    }


}
