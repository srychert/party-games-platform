package pl.srychert.PartyGamesPlatform.model;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import pl.srychert.PartyGamesPlatform.enums.QuestionType;

import java.util.List;

@Data
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

    public Question(String question, QuestionType type, List<String> answers, Integer correct) {
        this.question = question;
        this.type = type;
        this.answers = answers;
        this.correct = correct;
    }

    // TODO write custom validator
    @AssertTrue
    private boolean isCorrect() {
        if (answers == null) {
            return false;
        }
        return correct <= answers.size() - 1;
    }
}