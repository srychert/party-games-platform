package pl.srychert.PartyGamesPlatform;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import pl.srychert.PartyGamesPlatform.model.Game;
import pl.srychert.PartyGamesPlatform.model.GameRepository;
import pl.srychert.PartyGamesPlatform.model.User;
import pl.srychert.PartyGamesPlatform.model.UserRepository;


import java.util.List;

@SpringBootApplication
public class PartyGamesPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(PartyGamesPlatformApplication.class, args);
	}

	// Add test data
	// TODO delete later
	@Bean
	CommandLineRunner runner(UserRepository user_repository, GameRepository game_repository, MongoTemplate mongoTemplate){
		return args -> {
			User user = new User("user", "pass", true, "ROLE_USER", "user@example.com");
			String createdBy = user.getEmail();
			Game game = new Game(
				"Epic game", List.of("roll-dice", "pick-answer"), 10L, createdBy
			);

			user_repository.findByUserName(user.getUserName()).ifPresentOrElse(g -> {
				System.out.println(g.toString());
			}, ()-> {user_repository.insert(user);});

			game_repository.findGameByCreatedBy(createdBy).ifPresentOrElse(g -> {
				System.out.println(g.toString());
			}, ()-> {game_repository.insert(game);});
		};
	}

}
