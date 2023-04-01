package pl.srychert.PartyGamesPlatform.model.game.node;

import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;
import pl.srychert.PartyGamesPlatform.model.game.Player;

@SuperBuilder
@AllArgsConstructor
public class SkipNode extends Node {

    @NodeOptionMethod
    public Player skip(Player player) {
        return player;
    }
}
