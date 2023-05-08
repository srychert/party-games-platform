package pl.srychert.PartyGamesPlatform.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SumChanceValidator.class)
public @interface SumChance {
    String message() default "Chances need to add to 100";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
