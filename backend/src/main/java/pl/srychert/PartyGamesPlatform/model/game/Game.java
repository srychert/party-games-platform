package pl.srychert.PartyGamesPlatform.model.game;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class Game {
    @Setter(AccessLevel.NONE)
    @Id
    private String id;
    @NotBlank
    private String title;
    @NotNull
    private String description;
    @Builder.Default
    private Long totalTimesPlayed = 0L;
    @NotBlank
    private String createdBy;
    @NotNull
    @Size(min = 1)
    private List<Node> nodeList;

}
