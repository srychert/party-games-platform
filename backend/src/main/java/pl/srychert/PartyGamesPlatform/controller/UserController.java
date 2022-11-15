package pl.srychert.PartyGamesPlatform.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.srychert.PartyGamesPlatform.model.User;
import pl.srychert.PartyGamesPlatform.service.UserService;

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
    public Optional<User> getUser(@PathVariable("userId") String id){
        return userService.getUser(id);
    }

    @PostMapping
    public void addUser(@RequestBody User user){
        userService.addUser(user);
    }

    @DeleteMapping(path = "{userId}")
    public User deleteUser(@PathVariable("userId") String id){
        return userService.deleteUser(id);
    }

    @PutMapping(path = "{userId}")
    public User updateUser(
            @PathVariable("userId") String id,
            @RequestParam(required = false) String userName,
            @RequestParam(required = false)String password,
            @RequestParam(required = false) String roles,
            @RequestParam(required = false) String email){
        return userService.updateUser(id,userName,password,roles,email);

    }

    @PutMapping(path = "{userId}/active")
    public User updateActive(@PathVariable("userId") String id, boolean active){
        return userService.updateActive(id,active);
    }

    @PutMapping(path = "{userId}/expire")
    public User updateExpire(@PathVariable("userId") String id){
        return userService.updateExpire(id);
    }


}
