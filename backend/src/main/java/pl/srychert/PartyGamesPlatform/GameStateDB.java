package pl.srychert.PartyGamesPlatform;

import pl.srychert.PartyGamesPlatform.model.game.GameState;
import pl.srychert.PartyGamesPlatform.model.game.enemy.Enemy;

import java.util.HashMap;
import java.util.Map;

public class GameStateDB {
    public static Map<String, GameState> games = new HashMap<>();
    public static Map<String, Enemy> enemyByPlayerId = new HashMap<>();
}
