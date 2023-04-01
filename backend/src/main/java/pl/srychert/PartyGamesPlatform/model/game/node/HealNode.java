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
    public Player freeHeal(Player player) {
        player.setHp(player.getHp() + 2);
        player.setCurrentRoundCompleted(true);

        return player;
    }

    @NodeOptionMethod
    public Player buyHeal(Player player, @VisibleParam Integer gold) throws NotEnoughGoldException {
        if (player.getGold() < gold) {
            throw new NotEnoughGoldException("Not enough gold");
        }

        Integer hpToHeal = ThreadLocalRandom.current().nextInt(gold, gold + 3);

        player.setGold(player.getGold() - gold);
        player.setHp(player.getHp() + hpToHeal);
        player.setCurrentRoundCompleted(true);

        return player;
    }
}
