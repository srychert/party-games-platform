package pl.srychert.PartyGamesPlatform.model.game;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class GameInfo {
    private boolean allPlayersGameEnded;
    private boolean allPlayersRoundCompleted;
}
