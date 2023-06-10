package pl.srychert.PartyGamesPlatform.model.game.node;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pl.srychert.PartyGamesPlatform.exception.item.ItemNotPresentException;
import pl.srychert.PartyGamesPlatform.exception.item.ItemTooExpensiveException;
import pl.srychert.PartyGamesPlatform.model.game.Player;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class MerchantNodeTest {
    private MerchantNode node;

    private Player player;

    public static class TestItem extends Item {
    }

    @BeforeEach
    void setBaseHeal() {
        player = Player.builder().gold(10).build();
        node = MerchantNode.builder().build();
    }

    @Test
    void testBuyItemSuccess() {
        Item item = new TestItem();
        item.setCost(1);
        node.setItems(Map.ofEntries(
                Map.entry(item.getId(), item)
        ));

        assertDoesNotThrow(() -> node.buyItem(player, item.getId()));
        assertEquals(1, player.getItems().size());
        assertEquals(9, player.getGold());
    }

    @Test
    void testBuyItemWhenEmpty() {
        assertThrows(ItemNotPresentException.class, () -> node.buyItem(player, "id"));
    }

    @Test
    void testBuyItemWhenTooExpensive() {
        Item item = new TestItem();
        item.setCost(100);
        node.setItems(Map.ofEntries(
                Map.entry(item.getId(), item)
        ));
        assertThrows(ItemTooExpensiveException.class, () -> node.buyItem(player, item.getId()));
    }
}
