package pl.srychert.PartyGamesPlatform.config;

import org.springframework.beans.factory.SmartInitializingSingleton;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;


@Configuration
public class RedisConfig {
//    private final RedisTemplate<String, GameState> redisTemplate = RedisConfig.redisTemplate();
//    private final HashOperations<String, String, GameState> hashOperations = redisTemplate.opsForHash();

    @Bean
    public static LettuceConnectionFactory redisConnectionFactory() {
        String host = System.getenv().getOrDefault("REDIS_HOST", "localhost");
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration(host, 6379);
//        redisStandaloneConfiguration.setPassword(RedisPassword.of("yourRedisPasswordIfAny"));
        LettuceConnectionFactory lcf = new LettuceConnectionFactory(redisStandaloneConfiguration);
        lcf.afterPropertiesSet();
        return lcf;
    }

//    public static RedisTemplate<String, GameState> redisTemplate() {
//        RedisTemplate<String, GameState> redisTemplate = new RedisTemplate<String, GameState>();
//        redisTemplate.setConnectionFactory(redisConnectionFactory());
//        redisTemplate.afterPropertiesSet();
//        return redisTemplate;
//    }

    @Bean
    RedisTemplate<String, String> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        return template;
    }

    @Bean
    @Profile("!test")
    public SmartInitializingSingleton initialize() {
        return () -> {
            String generateRedisDb = System.getenv("REDIS_GENERATE");
            System.out.println(generateRedisDb);
        };
    }
}
