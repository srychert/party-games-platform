package pl.srychert.PartyGamesPlatform.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.srychert.PartyGamesPlatform.model.Game;
import pl.srychert.PartyGamesPlatform.service.GameService;
import pl.srychert.PartyGamesPlatform.service.GameStateService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/games")
@AllArgsConstructor
public class GameController {
    private final GameService gameService;
    private final GameStateService gameStateService;

    @PostMapping(path = "/new/{gameId}")
    public Map<String, String> newGame(@PathVariable("gameId") String id){
        Map<String, String> map = new HashMap<>();
        map.put("pin", null);
        gameService.getGame(id).ifPresent(g -> map.put("pin", gameStateService.getUnusedPin(id)));
        return map;
    }

    @GetMapping
    public List<Game> getGames(@RequestParam(required = false) String email){
        if(email != null && !email.isEmpty()){
            return gameService.getGamesByCreatedBy(email);
        }
        else {
            return gameService.getAllGames();
        }
    }

    @GetMapping(path = "{gameId}")
    public Optional<Game> getGame(@PathVariable("gameId") String id){
        return gameService.getGame(id);
    }

    @PostMapping
    public Game addGame(@Valid @RequestBody Game game){
        return gameService.addGame(game);
    }

    @DeleteMapping(path = "{gameId}")
    @PreAuthorize("@authComponent.isAdmin() || @authComponent.isGameOwner(#id)")
    public Game deleteGame(@PathVariable("gameId") String id){
        return gameService.deleteGame(id);
    }

    @PutMapping(path = "{gameId}")
    @PreAuthorize("@authComponent.isAdmin() || @authComponent.isGameOwner(#id)")
    public Game updateGame(
            @PathVariable("gameId") String id,
            @Valid @RequestBody Game game) {
        return gameService.updateGame(id, game);
    }

}
