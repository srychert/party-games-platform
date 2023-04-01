package pl.srychert.PartyGamesPlatform.model.game.node;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import pl.srychert.PartyGamesPlatform.model.game.Player;
import pl.srychert.PartyGamesPlatform.model.game.enemy.Enemy;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class FightNode extends Node {
    private Enemy enemy;

    // TODO better method
    // This is a placeholder
    @NodeOptionMethod
    public Player fight(Player player) {
        if (player.getSpeed() >= enemy.getSpeed()) {
            enemy.setHp(enemy.getHp() - player.getAtk());
            if (enemy.getHp() <= 0) {
                handleEnemyDeath(player);
            }

            player.setHp(player.getHp() - enemy.getAtk());
            return player;
        }

        player.setHp(player.getHp() - enemy.getAtk());
        enemy.setHp(enemy.getHp() - player.getAtk());

        if (enemy.getHp() <= 0) {
            handleEnemyDeath(player);
        }

        return player;
    }

    private void handleEnemyDeath(Player player) {
        Integer gold = enemy.getLoot().getGold();
        Map<String, Item> itemsMap = enemy.getLoot().getItems()
                .stream().collect(Collectors.toMap(Item::getId, Function.identity()));

        player.setGold(player.getGold() + gold);
        player.getItems().putAll(itemsMap);
        player.setCurrentRoundCompleted(true);
    }

    // TODO implement
    private void handlePlayerDeath(Player player) {

    }
}
