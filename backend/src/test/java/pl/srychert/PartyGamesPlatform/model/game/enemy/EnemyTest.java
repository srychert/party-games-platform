package pl.srychert.PartyGamesPlatform.model.game.enemy;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import pl.srychert.PartyGamesPlatform.enums.Stance;

import java.util.List;

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
}