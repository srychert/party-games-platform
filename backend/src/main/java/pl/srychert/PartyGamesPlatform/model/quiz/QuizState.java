package pl.srychert.PartyGamesPlatform.model.quiz;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class QuizState {
    private int round;
    private String hostId;
    private String gameId;
    private List<QuizPlayer> players;
}
