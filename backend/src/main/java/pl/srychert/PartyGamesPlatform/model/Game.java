package pl.srychert.PartyGamesPlatform.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Document
public class Game {
    @Setter(AccessLevel.NONE)
    @Id
    private String id;
    @NotBlank
    private String title;
    @NotNull
    private String description;
    @NotNull
    private List<String> allowedActions;
    @NotNull
    private Long totalTimesPlayed;
    @Email
    @NotBlank
    @Indexed
    private String createdBy;

    public Game(String title, String description, List<String> allowedActions, Long totalTimesPlayed, String createdBy) {
        this.title = title;
        this.description = description;
        this.allowedActions = allowedActions;
        this.totalTimesPlayed = totalTimesPlayed;
        this.createdBy = createdBy;
    }

}
