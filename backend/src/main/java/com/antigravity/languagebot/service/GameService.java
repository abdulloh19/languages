package com.antigravity.languagebot.service;

import com.antigravity.languagebot.entity.Word;
import com.antigravity.languagebot.repository.WordRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GameService {

    private final WordRepository wordRepository;

    public GameService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    public record GameQuestionDto(
            String gameType,
            String questionTitleRu,
            String questionTitleEn,
            String targetWord,
            String correctTranslation,
            List<String> options,
            String audioUrl,
            String gapSentence,
            String hint
    ) {}

    public GameQuestionDto generateGameQuestion(Long topicId, String gameType, String targetLang) {
        if (topicId == null) topicId = 1L;
        List<Word> words = wordRepository.findByTopicIdOrderByWordOrderAsc(topicId);
        if (words.isEmpty()) {
            words = List.of(
                    new Word(topicId, 1, "Семья", "Family", "Oila", "[fɛmɪli]", "fam-uh-lee", "oi-la", "Это моя семья", "This is my family", "Bu mening oilam"),
                    new Word(topicId, 2, "Друг", "Friend", "Do'st", "[frɛnd]", "frend", "do'st", "Он мой лучший друг", "He is my best friend", "U mening eng yaqin do'stim"),
                    new Word(topicId, 3, "Родители", "Parents", "Ota-ona", "[ˈpɛərənts]", "pair-ents", "ota-ona", "Мои родители дома", "My parents are at home", "Mening ota-onam uyda")
            );
        }

        Word chosen = words.get(new Random().nextInt(words.size()));
        String targetWord = "RU".equalsIgnoreCase(targetLang) ? chosen.getWordRu() : chosen.getWordEn();
        String correctTrans = "RU".equalsIgnoreCase(targetLang) ? chosen.getWordEn() : chosen.getWordRu();

        // Build distinct random options
        Set<String> optionsSet = new LinkedHashSet<>();
        optionsSet.add(correctTrans);
        for (Word w : words) {
            if (optionsSet.size() >= 4) break;
            String trans = "RU".equalsIgnoreCase(targetLang) ? w.getWordEn() : w.getWordRu();
            optionsSet.add(trans);
        }
        List<String> options = new ArrayList<>(optionsSet);
        Collections.shuffle(options);

        String audioUrl = "/api/tts/synthesize?text=" + java.net.URLEncoder.encode(targetWord, java.nio.charset.StandardCharsets.UTF_8)
                + "&lang=" + (targetLang != null ? targetLang : "EN");

        String gapSentence = "EN".equalsIgnoreCase(targetLang)
                ? chosen.getExampleEn().replace(chosen.getWordEn(), "______")
                : chosen.getExampleRu().replace(chosen.getWordRu(), "______");

        return switch (gameType != null ? gameType.toUpperCase() : "FLASHCARD") {
            case "WORD_RECALL" -> new GameQuestionDto(
                    "WORD_RECALL",
                    "🧠 Вспомните слово (3-секундный флеш)",
                    "🧠 Word Recall (3-second flash)",
                    targetWord,
                    correctTrans,
                    options,
                    audioUrl,
                    null,
                    "Запомните написание и выберите перевод!"
            );
            case "DRAG_DROP" -> new GameQuestionDto(
                    "DRAG_DROP",
                    "🔗 Соедините слово и перевод",
                    "🔗 Match Word to Translation",
                    targetWord,
                    correctTrans,
                    options,
                    audioUrl,
                    null,
                    "Выберите точный эквивалент слова"
            );
            case "LISTEN_CHOOSE" -> new GameQuestionDto(
                    "LISTEN_CHOOSE",
                    "🎧 Послушайте и выберите правильное слово",
                    "🎧 Listen & Choose the Correct Word",
                    targetWord,
                    targetWord,
                    options,
                    audioUrl,
                    null,
                    "Нажмите на аудио и определите слово на слух"
            );
            case "FILL_GAP" -> new GameQuestionDto(
                    "FILL_GAP",
                    "✍️ Заполните пропуск в предложении",
                    "✍️ Fill the Gap in the Sentence",
                    targetWord,
                    targetWord,
                    options,
                    audioUrl,
                    gapSentence,
                    "Какое слово пропущено в предложении?"
            );
            default -> new GameQuestionDto(
                    "FLASHCARD",
                    "🎴 Карточка: Переверните и проверьте себя",
                    "🎴 Flashcard Match: Flip & Test Yourself",
                    targetWord,
                    correctTrans,
                    options,
                    audioUrl,
                    null,
                    "Проверьте, помните ли вы перевод"
            );
        };
    }
}
