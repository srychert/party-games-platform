package pl.srychert.PartyGamesPlatform.model;

import lombok.Data;

import javax.validation.constraints.*;
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
        if (answers == null){
            return false;
        }
        return correct <= answers.size() - 1;
    }
}