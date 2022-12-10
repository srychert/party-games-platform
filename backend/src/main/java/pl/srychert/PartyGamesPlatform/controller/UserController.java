package pl.srychert.PartyGamesPlatform.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.srychert.PartyGamesPlatform.model.User;
import pl.srychert.PartyGamesPlatform.service.UserService;

import javax.validation.Valid;
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
    public List<User> getUsers(){
        return userService.getAllUsers();
    }

    @GetMapping(path = "{userId}")
    @PreAuthorize("@authComponent.hasPermission(#id)")
    public Optional<User> getUser(@AuthenticationPrincipal User user, @PathVariable("userId") String id){
        return userService.getUser(id);
    }

    @PostMapping
    @PreAuthorize("@authComponent.isAdmin()")
    public User addUser(@Valid @RequestBody User user){
        return userService.addUser(user);
    }

    @DeleteMapping(path = "{userId}")
    @PreAuthorize("@authComponent.hasPermission(#id)")
    public User deleteUser(@PathVariable("userId") String id){
        return userService.deleteUser(id);
    }

    @PutMapping(path = "{userId}")
    @PreAuthorize("@authComponent.hasPermission(#id)")
    public User updateUser(
            @PathVariable("userId") String id, @Valid @RequestBody User user){
        return userService.updateUser(id, user);
    }

    @PatchMapping(path = "{userId}")
    @PreAuthorize("@authComponent.isAdmin()")
    public User updateActive(@PathVariable("userId") String id, @RequestParam boolean active){
        return userService.updateActive(id, active);
    }

    @PatchMapping(path = "{userId}/roles")
    @PreAuthorize("@authComponent.isAdmin()")
    public User updateRoles(@PathVariable("userId") String id, @RequestBody HashMap<String, List<String>> roles){
        return userService.updateRoles(id, roles.get("roles"));

    }

    @PatchMapping(path = "{userId}/expire")
    @PreAuthorize("@authComponent.isAdmin()")
    public User updateExpire(@PathVariable("userId") String id){
        return userService.updateExpire(id);
    }


}
