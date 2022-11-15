package pl.srychert.PartyGamesPlatform.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Data
@Document
public class User {
    @Setter(AccessLevel.NONE)
    @Id
    private String id;
    @Indexed(unique = true)
    private String userName;
    private String password;
    private boolean active;
    private String roles;
    @Indexed(unique = true)
    private String email;
    private LocalDateTime accountExpiryTime;
    private LocalDateTime credentialsExpiryTime;

    public User(String userName, String password, boolean active, String roles, String email) {
        this.userName = userName;
        this.password = password;
        this.active = active;
        this.roles = roles;
        this.email = email;
        this.accountExpiryTime = LocalDateTime.now().plusMonths(1L);
        this.credentialsExpiryTime = LocalDateTime.now().plusMonths(1L);
    }
}
