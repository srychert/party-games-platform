package pl.srychert.PartyGamesPlatform.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.model.GameState;
import pl.srychert.PartyGamesPlatform.redis.RedisConfig;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@Service
public class RedisService {
    private final RedisTemplate<String,String> redisTemplate = RedisConfig.redisTemplate();
    private final HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();
    private final ObjectMapper mapper = new ObjectMapper();


    @EventListener(ApplicationReadyEvent.class)
    public void setCleanRedisDb() throws JsonProcessingException {
        System.out.println("hello world, I have just started up");

        String generateRedisDb = System.getenv("REDIS_GENERATE");
        System.out.println(generateRedisDb);
        if("true".equals(generateRedisDb)){
            System.out.println("Deleting db keys");
            Object[] unusedKeys = hashOperations.keys("unused").toArray();
            if(unusedKeys.length > 0){
                hashOperations.delete("unused", unusedKeys);
            }

            Object[] usedKeys = hashOperations.keys("used").toArray();
            if(usedKeys.length > 0){
                hashOperations.delete("used", usedKeys);
            }

            Map<String, String> gameStateMap = new HashMap<>();
            // every unused pin has an empty game state
            String gameStateJSON = mapper.writeValueAsString(new GameState());

            System.out.println("Populating db keys");
            for (int i = 0; i < 1_000_000; i++) {
                String pin = String.format("%06d", i);
                gameStateMap.put(pin, gameStateJSON);
            }

            hashOperations.putAll("unused", gameStateMap);
            System.out.printf("Db ready, made %d unused pins%n", hashOperations.size("unused"));
        }
    }

    public String getUnusedPin(){
        Map.Entry<Object, Object> randomEntry = hashOperations.randomEntry("unused");

        if(randomEntry == null){
            return null;
        }

        String key = (String) randomEntry.getKey();
        String value = (String) randomEntry.getValue();

        hashOperations.delete("unused", key);
        hashOperations.putIfAbsent("used", key, value);

        return key;
    }

    public void setPinAsUnused(String pin) throws JsonProcessingException {
        if(hashOperations.hasKey("used", pin)){
            hashOperations.delete("used", pin);
            String gameStateJSON = mapper.writeValueAsString(new GameState());
            hashOperations.putIfAbsent("unused", pin, gameStateJSON);
        }
    }
}
