package pl.srychert.PartyGamesPlatform.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class Game {
    @Setter(AccessLevel.NONE)
    @Id
    private String id;
    private String description;
    private List<String> allowedActions;
    private Long totalTimesPlayed;
    @Indexed
    private String createdBy;

    public Game(String description, List<String> allowedActions, Long totalTimesPlayed, String createdBy) {
        this.description = description;
        this.allowedActions = allowedActions;
        this.totalTimesPlayed = totalTimesPlayed;
        this.createdBy = createdBy;
    }

}
