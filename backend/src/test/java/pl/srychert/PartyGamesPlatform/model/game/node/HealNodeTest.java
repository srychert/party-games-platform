package pl.srychert.PartyGamesPlatform.model.game.node;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pl.srychert.PartyGamesPlatform.exception.general.NotEnoughGoldException;
import pl.srychert.PartyGamesPlatform.model.game.Player;

import static org.junit.jupiter.api.Assertions.*;

public class HealNodeTest {
    private final HealNode node = new HealNode();
    private final Integer baseHeal = 2;
    private Player player;

    @BeforeEach
    void setBaseHeal() {
        node.setBaseHeal(baseHeal);
        player = Player.builder().gold(10).build();
    }

    @Test
    void testFreeHealMaxHp() {
        Integer hpBefore = player.getHp();

        node.freeHeal(player);
        assertEquals(hpBefore, player.getHp());
    }

    @Test
    void testFreeHealToMax() {
        Integer hpBefore = player.getHp();
        player.setHp(player.getHp() - 2);

        node.freeHeal(player);
        assertEquals(hpBefore, player.getHp());
    }

    @Test
    void testFreeHealLessThanMax() {
        Integer hpBefore = player.getHp();
        player.setHp(player.getHp() - 10);

        node.freeHeal(player);
        assertEquals(hpBefore - 10 + baseHeal, player.getHp());
    }

    @Test
    void testBuyHealMaxHp() {
        Integer hpBefore = player.getHp();

        assertDoesNotThrow(() -> node.buyHeal(player, 10));
        assertEquals(hpBefore, player.getHp());
    }

    @Test
    void testBuyHealToMax() {
        Integer hpBefore = player.getHp();
        player.setHp(player.getHp() - 2);

        assertDoesNotThrow(() -> node.buyHeal(player, 10));
        assertEquals(hpBefore, player.getHp());
    }

    @Test
    void testBuyHealLessThanMax() {
        Integer hpBefore = player.getHp();
        player.setHp(player.getHp() - 10);

        assertDoesNotThrow(() -> node.buyHeal(player, 2));
        assertTrue(hpBefore - 10 + baseHeal < player.getHp());
        assertTrue(player.getHp() <= hpBefore);
    }

    @Test
    void testBuyHealNotEnoughGold() {
        Integer hpBefore = player.getHp();
        player.setHp(player.getHp() - 10);

        assertThrows(NotEnoughGoldException.class, () -> node.buyHeal(player, 100));
        assertEquals(hpBefore - 10, player.getHp());
    }

}
