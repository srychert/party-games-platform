package pl.srychert.PartyGamesPlatform.model;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import pl.srychert.PartyGamesPlatform.config.RedisConfig;

import java.util.Map;
import java.util.Optional;

@Repository
public class GameStateRepository {
    private final RedisTemplate<String,GameState> redisTemplate = RedisConfig.redisTemplate();
    private final HashOperations<String, String, GameState> hashOperations = redisTemplate.opsForHash();

    public Map.Entry<String, GameState> getRandomUnusedEntry(){
        return hashOperations.randomEntry("unused");
    }

    public Optional<GameState> getUsed(String pin) {
        return Optional.ofNullable(hashOperations.get("used", pin));
    }

    public Map<String, GameState> getAllUsed() {
        return hashOperations.entries("used");
    }

    public void setPinAsUsed(String pin) {
        hashOperations.delete("unused", pin);
        hashOperations.put("used", pin, new GameState());
    }

    public void update(String pin, GameState gameState){
        hashOperations.put("used", pin, gameState);
    }
}
