package pl.srychert.PartyGamesPlatform.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.SmartInitializingSingleton;
import org.springframework.context.annotation.Bean;
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
