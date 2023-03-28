package pl.srychert.PartyGamesPlatform.model.game.enemy;

import lombok.Getter;
import lombok.Setter;
import pl.srychert.PartyGamesPlatform.model.game.Loot;

import java.util.Optional;

@Getter
@Setter
public class Slime extends Enemy {

    public Slime() {
        Optional<Integer> providedHp = Optional.ofNullable(super.getHp());
        Optional<Integer> provideAtk = Optional.ofNullable(super.getAtk());
        Optional<Integer> provideSpeed = Optional.ofNullable(super.getSpeed());
        Optional<Loot> provideLoot = Optional.ofNullable(super.getLoot());

        super.setHp(providedHp.orElse(4));
        super.setAtk(provideAtk.orElse(1));
        super.setSpeed(provideSpeed.orElse(1));
        super.setLoot(provideLoot.orElse(Loot.builder().gold(1).build()));
    }
}
