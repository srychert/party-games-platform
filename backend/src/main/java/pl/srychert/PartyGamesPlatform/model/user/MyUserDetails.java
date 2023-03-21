package pl.srychert.PartyGamesPlatform.model.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class MyUserDetails implements UserDetails {
    private final String userName;
    private final String password;
    private final boolean active;
    private final List<GrantedAuthority> authorities;
    private final LocalDate accountExpiryTime;
    private final LocalDate credentialsExpiryTime;

    public MyUserDetails(User user) {
        this.userName = user.getUserName();
        this.password = user.getPassword();
        this.active = user.isActive();
        this.accountExpiryTime = user.getAccountExpiryTime();
        this.credentialsExpiryTime = user.getCredentialsExpiryTime();
        this.authorities = user.getRoles().stream()
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

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        LocalDate now = LocalDate.now(ZoneId.of("Europe/Warsaw"));
        return accountExpiryTime.isAfter(now);
    }

    @Override
    public boolean isCredentialsNonExpired() {
        LocalDate now = LocalDate.now(ZoneId.of("Europe/Warsaw"));
        return credentialsExpiryTime.isAfter(now);
    }

    @Override
    public boolean isEnabled() {
        return active;
    }

    @Override
    public boolean isAccountNonLocked() {
        return active;
    }
}
