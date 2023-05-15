package pl.srychert.PartyGamesPlatform.repository;

import org.springframework.stereotype.Repository;

@Repository
public class GameStateRepository {
//    private final RedisTemplate<String, GameState> redisTemplate = RedisConfig.redisTemplate();
//    private final HashOperations<String, String, GameState> hashOperations = redisTemplate.opsForHash();
//
//    public Map.Entry<String, GameState> getRandomUnusedEntry() {
//        return hashOperations.randomEntry("unused");
//    }
//
//    public Optional<GameState> getUsed(String pin) {
//        return Optional.ofNullable(hashOperations.get("used", pin));
//    }
//
//    public Map<String, GameState> getAllUsed() {
//        return hashOperations.entries("used");
//    }
//
//    public void setPinAsUsed(String pin) {
//        hashOperations.delete("unused", pin);
//        hashOperations.put("used", pin, new GameState());
//    }
//
//    public void update(String pin, GameState gameState) {
//        hashOperations.put("used", pin, gameState);
//    }
//
//    public String getGameId(String pin) {
//        return Objects.requireNonNull(hashOperations.get("used", pin)).getGameId();
//    }
}
