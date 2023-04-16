package pl.srychert.PartyGamesPlatform.model.game.node;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.json.JSONObject;
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
    public JSONObject fight(Player player) {
        JSONObject answer = new JSONObject();

        if (player.getSpeed() >= enemy.getSpeed()) {
            enemy.setHp(enemy.getHp() - player.getAtk());
            if (enemy.getHp() <= 0) {
                handleEnemyDeath(player);
            }

            player.setHp(player.getHp() - enemy.getAtk());
            answer.put("player", new JSONObject(player));
            return answer;
        }

        player.setHp(player.getHp() - enemy.getAtk());
        enemy.setHp(enemy.getHp() - player.getAtk());

        if (enemy.getHp() <= 0) {
            handleEnemyDeath(player);
        }

        answer.put("player", new JSONObject(player));
        return answer;
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
