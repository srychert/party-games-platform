package pl.srychert.PartyGamesPlatform.model.quiz;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import pl.srychert.PartyGamesPlatform.model.Question;

import java.util.List;

@Getter
@Setter
@Builder
public class QuizState {
    private Integer round;
    private String hostId;
    private String gameId;
    private List<QuizPlayer> players;
    private List<Question> questions;
}
