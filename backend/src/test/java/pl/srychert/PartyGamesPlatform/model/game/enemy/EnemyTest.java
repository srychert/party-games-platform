package pl.srychert.PartyGamesPlatform.model.game.enemy;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import pl.srychert.PartyGamesPlatform.enums.EnemyType;
import pl.srychert.PartyGamesPlatform.enums.Stance;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

class EnemyTest {
    private Enemy enemy;

    @Nested
    class StancesTest {

        @BeforeEach
        public void init() {
            enemy = new Slime();
        }

        @Test
        void drawOneStance() {
            enemy.setStances(List.of(
                    StanceWithChance.builder().stance(Stance.NORMAL).chance(100).build()
            ));
            enemy.drawStance();
            assertEquals(Stance.NORMAL, enemy.getStance());
        }
    }

    @Nested
    class JsonParsingTest {
        private final ObjectMapper objectMapper = new ObjectMapper();

        @Test
        void oneEnemyShouldParseWhenUsingEnumType() {
            JSONObject json = new JSONObject().put("type", EnemyType.SLIME);
            assertDoesNotThrow(() -> objectMapper.readValue(json.toString(), Enemy.class));
        }

        @Test
        void allEnemies() {
            for (EnemyType enemyType : EnemyType.values()) {
                JSONObject json = new JSONObject().put("type", enemyType);

                assertDoesNotThrow(() -> objectMapper.readValue(json.toString(), Enemy.class));
            }
        }
    }
}