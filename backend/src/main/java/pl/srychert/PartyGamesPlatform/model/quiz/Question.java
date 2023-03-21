package pl.srychert.PartyGamesPlatform.model.quiz;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import pl.srychert.PartyGamesPlatform.enums.QuestionType;

import java.util.List;

@Data
@Builder
public class Question {
    @NotEmpty
    private String question;
    @NotNull
    private QuestionType type;
    @NotNull
    private List<String> answers;
    @NotNull
    @Min(0)
    private Integer correct;

    // TODO write custom validator
    @AssertTrue
    private boolean isCorrect() {
        if (answers == null) {
            return false;
        }
        return correct <= answers.size() - 1;
    }
}