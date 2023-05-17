package pl.srychert.PartyGamesPlatform.model.game;

import pl.srychert.PartyGamesPlatform.enums.Stance;

public interface GameEntity {
    Integer getHp();

    void setHp(Integer hp);

    Integer getAtk();

    void setAtk(Integer atk);

    Stance getStance();
}
