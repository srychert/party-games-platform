package pl.srychert.PartyGamesPlatform.config;

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
    private final RedisTemplate<String,GameState> redisTemplate = RedisConfig.redisTemplate();
    private final HashOperations<String, String, GameState> hashOperations = redisTemplate.opsForHash();
    @Bean
    public static LettuceConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration("localhost", 6379);
//        redisStandaloneConfiguration.setPassword(RedisPassword.of("yourRedisPasswordIfAny"));
        LettuceConnectionFactory lcf = new LettuceConnectionFactory(redisStandaloneConfiguration);
        lcf.afterPropertiesSet();
        return lcf;
    }

    public static RedisTemplate<String, GameState> redisTemplate() {
        RedisTemplate<String, GameState> redisTemplate = new RedisTemplate<String ,GameState>();
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

                Map<String, GameState> gameStateMap = new HashMap<>();
                GameState gameState = new GameState();

                System.out.println("Populating redis keys");
                for (int i = 0; i < 1_000_000; i++) {
                    String pin = String.format("%06d", i);
                    gameStateMap.put(pin, gameState);
                }

                hashOperations.putAll("unused", gameStateMap);
                System.out.printf("Db ready, made %d unused pins%n", hashOperations.size("unused"));
            }
        };
    }
}
