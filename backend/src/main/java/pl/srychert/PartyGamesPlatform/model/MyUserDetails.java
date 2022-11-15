package pl.srychert.PartyGamesPlatform.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class MyUserDetails implements UserDetails {

    private String userName;
    private String password;
    private boolean active;
    private List<GrantedAuthority> authorities;
    private Long accountExpiryTime;
    private Long credentialsExpiryTime;
    public MyUserDetails(User user){
        this.userName = user.getUserName();
        this.password = user.getPassword();
        this.active = user.isActive();
        this.accountExpiryTime=user.getAccountExpiryTime();
        this.credentialsExpiryTime= user.getCredentialsExpiryTime();
        this.authorities = Arrays.stream(user.getRoles().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password){
        this.password=password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    public void setUserName(String userName){
        this.userName=userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        return timestamp.getTime() <= accountExpiryTime;
    }

    @Override
    public boolean isAccountNonLocked() {
        return active;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        return timestamp.getTime() <= credentialsExpiryTime;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
