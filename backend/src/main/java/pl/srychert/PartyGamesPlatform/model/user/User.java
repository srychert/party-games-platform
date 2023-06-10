package pl.srychert.PartyGamesPlatform.model.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

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
    @Size(min = 8, message = "Must be at least 8 characters ")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private boolean active;
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

    public User(String userName, String password, boolean active, String email) {
        this.userName = userName;
        this.password = password;
        this.active = active;
        this.roles = List.of("USER");
        this.email = email;
        this.accountExpiryTime = LocalDate.now(ZoneId.of("Europe/Warsaw")).plusYears(1);
        this.credentialsExpiryTime = LocalDate.now(ZoneId.of("Europe/Warsaw")).plusYears(1);
    }

    public User() {

    }
}
