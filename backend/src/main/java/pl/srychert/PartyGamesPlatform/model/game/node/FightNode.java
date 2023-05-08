package pl.srychert.PartyGamesPlatform.model.game.node;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.json.JSONObject;
import pl.srychert.PartyGamesPlatform.GameStateDB;
import pl.srychert.PartyGamesPlatform.enums.ItemEffect;
import pl.srychert.PartyGamesPlatform.enums.Stance;
import pl.srychert.PartyGamesPlatform.exception.item.ItemNotPresentException;
import pl.srychert.PartyGamesPlatform.exception.item.UnhandledItemEffectException;
import pl.srychert.PartyGamesPlatform.model.game.GameEntity;
import pl.srychert.PartyGamesPlatform.model.game.Player;
import pl.srychert.PartyGamesPlatform.model.game.enemy.Enemy;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;

import java.util.AbstractMap;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Function;
import java.util.stream.Collectors;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class FightNode extends Node {
    private @Valid Enemy enemy;

    @NodeOptionMethod
    public JSONObject fight(Player player) {
        JSONObject answer = new JSONObject();

        if (!GameStateDB.enemyByPlayerId.containsKey(player.getId())) {
            GameStateDB.enemyByPlayerId.put(player.getId(), enemy);
        }

        Enemy enemyCurrent = GameStateDB.enemyByPlayerId.get(player.getId());
        enemyCurrent.drawStance();

        if (player.getSpeed() > enemyCurrent.getSpeed()) {
            playerAttacksFirst(player, enemyCurrent);
        } else if (player.getSpeed() < enemyCurrent.getSpeed()) {
            enemyAttacksFirst(player, enemyCurrent);
        } else {
            if (ThreadLocalRandom.current().nextFloat() < 0.5) {
                playerAttacksFirst(player, enemyCurrent);
            } else {
                enemyAttacksFirst(player, enemyCurrent);
            }
        }

        answer.put("enemy", new JSONObject(enemyCurrent));
        answer.put("player", new JSONObject(player));
        return answer;
    }

    @NodeOptionMethod
    public JSONObject changeStance(Player player, @VisibleParam String stance) {
        JSONObject answer = new JSONObject();
        player.setStance(Stance.valueOf(stance));

        answer.put("player", new JSONObject(player));
        return answer;
    }

    @NodeOptionMethod
    public JSONObject useItem(Player player, @VisibleParam String itemId)
            throws ItemNotPresentException, UnhandledItemEffectException {
        JSONObject answer = new JSONObject();

        Item item = player.getItems().get(itemId);
        if (item == null) {
            throw new ItemNotPresentException(String.format("No item with id %s", itemId));
        }

        AbstractMap.SimpleImmutableEntry<ItemEffect, ?> entry = item.use();

        switch (entry.getKey()) {
            case HEAL -> player.setHp(player.getHp() + (Integer) entry.getValue());
            default ->
                    throw new UnhandledItemEffectException(String.format("Unhandled item effect %s", entry.getKey()));
        }

        player.getItems().remove(itemId);

        answer.put("player", new JSONObject(player));
        return answer;
    }

    private void playerAttacksFirst(Player player, Enemy enemy) {
        dealDamage(enemy, calculateDamage(player));

        if (isDead(enemy)) {
            handleEnemyDeath(player, enemy);
            return;
        }

        dealDamage(player, calculateDamage(enemy));

        if (isDead(player)) {
            handlePlayerDeath(player);
        }
    }

    private void enemyAttacksFirst(Player player, Enemy enemy) {
        dealDamage(player, calculateDamage(enemy));

        if (isDead(player)) {
            handlePlayerDeath(player);
            return;
        }

        dealDamage(enemy, calculateDamage(player));

        if (isDead(enemy)) {
            handleEnemyDeath(player, enemy);
        }
    }

    private Integer calculateDamage(GameEntity entity) {
        Integer dmg = 0;

        switch (entity.getStance()) {
            case NORMAL -> dmg = entity.getAtk();
            case DEFENSIVE -> dmg = (int) Math.round(entity.getAtk() * 0.5);
            case OFFENSIVE -> dmg = (int) Math.round(entity.getAtk() * 1.5);
            case COUNTER -> {
                if (ThreadLocalRandom.current().nextFloat() < 0.2) {
                    dmg = entity.getAtk() * 2;
                } else {
                    dmg = (int) Math.round(entity.getAtk() * 0.75);
                }
            }
        }

        return dmg;
    }

    private void dealDamage(GameEntity entity, Integer dmg) {
        switch (entity.getStance()) {
            case NORMAL -> entity.setHp(entity.getHp() - dmg);
            case DEFENSIVE -> entity.setHp(entity.getHp() - (int) Math.round(dmg * 0.5));
            case OFFENSIVE -> entity.setHp(entity.getHp() - (int) Math.round(dmg * 1.5));
            case COUNTER -> {
                if (ThreadLocalRandom.current().nextFloat() < 0.2) {
                    entity.setHp(entity.getHp() - dmg * 2);
                } else {
                    entity.setHp(entity.getHp() - (int) Math.round(dmg * 0.75));
                }
            }
        }
    }

    private boolean isDead(GameEntity entity) {
        return entity.getHp() <= 0;
    }

    private void handleEnemyDeath(Player player, Enemy enemy) {
        GameStateDB.enemyByPlayerId.remove(player.getId());
        Integer gold = enemy.getLoot().getGold();
        Map<String, Item> itemsMap = enemy.getLoot().getItems()
                .stream().collect(Collectors.toMap(Item::getId, Function.identity()));

        player.setGold(player.getGold() + gold);
        player.getItems().putAll(itemsMap);
        player.setCurrentRoundCompleted(true);
    }

    private void handlePlayerDeath(Player player) {
        player.setCurrentRoundCompleted(true);
        player.setHp((int) Math.round(Player.builder().build().getHp() * 0.5));
    }
}
