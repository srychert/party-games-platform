package pl.srychert.PartyGamesPlatform.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


@Data
@Document
public class User {
    @Setter(AccessLevel.NONE)
    @Id
    private String id;
    @NotBlank
    @Indexed(unique = true)
    private String userName;
    @NotBlank
    private String password;
    private boolean active;
    @NotNull
    private List<String> roles;
    @NotBlank
    @Email
    @Indexed(unique = true)
    private String email;
    private LocalDate accountExpiryTime;
    private LocalDate credentialsExpiryTime;

    public User(String userName, String password, boolean active, List<String> roles, String email) {
        this.userName = userName;
        this.password = password;
        this.active = active;
        this.roles = roles;
        this.email = email;
        this.accountExpiryTime = LocalDate.now(ZoneId.of("Europe/Warsaw")).plusYears(1);
        this.credentialsExpiryTime = LocalDate.now(ZoneId.of("Europe/Warsaw")).plusYears(1);
    }
}
