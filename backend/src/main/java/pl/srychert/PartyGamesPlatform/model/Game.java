package pl.srychert.PartyGamesPlatform.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class Game {
    @Id
    private String id;

    public Game(String description, List<String> allowedActions, Long totalTimesPlayed, String createdBy) {
        this.description = description;
        this.allowedActions = allowedActions;
        this.totalTimesPlayed = totalTimesPlayed;
        this.createdBy = createdBy;
    }

    private String description;
    private List<String> allowedActions;
    private Long totalTimesPlayed;
    @Indexed
    private String createdBy;

}
