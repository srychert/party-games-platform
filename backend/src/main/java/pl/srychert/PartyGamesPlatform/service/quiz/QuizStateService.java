package pl.srychert.PartyGamesPlatform.service.quiz;

import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.OngoingQuizMockDB;
import pl.srychert.PartyGamesPlatform.model.quiz.QuizState;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class QuizStateService {
    public String getUnusedPin(String hostId, String gameId) {
        String pin = String.format("%08d",
                ThreadLocalRandom.current().nextInt(0, 1_000_000));
        QuizState quiz = OngoingQuizMockDB.quizes.get(pin);

        if (quiz != null) {
            return null;
        }

        QuizState newQuiz = QuizState.builder()
                .hostId(hostId)
                .gameId(gameId)
                .players(new ArrayList<>())
                .round(0).build();

        OngoingQuizMockDB.quizes.put(pin, newQuiz);
        return pin;
    }

    public void freePin(String hostId) {
        Optional<Map.Entry<String, QuizState>> quizEntry = OngoingQuizMockDB.quizes
                .entrySet().stream()
                .filter(entry -> entry.getValue().getHostId().equals(hostId))
                .findFirst();

        quizEntry.ifPresent(stringQuizStateEntry ->
                OngoingQuizMockDB.quizes.remove(stringQuizStateEntry.getKey()));
    }
}
