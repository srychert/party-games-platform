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
public class Wizard extends Enemy {

    public Wizard() {
        Optional<Integer> providedHp = Optional.ofNullable(super.getHp());
        Optional<Integer> providedAtk = Optional.ofNullable(super.getAtk());
        Optional<Integer> providedSpeed = Optional.ofNullable(super.getSpeed());
        Optional<Loot> providedLoot = Optional.ofNullable(super.getLoot());
        Optional<List<StanceWithChance>> providedStances = Optional.ofNullable(super.getStances());
        Optional<Stance> providedStance = Optional.ofNullable(super.getStance());

        super.setHp(providedHp.orElse(50));
        super.setAtk(providedAtk.orElse(15));
        super.setSpeed(providedSpeed.orElse(5));
        super.setLoot(providedLoot.orElse(Loot.builder().gold(50).build()));
        super.setStances(providedStances.orElse(List.of(
                StanceWithChance.builder().stance(Stance.OFFENSIVE).chance(80).build(),
                StanceWithChance.builder().stance(Stance.DEFENSIVE).chance(20).build()
        )));
        super.setStance(providedStance.orElse(Stance.NORMAL));
        setPath("enemies/wizard.png");
        setType(EnemyType.WIZARD);
    }
}
