package pl.srychert.PartyGamesPlatform.controller.rest;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.srychert.PartyGamesPlatform.model.user.User;
import pl.srychert.PartyGamesPlatform.service.auth.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("@authComponent.isAdmin()")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(path = "{userId}")
    @PreAuthorize("@authComponent.hasPermission(#id)")
    public Optional<User> getUser(@PathVariable("userId") String id) {
        return userService.getUser(id);
    }

    @GetMapping(path = "/user-name/{userName}")
    @PreAuthorize("@authComponent.hasPermissionByName(#userName)")
    public Optional<User> getUserByName(@PathVariable("userName") String userName) {
        return userService.getUserByName(userName);
    }

    @PostMapping
    @PreAuthorize("@authComponent.isAdmin()")
    public User addUser(@Valid @RequestBody User user) {
        return userService.addUser(user);
    }

    @DeleteMapping(path = "{userId}")
    @PreAuthorize("@authComponent.hasPermission(#id)")
    public User deleteUser(@PathVariable("userId") String id) {
        return userService.deleteUser(id);
    }

    @PutMapping(path = "{userId}")
    @PreAuthorize("@authComponent.hasPermission(#id)")
    public User updateUser(
            @PathVariable("userId") String id, @Valid @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @PatchMapping(path = "{userId}/userName")
    @PreAuthorize("@authComponent.hasPermission(#id)")
    public User updateUserName(
            @PathVariable("userId") String id, @RequestBody HashMap<String, String> user) {
        return userService.updateUserName(id, user.get("userName"));
    }

    @PatchMapping(path = "{userId}/password")
    @PreAuthorize("@authComponent.hasPermission(#id)")
    public User updatePassword(
            @PathVariable("userId") String id, @RequestBody HashMap<String, String> user) {
        return userService.updatePassword(id, user.get("password"));
    }

    @PatchMapping(path = "{userId}")
    @PreAuthorize("@authComponent.isAdmin()")
    public User updateActive(@PathVariable("userId") String id, @RequestParam boolean active) {
        return userService.updateActive(id, active);
    }

    @PatchMapping(path = "{userId}/roles")
    @PreAuthorize("@authComponent.isAdmin()")
    public User updateRoles(@PathVariable("userId") String id, @RequestBody HashMap<String, List<String>> roles) {
        return userService.updateRoles(id, roles.get("roles"));

    }

    @PatchMapping(path = "{userId}/expire")
    @PreAuthorize("@authComponent.isAdmin()")
    public User updateExpire(@PathVariable("userId") String id) {
        return userService.updateExpire(id);
    }


}
