package com.antigravity.languagebot.service;

import com.antigravity.languagebot.entity.NotificationLog;
import com.antigravity.languagebot.entity.Topic;
import com.antigravity.languagebot.entity.User;
import com.antigravity.languagebot.entity.Word;
import com.antigravity.languagebot.repository.NotificationLogRepository;
import com.antigravity.languagebot.repository.TopicRepository;
import com.antigravity.languagebot.repository.UserRepository;
import com.antigravity.languagebot.repository.WordRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PsychologicalNudgeService {

    private static final Logger log = LoggerFactory.getLogger(PsychologicalNudgeService.class);

    private final UserRepository userRepository;
    private final WordRepository wordRepository;
    private final TopicRepository topicRepository;
    private final NotificationLogRepository notificationLogRepository;

    public PsychologicalNudgeService(UserRepository userRepository,
                                     WordRepository wordRepository,
                                     TopicRepository topicRepository,
                                     NotificationLogRepository notificationLogRepository) {
        this.userRepository = userRepository;
        this.wordRepository = wordRepository;
        this.topicRepository = topicRepository;
        this.notificationLogRepository = notificationLogRepository;
    }

    public record NudgePayload(
            Long userId,
            String triggerType,
            String messageRu,
            String messageEn,
            String resumeWord,
            String currentTopicTitle,
            int wordsLearned,
            long daysInactive
    ) {}

    /**
     * Builds a psychologically-crafted nudge using Cialdini & Fogg Behavioral triggers
     * based on user's exact state, inactive days, and last saved word position.
     */
    public NudgePayload buildNudge(User user) {
        long daysInactive = Math.max(1, user.getDaysInactive());
        int totalWords = user.getWordsLearnedRu() + user.getWordsLearnedEn() + user.getWordsLearnedUz();
        int wordIndex = Math.max(1, user.getCurrentWordIndex());
        Long topicId = user.getCurrentTopicId() != null ? user.getCurrentTopicId() : 1L;

        Optional<Word> wordOpt = wordRepository.findByTopicIdAndWordOrder(topicId, wordIndex);
        String wordTarget = wordOpt.map(w -> switch (user.getTargetLanguage().toUpperCase()) {
            case "RU" -> w.getWordRu();
            case "UZ" -> w.getWordUz();
            default -> w.getWordEn();
        }).orElse("Conversation");

        Optional<Topic> topicOpt = topicRepository.findById(topicId);
        String topicTitle = topicOpt.map(Topic::getTitleEn).orElse("General");

        // Rotate trigger type based on user id or days inactive
        String triggerType = switch ((int) (user.getId() % 4)) {
            case 0 -> "LOSS_AVERSION";
            case 1 -> "CURIOSITY_GAP";
            case 2 -> "COMMITMENT";
            default -> "SOCIAL_PROOF";
        };

        String psychologicalHookRu = switch (triggerType) {
            case "LOSS_AVERSION" -> "⚠️ Вы рискуете потерять накопленную серию из " + user.getStreakDays() + " дней и темп обучения!";
            case "CURIOSITY_GAP" -> "✨ Следующее слово откроет ключевую фразу в теме «" + (topicOpt.map(Topic::getTitleRu).orElse("Тема")) + "»...";
            case "COMMITMENT" -> "🎯 Вы дали себе обещание учить по 20 слов каждый день. Сделайте один шаг!";
            default -> "🔥 92% учеников вашего уровня сегодня уже выполнили свою дневную норму!";
        };

        String psychologicalHookEn = switch (triggerType) {
            case "LOSS_AVERSION" -> "⚠️ You are about to lose your " + user.getStreakDays() + "-day streak and learning momentum!";
            case "CURIOSITY_GAP" -> "✨ The next word will unlock an essential phrase in \"" + topicTitle + "\"...";
            case "COMMITMENT" -> "🎯 You promised yourself 20 words a day. Take one simple step today!";
            default -> "🔥 92% of learners at your level have already completed their daily goal today!";
        };

        String name = (user.getFirstName() != null && !user.getFirstName().isBlank())
                ? user.getFirstName() : "Learner";

        String messageRu = String.format(
                "«%s, вы выучили %d слов и остановились %d дн. назад. Ваш прогресс ждёт вас.\n\n%s\n\nПродолжим со слова «%s»? Нажмите ДА — и мы вернёмся ровно туда, где вы остановились.»",
                name, totalWords, daysInactive, psychologicalHookRu, wordTarget
        );

        String messageEn = String.format(
                "\"%s, you've learned %d words and paused %d days ago. Your progress is waiting.\n\n%s\n\nShall we continue from '%s'? Tap YES — and we'll resume exactly where you left off.\"",
                name, totalWords, daysInactive, psychologicalHookEn, wordTarget
        );

        return new NudgePayload(user.getId(), triggerType, messageRu, messageEn, wordTarget, topicTitle, totalWords, daysInactive);
    }

    @Transactional
    public NotificationLog dispatchNudge(User user) {
        NudgePayload payload = buildNudge(user);
        NotificationLog logEntry = new NotificationLog(
                user.getId(),
                payload.triggerType(),
                payload.messageRu(),
                payload.messageEn()
        );
        log.info("Sending psychological nudge [{}] to User {}: {}", payload.triggerType(), user.getId(), payload.messageEn());
        return notificationLogRepository.save(logEntry);
    }
}
