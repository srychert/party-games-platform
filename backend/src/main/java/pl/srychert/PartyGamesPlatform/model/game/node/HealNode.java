package pl.srychert.PartyGamesPlatform.model.game.node;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import pl.srychert.PartyGamesPlatform.exception.general.NotEnoughGoldException;
import pl.srychert.PartyGamesPlatform.model.game.Player;

import java.util.concurrent.ThreadLocalRandom;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
public class HealNode extends Node {
    @NodeOptionMethod
    public Integer freeHeal() {
        return 2;
    }

    @NodeOptionMethod
    public Integer buyHeal(Player player, Integer gold) throws NotEnoughGoldException {
        if (player.getGold() < gold) {
            throw new NotEnoughGoldException();
        }

        return ThreadLocalRandom.current().nextInt(gold, gold + 2);
    }
}
