package pl.srychert.PartyGamesPlatform.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GameState {

    @JsonProperty
    private int turn;
}
