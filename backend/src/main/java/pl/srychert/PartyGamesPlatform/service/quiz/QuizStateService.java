package pl.srychert.PartyGamesPlatform.service.quiz;

import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.OngoingQuizMockDB;
import pl.srychert.PartyGamesPlatform.model.quiz.Question;
import pl.srychert.PartyGamesPlatform.model.quiz.QuizState;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class QuizStateService {
    public String getUnusedPin(String hostId, String gameId, List<Question> questions) {
        String pin = String.format("%09d",
                ThreadLocalRandom.current().nextInt(0, 1_000_000_000));
        QuizState quiz = OngoingQuizMockDB.quizzes.get(pin);

        if (quiz != null) {
            return null;
        }

        QuizState newQuiz = QuizState.builder()
                .hostId(hostId)
                .gameId(gameId)
                .questions(questions)
                .players(new ArrayList<>())
                .round(0).build();

        OngoingQuizMockDB.quizzes.put(pin, newQuiz);
        return pin;
    }

    public void freePin(String hostId) {
        Optional<Map.Entry<String, QuizState>> quizEntry = OngoingQuizMockDB.quizzes
                .entrySet().stream()
                .filter(entry -> entry.getValue().getHostId().equals(hostId))
                .findFirst();

        quizEntry.ifPresent(stringQuizStateEntry ->
                OngoingQuizMockDB.quizzes.remove(stringQuizStateEntry.getKey()));
    }
}
