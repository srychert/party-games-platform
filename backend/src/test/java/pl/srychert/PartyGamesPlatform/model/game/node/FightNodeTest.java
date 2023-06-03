package pl.srychert.PartyGamesPlatform.model.game.node;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import pl.srychert.PartyGamesPlatform.enums.ItemEffect;
import pl.srychert.PartyGamesPlatform.model.game.Loot;
import pl.srychert.PartyGamesPlatform.model.game.Player;
import pl.srychert.PartyGamesPlatform.model.game.enemy.Enemy;
import pl.srychert.PartyGamesPlatform.model.game.item.potion.HealPotion;

import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class FightNodeTest {
    private final FightNode node = new FightNode();

    public static class TestEnemy extends Enemy {
    }

    @Nested
    class itemEffects {
        @Test
        void testHealWhenHpIsFull() {
            Player player = Player.builder().hp(20).build();
            assertDoesNotThrow(() -> node.processItemEffect(player, new TestEnemy(), ItemEffect.HEAL, 2));
            assertEquals(20, player.getHp());
        }

        @Test
        void testHealWhenHpIsNotFull() {
            Player player = Player.builder().hp(20).build();
            player.setHp(player.getHp() - 2);
            assertDoesNotThrow(() -> node.processItemEffect(player, new TestEnemy(), ItemEffect.HEAL, 2));
            assertEquals(20, player.getHp());
        }

        @Test
        void testAtkBuff() {
            Player player = Player.builder().atk(2).build();
            assertDoesNotThrow(() -> node.processItemEffect(player, new TestEnemy(), ItemEffect.ATK_BUFF, 2));
            assertEquals(4, player.getAtk());
        }

        @Test
        void testAtkDebuff() {
            Player player = Player.builder().build();
            Enemy enemy = new TestEnemy();
            enemy.setAtk(10);
            assertDoesNotThrow(() -> node.processItemEffect(player, enemy, ItemEffect.ATK_DEBUFF, 2));
            assertEquals(8, enemy.getAtk());
        }

        @Test
        void testHpBuff() {
            Player player = Player.builder().hp(20).build();
            assertDoesNotThrow(() -> node.processItemEffect(player, new TestEnemy(), ItemEffect.HP_BUFF, 2));
            assertEquals(22, player.getHp());
        }

        @Test
        void testHpDebuff() {
            Player player = Player.builder().build();
            Enemy enemy = new TestEnemy();
            enemy.setHp(10);
            assertDoesNotThrow(() -> node.processItemEffect(player, enemy, ItemEffect.HP_DEBUFF, 2));
            assertEquals(8, enemy.getHp());
        }

        @Test
        void testHpDebuffEnemyDies() {
            Player player = Player.builder().gold(0).items(new HashMap<>()).build();
            Enemy enemy = new TestEnemy();
            enemy.setHp(10);
            enemy.setLoot(Loot.builder().gold(10).items(List.of(new HealPotion())).build());

            assertDoesNotThrow(() -> node.processItemEffect(player, enemy, ItemEffect.HP_DEBUFF, 10));
            assertEquals(0, enemy.getHp());
            assertEquals(true, node.getEnemyDied());
            assertEquals(true, player.getCurrentRoundCompleted());
            assertEquals(10, player.getGold());
            assertEquals(1, player.getItems().size());
        }

        @Test
        void testSpeedBuff() {
            Player player = Player.builder().speed(4).build();
            assertDoesNotThrow(() -> node.processItemEffect(player, new TestEnemy(), ItemEffect.SPEED_BUFF, 2));
            assertEquals(6, player.getSpeed());
        }

        @Test
        void testSpeedDebuff() {
            Player player = Player.builder().build();
            Enemy enemy = new TestEnemy();
            enemy.setSpeed(4);
            assertDoesNotThrow(() -> node.processItemEffect(player, enemy, ItemEffect.SPEED_DEBUFF, 2));
            assertEquals(2, enemy.getSpeed());
        }
    }


}
