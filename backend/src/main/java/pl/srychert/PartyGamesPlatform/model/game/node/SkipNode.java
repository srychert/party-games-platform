package pl.srychert.PartyGamesPlatform.model.game.node;

import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.json.JSONObject;
import pl.srychert.PartyGamesPlatform.model.game.Player;

@SuperBuilder
@AllArgsConstructor
public class SkipNode extends Node {

    @NodeOptionMethod
    public JSONObject skip(Player player) {
        JSONObject answer = new JSONObject();

        player.setCurrentRoundCompleted(true);

        answer.put("player", new JSONObject(player));
        answer.put("node", new JSONObject().put("type", this.getType()));
        return answer;
    }
}
