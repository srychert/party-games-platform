package pl.srychert.PartyGamesPlatform.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class GameState implements Serializable {

    private int turn;
    private boolean onGoing;
    private String gameId;

    public GameState () {

    }
}
