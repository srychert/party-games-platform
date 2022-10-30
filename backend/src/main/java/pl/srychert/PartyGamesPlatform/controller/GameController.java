package pl.srychert.PartyGamesPlatform.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.web.bind.annotation.*;
import pl.srychert.PartyGamesPlatform.model.Game;
import pl.srychert.PartyGamesPlatform.redis.RedisConfig;
import pl.srychert.PartyGamesPlatform.service.GameService;
import pl.srychert.PartyGamesPlatform.service.PinService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/games")
@AllArgsConstructor
public class GameController {
    private final GameService gameService;
    private final PinService pinService;

    @PostMapping("/new")
    public Map<String, String> newGame(){
        Map<String, String> map = new HashMap<>();
        RedisTemplate<String,String> redisTemplate = RedisConfig.redisTemplate();
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        // TODO
        // check if pin is not in use
        String pin = pinService.getRandomNumberString();

        if(valueOperations.get(pin) != null){
            System.out.println("Pin in use");
        }

        valueOperations.set(pin, "false");

//        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
//        hashOperations.put("USER", "1234", "true");
//        System.out.println(hashOperations.get("USER", "1234"));

        map.put("pin",pin);
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
    public void addGame(@RequestBody Game game){
        gameService.addGame(game);
    }

    @DeleteMapping(path = "{gameId}")
    public void deleteGame(@PathVariable("gameId") String id){
        gameService.deleteGame(id);
    }

    @PutMapping(path = "{gameId}")
    public Game updateGame(
            @PathVariable("gameId") String id,
            @RequestParam(required = false) String description) {
        return gameService.updateGame(id, description);
    }

}
