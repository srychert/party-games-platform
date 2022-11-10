package pl.srychert.PartyGamesPlatform.redis;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.SmartInitializingSingleton;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import pl.srychert.PartyGamesPlatform.model.GameState;

import java.util.HashMap;
import java.util.Map;


@Configuration
public class RedisConfig {

    private final RedisTemplate<String,String> redisTemplate = RedisConfig.redisTemplate();
    private final HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();
    private final ObjectMapper mapper = new ObjectMapper();
    @Bean
    public static LettuceConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration("redis", 6379);
//        redisStandaloneConfiguration.setPassword(RedisPassword.of("yourRedisPasswordIfAny"));
        LettuceConnectionFactory lcf = new LettuceConnectionFactory(redisStandaloneConfiguration);
        lcf.afterPropertiesSet();
        return lcf;
    }

    public static RedisTemplate<String, String> redisTemplate() {
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<String ,String>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }

    @Bean
    public SmartInitializingSingleton initialize() {
        return () -> {
            String generateRedisDb = System.getenv("REDIS_GENERATE");
            System.out.println(generateRedisDb);
            if("true".equals(generateRedisDb)){
                System.out.println("Deleting redis keys");
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
                String gameStateJSON = null;
                try {
                    gameStateJSON = mapper.writeValueAsString(new GameState());
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }

                System.out.println("Populating redis keys");
                for (int i = 0; i < 1_000_000; i++) {
                    String pin = String.format("%06d", i);
                    gameStateMap.put(pin, gameStateJSON);
                }

                hashOperations.putAll("unused", gameStateMap);
                System.out.printf("Db ready, made %d unused pins%n", hashOperations.size("unused"));
            }
        };
    }
}
