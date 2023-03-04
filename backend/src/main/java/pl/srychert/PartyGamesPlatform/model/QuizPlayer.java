package pl.srychert.PartyGamesPlatform.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class QuizPlayer {
    private String id;
    private String nick;
    private Integer points;
}
