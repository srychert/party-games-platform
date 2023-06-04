package pl.srychert.PartyGamesPlatform.model.game.item;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import pl.srychert.PartyGamesPlatform.enums.ItemType;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class ItemTest {
    private Item item;

    @Nested
    class JsonParsingTest {
        private final ObjectMapper objectMapper = new ObjectMapper();

        @Test
        void oneItemShouldParseWhenUsingEnumType() {
            JSONObject json = new JSONObject().put("type", ItemType.HEAL_POTION);
            assertDoesNotThrow(() -> objectMapper.readValue(json.toString(), Item.class));
        }

        @Test
        void allItems() {
            for (ItemType itemType : ItemType.values()) {
                JSONObject json = new JSONObject().put("type", itemType);

                assertDoesNotThrow(() -> objectMapper.readValue(json.toString(), Item.class));
            }
        }
    }
}
