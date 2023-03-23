package pl.srychert.PartyGamesPlatform.model.game;

import lombok.Builder;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
@Builder
public class GameState {
    private String hostId;
    private String gameId;
    private Boolean onGoing;
    @Builder.Default
    private Map<String, Player> players = new HashMap<>();
}
