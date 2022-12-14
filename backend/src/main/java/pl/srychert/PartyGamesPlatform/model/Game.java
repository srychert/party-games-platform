package pl.srychert.PartyGamesPlatform.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Validated
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
    private List<@Valid Question> questions;
    private Long totalTimesPlayed;
    @NotBlank
    private String createdBy;

    public Game(String title, String description, List<Question> questions, Long totalTimesPlayed, String createdBy) {
        this.title = title;
        this.description = description;
        this.questions = questions;
        this.totalTimesPlayed = totalTimesPlayed;
        this.createdBy = createdBy;
    }

    public Game(String title, String description, List<Question> questions, String createdBy) {
        this.title = title;
        this.description = description;
        this.questions = questions;
        this.totalTimesPlayed = 0L;
        this.createdBy = createdBy;
    }

    public Game() {

    }

}
