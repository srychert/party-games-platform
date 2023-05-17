package pl.srychert.PartyGamesPlatform.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import pl.srychert.PartyGamesPlatform.model.game.enemy.StanceWithChance;

import java.util.List;

public class SumChanceValidator implements ConstraintValidator<SumChance, List<StanceWithChance>> {
    @Override
    public boolean isValid(List<StanceWithChance> list, ConstraintValidatorContext context) {
        int sum = list.stream().mapToInt(StanceWithChance::getChance).sum();

        return sum == 100;
    }
}
