package com.antigravity.languagebot.service;

import com.antigravity.languagebot.entity.NotificationLog;
import com.antigravity.languagebot.entity.Topic;
import com.antigravity.languagebot.entity.User;
import com.antigravity.languagebot.entity.UserLearningState;
import com.antigravity.languagebot.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final UserLearningStateRepository learningStateRepository;
    private final TopicRepository topicRepository;
    private final WordRepository wordRepository;
    private final NotificationLogRepository notificationLogRepository;
    private final PsychologicalNudgeService psychologicalNudgeService;

    public DashboardService(UserRepository userRepository,
                            UserLearningStateRepository learningStateRepository,
                            TopicRepository topicRepository,
                            WordRepository wordRepository,
                            NotificationLogRepository notificationLogRepository,
                            PsychologicalNudgeService psychologicalNudgeService) {
        this.userRepository = userRepository;
        this.learningStateRepository = learningStateRepository;
        this.topicRepository = topicRepository;
        this.wordRepository = wordRepository;
        this.notificationLogRepository = notificationLogRepository;
        this.psychologicalNudgeService = psychologicalNudgeService;
    }

    public record DashboardSummaryDto(
            long totalUsers,
            long activeUsers,
            long inactiveUsers,
            long totalWordsLearned,
            double averageStreak,
            List<TopicSummaryDto> topics
    ) {}

    public record TopicSummaryDto(
            Long id,
            String key,
            String titleEn,
            String titleRu,
            String icon
    ) {}

    public record UserListItemDto(
            Long id,
            Long telegramId,
            String username,
            String firstName,
            String targetLanguage,
            String status,
            long daysInactive,
            int wordsRu,
            int wordsEn,
            int wordsUz,
            int totalWords,
            int streakDays,
            Long currentTopicId,
            String currentTopicTitle,
            int currentWordIndex,
            String resumePointWord,
            LocalDateTime lastActiveAt
    ) {}

    @Transactional(readOnly = true)
    public DashboardSummaryDto getSummary() {
        List<User> allUsers = userRepository.findAll();
        long totalUsers = allUsers.size();
        long activeCount = allUsers.stream().filter(u -> "ACTIVE".equalsIgnoreCase(u.getStatus()) && u.getDaysInactive() == 0).count();
        long inactiveCount = totalUsers - activeCount;

        long totalWords = allUsers.stream()
                .mapToLong(u -> u.getWordsLearnedRu() + u.getWordsLearnedEn() + u.getWordsLearnedUz())
                .sum();

        double avgStreak = allUsers.stream()
                .mapToInt(User::getStreakDays)
                .average()
                .orElse(0.0);

        List<TopicSummaryDto> topics = topicRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(t -> new TopicSummaryDto(t.getId(), t.getTopicKey(), t.getTitleEn(), t.getTitleRu(), t.getIcon()))
                .collect(Collectors.toList());

        return new DashboardSummaryDto(totalUsers, activeCount, inactiveCount, totalWords, avgStreak, topics);
    }

    @Transactional(readOnly = true)
    public List<UserListItemDto> getUsers(String filterStatus, String searchQuery) {
        List<User> allUsers = userRepository.findAll();
        Map<Long, Topic> topicMap = topicRepository.findAll().stream()
                .collect(Collectors.toMap(Topic::getId, t -> t, (a, b) -> a));

        return allUsers.stream()
                .filter(u -> {
                    if (filterStatus == null || filterStatus.isBlank() || "ALL".equalsIgnoreCase(filterStatus)) {
                        return true;
                    }
                    if ("ACTIVE".equalsIgnoreCase(filterStatus)) {
                        return "ACTIVE".equalsIgnoreCase(u.getStatus()) && u.getDaysInactive() == 0;
                    }
                    if ("INACTIVE".equalsIgnoreCase(filterStatus)) {
                        return "INACTIVE".equalsIgnoreCase(u.getStatus()) || u.getDaysInactive() > 0;
                    }
                    return true;
                })
                .filter(u -> {
                    if (searchQuery == null || searchQuery.isBlank()) return true;
                    String q = searchQuery.toLowerCase();
                    return (u.getFirstName() != null && u.getFirstName().toLowerCase().contains(q))
                            || (u.getUsername() != null && u.getUsername().toLowerCase().contains(q))
                            || (u.getTelegramId() != null && u.getTelegramId().toString().contains(q));
                })
                .sorted((a, b) -> Long.compare(b.getDaysInactive(), a.getDaysInactive()))
                .map(u -> {
                    Topic topic = topicMap.get(u.getCurrentTopicId());
                    String topicTitle = topic != null ? topic.getTitleEn() : "Family & Friends";
                    int wordIdx = Math.max(1, u.getCurrentWordIndex());
                    String resumeWord = wordRepository.findByTopicIdAndWordOrder(u.getCurrentTopicId(), wordIdx)
                            .map(w -> "RU".equalsIgnoreCase(u.getTargetLanguage()) ? w.getWordRu() : w.getWordEn())
                            .orElse("Word #" + wordIdx);

                    return new UserListItemDto(
                            u.getId(),
                            u.getTelegramId(),
                            u.getUsername(),
                            u.getFirstName(),
                            u.getTargetLanguage(),
                            u.getDaysInactive() > 0 ? "INACTIVE" : "ACTIVE",
                            u.getDaysInactive(),
                            u.getWordsLearnedRu(),
                            u.getWordsLearnedEn(),
                            u.getWordsLearnedUz(),
                            u.getWordsLearnedRu() + u.getWordsLearnedEn() + u.getWordsLearnedUz(),
                            u.getStreakDays(),
                            u.getCurrentTopicId(),
                            topicTitle,
                            wordIdx,
                            resumeWord,
                            u.getLastActiveAt()
                    );
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public NotificationLog triggerManualNudge(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));
        return psychologicalNudgeService.dispatchNudge(user);
    }

    @Transactional
    public void resetUserProgress(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));
        user.setCurrentWordIndex(1);
        user.setCurrentTopicId(1L);
        user.setWordsLearnedRu(0);
        user.setWordsLearnedEn(0);
        user.setWordsLearnedUz(0);
        user.setStreakDays(1);
        user.setLastActiveAt(LocalDateTime.now());
        user.setStatus("ACTIVE");
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
