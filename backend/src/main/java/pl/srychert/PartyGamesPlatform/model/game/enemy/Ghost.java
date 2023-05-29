package pl.srychert.PartyGamesPlatform.model.game.enemy;

import lombok.Getter;
import lombok.Setter;
import pl.srychert.PartyGamesPlatform.enums.EnemyType;
import pl.srychert.PartyGamesPlatform.enums.Stance;
import pl.srychert.PartyGamesPlatform.model.game.Loot;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
public class Ghost extends Enemy {

    public Ghost() {
        Optional<Integer> providedHp = Optional.ofNullable(super.getHp());
        Optional<Integer> providedAtk = Optional.ofNullable(super.getAtk());
        Optional<Integer> providedSpeed = Optional.ofNullable(super.getSpeed());
        Optional<Loot> providedLoot = Optional.ofNullable(super.getLoot());
        Optional<List<StanceWithChance>> providedStances = Optional.ofNullable(super.getStances());
        Optional<Stance> providedStance = Optional.ofNullable(super.getStance());

        super.setHp(providedHp.orElse(12));
        super.setAtk(providedAtk.orElse(3));
        super.setSpeed(providedSpeed.orElse(3));
        super.setLoot(providedLoot.orElse(Loot.builder().gold(10).build()));
        super.setStances(providedStances.orElse(List.of(
                StanceWithChance.builder().stance(Stance.NORMAL).chance(90).build(),
                StanceWithChance.builder().stance(Stance.DEFENSIVE).chance(10).build()
        )));
        super.setStance(providedStance.orElse(Stance.NORMAL));
        setPath("ghost.png");
        setType(EnemyType.GHOST);
    }
}
