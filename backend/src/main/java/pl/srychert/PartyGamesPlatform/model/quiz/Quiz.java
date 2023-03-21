package pl.srychert.PartyGamesPlatform.model.quiz;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
@Data
@Document
@Builder
public class Quiz {
    @Setter(AccessLevel.NONE)
    @Id
    private String id;
    @NotBlank
    private String title;
    @NotNull
    private String description;
    @NotNull
    private List<@Valid Question> questions;
    @Builder.Default
    private Long totalTimesPlayed = 0L;
    @NotBlank
    private String createdBy;

}
