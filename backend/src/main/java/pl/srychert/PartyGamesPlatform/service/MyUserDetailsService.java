package pl.srychert.PartyGamesPlatform.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.model.MyUserDetails;
import pl.srychert.PartyGamesPlatform.model.User;
import pl.srychert.PartyGamesPlatform.model.UserRepository;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUserName(username);

        user.orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));

        return user.map(MyUserDetails::new).get();
    }





}
