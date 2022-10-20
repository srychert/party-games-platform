package pl.srychert.PartyGamesPlatform;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import pl.srychert.PartyGamesPlatform.model.Game;
import pl.srychert.PartyGamesPlatform.model.GameRepository;


import java.util.List;

@SpringBootApplication
public class PartyGamesPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(PartyGamesPlatformApplication.class, args);
	}

	// Test adding one game
	// TODO delete later
	@Bean
	CommandLineRunner runner(GameRepository repository, MongoTemplate mongoTemplate){
		return args -> {
			String createdBy = "user@example.com";
			Game game = new Game(
				"Epic game", List.of("roll-dice", "pick-answer"), 10L, createdBy
			);

			repository.findGameByCreatedBy(createdBy).ifPresentOrElse(g -> {
				System.out.println(g.toString());
			}, ()-> {repository.insert(game);});
		};
	}

}
