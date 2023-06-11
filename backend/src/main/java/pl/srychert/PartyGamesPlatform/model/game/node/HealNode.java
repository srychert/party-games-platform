package pl.srychert.PartyGamesPlatform.model.game.node;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.json.JSONObject;
import pl.srychert.PartyGamesPlatform.exception.general.NotEnoughGoldException;
import pl.srychert.PartyGamesPlatform.model.game.Player;

import java.util.concurrent.ThreadLocalRandom;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
public class HealNode extends Node {
    @Builder.Default
    private Integer baseHeal = 2;

    @NodeOptionMethod
    public JSONObject freeHeal(Player player) {
        JSONObject answer = new JSONObject();

        int maxHp = Player.builder().build().getHp();
        player.setHp(Math.min(player.getHp() + baseHeal, maxHp));
        player.setCurrentRoundCompleted(true);

        answer.put("player", new JSONObject(player));
        return answer;
    }

    @NodeOptionMethod
    public JSONObject buyHeal(Player player, @VisibleParam Integer gold) throws NotEnoughGoldException {
        JSONObject answer = new JSONObject();

        if (player.getGold() < gold) {
            throw new NotEnoughGoldException("Not enough gold");
        }

        int maxHp = Player.builder().build().getHp();
        Integer hpToHeal = ThreadLocalRandom.current().nextInt(gold, gold + 3);

        player.setGold(player.getGold() - gold);
        player.setHp(Math.min(player.getHp() + hpToHeal + baseHeal, maxHp));
        player.setCurrentRoundCompleted(true);

        answer.put("player", new JSONObject(player));
        return answer;
    }

    @NodeOptionMethod
    public JSONObject leave(Player player) {
        JSONObject answer = new JSONObject();

        player.setCurrentRoundCompleted(true);

        answer.put("player", new JSONObject(player));
        return answer;
    }

    public HealNode() {

    }
}
