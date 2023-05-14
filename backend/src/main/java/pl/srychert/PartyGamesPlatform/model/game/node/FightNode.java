package pl.srychert.PartyGamesPlatform.model.game.node;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.Valid;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.json.JSONObject;
import org.springframework.data.annotation.Transient;
import pl.srychert.PartyGamesPlatform.GameStateDB;
import pl.srychert.PartyGamesPlatform.enums.ItemEffect;
import pl.srychert.PartyGamesPlatform.enums.Stance;
import pl.srychert.PartyGamesPlatform.exception.item.ItemNotPresentException;
import pl.srychert.PartyGamesPlatform.exception.item.UnhandledItemEffectException;
import pl.srychert.PartyGamesPlatform.model.game.GameEntity;
import pl.srychert.PartyGamesPlatform.model.game.Player;
import pl.srychert.PartyGamesPlatform.model.game.enemy.Enemy;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;

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
    @JsonIgnore
    @Transient
    @Builder.Default
    private Boolean playerAtkFirst = false;
    @JsonIgnore
    @Transient
    @Builder.Default
    private Integer playerDmgDealt = 0;
    @JsonIgnore
    @Transient
    @Builder.Default
    private Integer playerDmgTaken = 0;
    @JsonIgnore
    @Transient
    @Builder.Default
    private Boolean playerDied = false;

    @JsonIgnore
    @Transient
    @Builder.Default
    private Boolean enemyAtkFirst = false;
    @JsonIgnore
    @Transient
    @Builder.Default
    private Integer enemyDmgDealt = 0;
    @JsonIgnore
    @Transient
    @Builder.Default
    private Integer enemyDmgTaken = 0;
    @JsonIgnore
    @Transient
    @Builder.Default
    private Boolean enemyDied = false;

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

        answer.put("enemy", new JSONObject(enemyCurrent)
                .put("atkFirst", enemyAtkFirst)
                .put("dmgDealt", enemyDmgDealt)
                .put("dmgTaken", enemyDmgTaken)
                .put("died", enemyDied));
        answer.put("player", new JSONObject(player)
                .put("atkFirst", playerAtkFirst)
                .put("dmgDealt", playerDmgDealt)
                .put("dmgTaken", playerDmgTaken)
                .put("died", playerDied));
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

        Map<ItemEffect, ?> effectMap = item.use();

        for (var entry : effectMap.entrySet()) {
            processItemEffect(player, entry.getKey(), entry.getValue());
        }

        player.getItems().remove(itemId);

        answer.put("player", new JSONObject(player));
        return answer;
    }

    public void processItemEffect(Player player, ItemEffect effect, Object obj) throws UnhandledItemEffectException {
        switch (effect) {
            case HEAL -> {
                Integer maxHp = Player.builder().build().getHp();
                player.setHp(Math.min(player.getHp() + (Integer) obj, maxHp));
            }
            default -> throw new UnhandledItemEffectException(String.format("Unhandled item effect %s", effect));
        }
    }

    private void playerAttacksFirst(Player player, Enemy enemy) {
        playerAtkFirst = true;
        playerDmgDealt = calculateDamage(player);
        enemyDmgTaken = dealDamage(enemy, playerDmgDealt);

        if (isDead(enemy)) {
            handleEnemyDeath(player, enemy);
            return;
        }

        enemyDmgDealt = calculateDamage(enemy);
        playerDmgTaken = dealDamage(player, enemyDmgDealt);

        if (isDead(player)) {
            handlePlayerDeath(player);
        }
    }

    private void enemyAttacksFirst(Player player, Enemy enemy) {
        enemyAtkFirst = true;
        enemyDmgDealt = calculateDamage(enemy);
        playerDmgTaken = dealDamage(player, enemyDmgDealt);

        if (isDead(player)) {
            handlePlayerDeath(player);
            return;
        }

        playerDmgDealt = calculateDamage(player);
        enemyDmgTaken = dealDamage(enemy, playerDmgDealt);

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

    private Integer dealDamage(GameEntity entity, Integer dmg) {
        Integer dmgTaken = 0;

        switch (entity.getStance()) {
            case NORMAL -> dmgTaken = dmg;
            case DEFENSIVE -> dmgTaken = (int) Math.round(dmg * 0.5);
            case OFFENSIVE -> dmgTaken = (int) Math.round(dmg * 1.5);
            case COUNTER -> {
                if (ThreadLocalRandom.current().nextFloat() < 0.2) {
                    dmgTaken = dmg * 2;
                } else {
                    dmgTaken = (int) Math.round(dmg * 0.75);
                }
            }
        }

        entity.setHp(entity.getHp() - dmgTaken);
        return dmgTaken;
    }

    private boolean isDead(GameEntity entity) {
        return entity.getHp() <= 0;
    }

    private void handleEnemyDeath(Player player, Enemy enemy) {
        GameStateDB.enemyByPlayerId.remove(player.getId());
        enemyDied = true;
        Integer gold = enemy.getLoot().getGold();
        Map<String, Item> itemsMap = enemy.getLoot().getItems()
                .stream().collect(Collectors.toMap(Item::getId, Function.identity()));

        player.setGold(player.getGold() + gold);
        player.getItems().putAll(itemsMap);
        player.setCurrentRoundCompleted(true);
    }

    private void handlePlayerDeath(Player player) {
        playerDied = true;
        player.setCurrentRoundCompleted(true);
        player.setHp((int) Math.round(Player.builder().build().getHp() * 0.5));
    }
}
