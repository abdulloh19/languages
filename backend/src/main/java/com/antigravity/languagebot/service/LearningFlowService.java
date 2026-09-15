package com.antigravity.languagebot.service;

import com.antigravity.languagebot.entity.*;
import com.antigravity.languagebot.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LearningFlowService {

    private final UserRepository userRepository;
    private final TopicRepository topicRepository;
    private final DialogueRepository dialogueRepository;
    private final WordRepository wordRepository;
    private final UserLearningStateRepository learningStateRepository;

    public LearningFlowService(UserRepository userRepository,
                               TopicRepository topicRepository,
                               DialogueRepository dialogueRepository,
                               WordRepository wordRepository,
                               UserLearningStateRepository learningStateRepository) {
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
        this.dialogueRepository = dialogueRepository;
        this.wordRepository = wordRepository;
        this.learningStateRepository = learningStateRepository;
    }

    public record WordCardDto(
            Long id,
            int wordOrder,
            String wordTarget,
            String wordNative,
            String wordUz,
            String phonetic,
            String exampleTarget,
            String exampleNative,
            String audioUrl,
            int progressOutOf20,
            String topicTitle
    ) {}

    public record DialogueDto(
            Long id,
            int dialogueNumber,
            String titleTarget,
            String titleNative,
            String contentTarget,
            String contentNative,
            String topicTitle,
            boolean hasNextDialogue
    ) {}

    public record SessionStateDto(
            Long userId,
            String stage,
            int currentWordIndex,
            int currentDialogueIndex,
            Long currentTopicId,
            String currentTopicTitle,
            int wordsLearnedRu,
            int wordsLearnedEn,
            int wordsLearnedUz,
            int streakDays,
            String resumePromptRu,
            String resumePromptEn
    ) {}

    @Transactional
    public User getOrCreateUser(Long telegramId, String username, String firstName) {
        return userRepository.findByTelegramId(telegramId).orElseGet(() -> {
            User newUser = new User(telegramId, username, firstName);
            User saved = userRepository.save(newUser);
            UserLearningState state = new UserLearningState(saved.getId(), 1L);
            learningStateRepository.save(state);
            return saved;
        });
    }

    @Transactional(readOnly = true)
    public SessionStateDto getSessionState(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));
        UserLearningState state = learningStateRepository.findByUserId(userId)
                .orElseGet(() -> new UserLearningState(user.getId(), user.getCurrentTopicId()));

        Topic topic = topicRepository.findById(state.getTopicId())
                .orElseGet(() -> new Topic("FAMILY", "Семья и друзья", "Family & Friends", "Oila va do'stlar", "👨‍👩‍👧", 1));

        Optional<Word> resumeWordOpt = wordRepository.findByTopicIdAndWordOrder(state.getTopicId(), state.getCurrentWordIndex());
        String resumeWord = resumeWordOpt.map(w -> "EN".equalsIgnoreCase(user.getTargetLanguage()) ? w.getWordEn() : w.getWordRu()).orElse("слово");

        String promptRu = String.format("Вы остановились на слове #%d «%s» в теме «%s». Продолжить?",
                state.getCurrentWordIndex(), resumeWord, topic.getTitleRu());
        String promptEn = String.format("You paused at word #%d '%s' in topic '%s'. Continue?",
                state.getCurrentWordIndex(), resumeWord, topic.getTitleEn());

        return new SessionStateDto(
                user.getId(),
                state.getStage(),
                state.getCurrentWordIndex(),
                state.getDialogueIndex(),
                state.getTopicId(),
                topic.getTitleEn(),
                user.getWordsLearnedRu(),
                user.getWordsLearnedEn(),
                user.getWordsLearnedUz(),
                user.getStreakDays(),
                promptRu,
                promptEn
        );
    }

    /**
     * Resumes directly from the exact last position without restarting from zero.
     */
    @Transactional
    public WordCardDto resume(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setStatus("ACTIVE");
        user.setLastActiveAt(LocalDateTime.now());
        userRepository.save(user);

        UserLearningState state = learningStateRepository.findByUserId(userId)
                .orElseGet(() -> learningStateRepository.save(new UserLearningState(user.getId(), user.getCurrentTopicId())));

        return getWordAt(user, state.getTopicId(), state.getCurrentWordIndex());
    }

    /**
     * Advances to the next word, saving progress after every single word.
     */
    @Transactional
    public WordCardDto nextWord(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        UserLearningState state = learningStateRepository.findByUserId(userId)
                .orElseGet(() -> learningStateRepository.save(new UserLearningState(user.getId(), user.getCurrentTopicId())));

        int currentIdx = state.getCurrentWordIndex();
        int nextIdx = currentIdx + 1;

        // Increment user's learned count for target language
        incrementWordCount(user);

        if (nextIdx > 20) {
            nextIdx = 1;
            // Topic completed or loop to next topic
            Long nextTopicId = (state.getTopicId() % 5) + 1;
            state.setTopicId(nextTopicId);
            state.setDailyCompleted(true);
            state.setStage("REINFORCE_PROMPT");
            user.setStreakDays(user.getStreakDays() + 1);
            if (user.getStreakDays() > user.getLongestStreak()) {
                user.setLongestStreak(user.getStreakDays());
            }
        } else if (nextIdx == 11) {
            state.setStage("DIALOGUE_1"); // Transition after first 10 words
        } else if (nextIdx == 21) {
            state.setStage("DIALOGUE_2");
        } else {
            state.setStage(nextIdx <= 10 ? "WORDS_PART_1" : "WORDS_PART_2");
        }

        state.setCurrentWordIndex(nextIdx);
        state.setLastUpdatedAt(LocalDateTime.now());
        learningStateRepository.save(state);

        user.setCurrentWordIndex(nextIdx);
        user.setCurrentTopicId(state.getTopicId());
        user.setLastActiveAt(LocalDateTime.now());
        user.setStatus("ACTIVE");
        userRepository.save(user);

        return getWordAt(user, state.getTopicId(), nextIdx);
    }

    private void incrementWordCount(User user) {
        switch (user.getTargetLanguage().toUpperCase()) {
            case "RU" -> user.setWordsLearnedRu(user.getWordsLearnedRu() + 1);
            case "UZ" -> user.setWordsLearnedUz(user.getWordsLearnedUz() + 1);
            default -> user.setWordsLearnedEn(user.getWordsLearnedEn() + 1);
        }
    }

    @Transactional(readOnly = true)
    public WordCardDto getWordAt(User user, Long topicId, int wordOrder) {
        Topic topic = topicRepository.findById(topicId).orElseThrow();
        Word word = wordRepository.findByTopicIdAndWordOrder(topicId, wordOrder)
                .orElseGet(() -> wordRepository.findTop20ByTopicIdOrderByWordOrderAsc(topicId).stream().findFirst()
                        .orElse(new Word(topicId, wordOrder, "Семья", "Family", "Oila", "fam-uh-lee", "[fɛmɪli]", "oi-la", "Это моя семья", "This is my family", "Bu mening oilam")));

        String targetLang = user.getTargetLanguage().toUpperCase();
        String wordTarget = switch (targetLang) {
            case "RU" -> word.getWordRu();
            case "UZ" -> word.getWordUz();
            default -> word.getWordEn();
        };

        String wordNative = switch (user.getNativeLanguage().toUpperCase()) {
            case "EN" -> word.getWordEn();
            case "UZ" -> word.getWordUz();
            default -> word.getWordRu();
        };

        String phonetic = switch (targetLang) {
            case "RU" -> word.getPhoneticRu();
            case "UZ" -> word.getPhoneticUz();
            default -> word.getPhoneticEn();
        };

        String exampleTarget = switch (targetLang) {
            case "RU" -> word.getExampleRu();
            case "UZ" -> word.getExampleUz();
            default -> word.getExampleEn();
        };

        String exampleNative = switch (user.getNativeLanguage().toUpperCase()) {
            case "EN" -> word.getExampleEn();
            case "UZ" -> word.getExampleUz();
            default -> word.getExampleRu();
        };

        String audioUrl = "/api/tts/synthesize?text=" + java.net.URLEncoder.encode(wordTarget, java.nio.charset.StandardCharsets.UTF_8)
                + "&lang=" + targetLang;

        return new WordCardDto(
                word.getId(),
                wordOrder,
                wordTarget,
                wordNative,
                word.getWordUz(),
                phonetic,
                exampleTarget,
                exampleNative,
                audioUrl,
                wordOrder,
                topic.getTitleEn()
        );
    }

    @Transactional
    public DialogueDto getDialogue(Long userId, int dialogueOrder) {
        User user = userRepository.findById(userId).orElseThrow();
        UserLearningState state = learningStateRepository.findByUserId(userId).orElseThrow();
        Long topicId = state.getTopicId();
        Topic topic = topicRepository.findById(topicId).orElseThrow();

        Dialogue dialogue = dialogueRepository.findByTopicIdAndDialogueOrder(topicId, dialogueOrder)
                .orElseGet(() -> new Dialogue(topicId, dialogueOrder, "Диалог " + dialogueOrder, "Dialogue " + dialogueOrder, "Dialog " + dialogueOrder,
                        "Привет! Как дела?\n— Отлично, спасибо!",
                        "Hello! How are you?\n— Great, thank you!",
                        "Salom! Ishlar qalay?\n— Juda yaxshi, rahmat!"));

        state.setDialogueIndex(dialogueOrder);
        learningStateRepository.save(state);

        boolean hasNext = dialogueOrder < 5;
        return new DialogueDto(
                dialogue.getId(),
                dialogueOrder,
                "EN".equalsIgnoreCase(user.getTargetLanguage()) ? dialogue.getTitleEn() : dialogue.getTitleRu(),
                dialogue.getTitleRu(),
                "EN".equalsIgnoreCase(user.getTargetLanguage()) ? dialogue.getContentEn() : dialogue.getContentRu(),
                dialogue.getContentRu(),
                topic.getTitleEn(),
                hasNext
        );
    }

    @Transactional
    public void switchLanguage(Long userId, String newTargetLang) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setTargetLanguage(newTargetLang.toUpperCase());
        user.setLastActiveAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Transactional
    public void resetProgress(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setCurrentWordIndex(1);
        user.setCurrentTopicId(1L);
        user.setStatus("ACTIVE");
        user.setLastActiveAt(LocalDateTime.now());
        userRepository.save(user);

        UserLearningState state = learningStateRepository.findByUserId(userId)
                .orElseGet(() -> new UserLearningState(userId, 1L));
        state.setCurrentWordIndex(1);
        state.setDialogueIndex(1);
        state.setStage("WORDS_PART_1");
        state.setDailyCompleted(false);
        learningStateRepository.save(state);
    }
}
