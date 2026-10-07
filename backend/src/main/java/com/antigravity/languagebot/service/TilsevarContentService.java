package com.antigravity.languagebot.service;

import com.antigravity.languagebot.entity.*;
import com.antigravity.languagebot.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class TilsevarContentService {

    private static final Logger log = LoggerFactory.getLogger(TilsevarContentService.class);

    private final LessonRepository lessonRepository;
    private final StoryRepository storyRepository;
    private final StoryPageRepository storyPageRepository;
    private final TaskItemRepository taskItemRepository;
    private final DailyChecklistRepository dailyChecklistRepository;
    private final StudyPartnerRepository studyPartnerRepository;
    private final UserRepository userRepository;
    private final WordRepository wordRepository;

    public TilsevarContentService(LessonRepository lessonRepository,
                                  StoryRepository storyRepository,
                                  StoryPageRepository storyPageRepository,
                                  TaskItemRepository taskItemRepository,
                                  DailyChecklistRepository dailyChecklistRepository,
                                  StudyPartnerRepository studyPartnerRepository,
                                  UserRepository userRepository,
                                  WordRepository wordRepository) {
        this.lessonRepository = lessonRepository;
        this.storyRepository = storyRepository;
        this.storyPageRepository = storyPageRepository;
        this.taskItemRepository = taskItemRepository;
        this.dailyChecklistRepository = dailyChecklistRepository;
        this.studyPartnerRepository = studyPartnerRepository;
        this.userRepository = userRepository;
        this.wordRepository = wordRepository;
    }

    public List<Lesson> getLessons(String level) {
        if (level == null || level.isBlank() || level.equalsIgnoreCase("ALL")) {
            return lessonRepository.findAllByOrderByLevelAscLessonOrderAsc();
        }
        return lessonRepository.findByLevelOrderByUnitNumberAscLessonOrderAsc(level);
    }

    public Optional<Lesson> getLessonById(Long id) {
        return lessonRepository.findById(id);
    }

    public List<Word> getWordsForLesson(Long lessonId) {
        // Map to TopicId or return words
        return wordRepository.findByTopicIdOrderByWordOrderAsc(lessonId != null ? lessonId : 1L);
    }

    public List<Story> getStories(String level) {
        if (level == null || level.isBlank() || level.equalsIgnoreCase("ALL")) {
            return storyRepository.findAllByOrderByIdAsc();
        }
        return storyRepository.findByLevelOrderByIdAsc(level);
    }

    public Optional<Story> getStoryById(Long id) {
        return storyRepository.findById(id);
    }

    public List<StoryPage> getStoryPages(Long storyId) {
        return storyPageRepository.findByStoryIdOrderByPageNumberAsc(storyId);
    }

    public List<TaskItem> getTasks(String level, String taskType) {
        if (taskType != null && !taskType.isBlank()) {
            if (level != null && !level.isBlank() && !level.equalsIgnoreCase("ALL")) {
                return taskItemRepository.findByLevelAndTaskTypeOrderByIdAsc(level, taskType);
            }
            return taskItemRepository.findByTaskTypeOrderByIdAsc(taskType);
        }
        if (level != null && !level.isBlank() && !level.equalsIgnoreCase("ALL")) {
            return taskItemRepository.findByLevelOrderByIdAsc(level);
        }
        return taskItemRepository.findAll();
    }

    @Transactional
    public DailyChecklist getOrCreateTodayChecklist(Long userId) {
        LocalDate today = LocalDate.now();
        return dailyChecklistRepository.findByUserIdAndChecklistDate(userId, today)
                .orElseGet(() -> dailyChecklistRepository.save(new DailyChecklist(userId, today)));
    }

    @Transactional
    public DailyChecklist toggleChecklist(Long userId, String itemKey) {
        DailyChecklist cl = getOrCreateTodayChecklist(userId);
        if ("vocab".equalsIgnoreCase(itemKey)) {
            cl.setVocabDone(!cl.isVocabDone());
        } else if ("story".equalsIgnoreCase(itemKey)) {
            cl.setStoryDone(!cl.isStoryDone());
        } else if ("speaking".equalsIgnoreCase(itemKey)) {
            cl.setSpeakingDone(!cl.isSpeakingDone());
        }
        return dailyChecklistRepository.save(cl);
    }

    @Transactional
    public Map<String, Object> claimStreak(Long userId) {
        DailyChecklist cl = getOrCreateTodayChecklist(userId);
        if (cl.isStreakClaimed()) {
            return Map.of("success", false, "message", "Bugungi streak allaqachon qabul qilingan!");
        }
        if (!cl.isAllCompleted()) {
            return Map.of("success", false, "message", "Hamma kunlik vazifalar (Lug'at, Hikoya, Speaking) bajarilmagan!");
        }

        cl.setStreakClaimed(true);
        dailyChecklistRepository.save(cl);

        Optional<User> userOpt = userRepository.findById(userId);
        int newStreak = 1;
        int newXp = 50;
        if (userOpt.isPresent()) {
            User u = userOpt.get();
            u.setStreakDays(u.getStreakDays() + 1);
            if (u.getStreakDays() > u.getLongestStreak()) {
                u.setLongestStreak(u.getStreakDays());
            }
            u.setXpPoints(u.getXpPoints() + 50);
            u.setTokenBalance(u.getTokenBalance() + 5);
            u.setLastActiveAt(LocalDateTime.now());
            userRepository.save(u);
            newStreak = u.getStreakDays();
            newXp = u.getXpPoints();
        }

        return Map.of(
                "success", true,
                "message", "Tabriklaymiz! +50 XP va 1 kunlik Streak qo'shildi! 🔥",
                "streakDays", newStreak,
                "xpPoints", newXp
        );
    }

    public record SpeakingEvaluationResult(
            boolean passed,
            int accuracyScore,
            String targetText,
            String recognizedText,
            List<WordFeedback> wordDetails,
            String feedbackMessage,
            int earnedXp
    ) {}

    public record WordFeedback(String word, boolean isMatch) {}

    @Transactional
    public SpeakingEvaluationResult evaluateSpeaking(Long userId, Long taskId, String spokenText) {
        Optional<TaskItem> taskOpt = taskItemRepository.findById(taskId);
        String targetText = "I would like to learn English every single day";
        if (taskOpt.isPresent()) {
            targetText = taskOpt.get().getQuestionText();
        }

        String cleanedTarget = targetText.trim().toLowerCase().replaceAll("[^a-z0-9 ]", "");
        String cleanedSpoken = (spokenText != null ? spokenText : "").trim().toLowerCase().replaceAll("[^a-z0-9 ]", "");

        String[] targetWords = cleanedTarget.split("\\s+");
        String[] spokenWords = cleanedSpoken.split("\\s+");
        Set<String> spokenSet = new HashSet<>(Arrays.asList(spokenWords));

        int matches = 0;
        List<WordFeedback> details = new ArrayList<>();
        for (String w : targetWords) {
            boolean matched = spokenSet.contains(w);
            if (matched) matches++;
            details.add(new WordFeedback(w, matched));
        }

        int score = targetWords.length > 0 ? (int) Math.round(((double) matches / targetWords.length) * 100) : 0;
        if (cleanedSpoken.isBlank()) score = 0;

        boolean passed = score >= 65;
        int earnedXp = passed ? 25 : 5;

        // Auto-mark checklist speaking task as done if passed
        if (passed) {
            DailyChecklist cl = getOrCreateTodayChecklist(userId);
            cl.setSpeakingDone(true);
            dailyChecklistRepository.save(cl);

            userRepository.findById(userId).ifPresent(u -> {
                u.setXpPoints(u.getXpPoints() + earnedXp);
                u.setLastActiveAt(LocalDateTime.now());
                userRepository.save(u);
            });
        }

        String feedback = passed ?
                "Ajoyib talaffuz! " + score + "% aniqlik bilan o'qidingiz." :
                "Yaxshi harakat! Biroq ba'zi so'zlarda xatolik bor (" + score + "%). Qaytadan urinib ko'ring.";

        return new SpeakingEvaluationResult(passed, score, targetText, spokenText, details, feedback, earnedXp);
    }

    public record StudyPartnerDto(
            Long partnerId,
            String partnerName,
            String partnerLevel,
            int streakDays,
            int xpPoints,
            boolean isChecklistDoneToday,
            LocalDateTime lastActive,
            String nudgeStatus
    ) {}

    @Transactional
    public StudyPartnerDto getStudyPartner(Long userId) {
        User me = userRepository.findById(userId).orElse(null);
        if (me == null) return null;

        Optional<StudyPartner> partnerLink = studyPartnerRepository.findActivePartnerForUser(userId);
        if (partnerLink.isEmpty()) {
            return null;
        }

        Long partnerUserId = partnerLink.get().getUser1Id().equals(userId) ?
                partnerLink.get().getUser2Id() : partnerLink.get().getUser1Id();

        User partner = userRepository.findById(partnerUserId).orElse(null);
        if (partner == null) return null;

        DailyChecklist partnerCl = getOrCreateTodayChecklist(partner.getId());

        String nudgeMsg = partnerLink.get().getLastNudgeAt() != null &&
                partnerLink.get().getLastNudgeAt().isAfter(LocalDateTime.now().minusHours(2)) ?
                "Nudge yuborilgan" : "Turtib qo'yish mumkin";

        return new StudyPartnerDto(
                partner.getId(),
                partner.getFirstName() != null ? partner.getFirstName() : "O'quvchi " + partner.getId(),
                partner.getCurrentLevel(),
                partner.getStreakDays(),
                partner.getXpPoints(),
                partnerCl.isAllCompleted(),
                partner.getLastActiveAt(),
                nudgeMsg
        );
    }

    @Transactional
    public StudyPartnerDto matchPartner(Long userId) {
        // Find an active user with similar level who is not self
        User me = userRepository.findById(userId).orElse(null);
        if (me == null) return null;

        List<User> candidates = userRepository.findAll();
        User candidate = candidates.stream()
                .filter(u -> !u.getId().equals(userId))
                .findFirst()
                .orElse(null);

        if (candidate != null) {
            StudyPartner sp = new StudyPartner(userId, candidate.getId());
            studyPartnerRepository.save(sp);

            me.setStudyPartnerId(candidate.getId());
            me.setStudyPartnerName(candidate.getFirstName());
            userRepository.save(me);

            return getStudyPartner(userId);
        }
        return null;
    }

    @Transactional
    public Map<String, Object> sendPartnerNudge(Long userId) {
        Optional<StudyPartner> link = studyPartnerRepository.findActivePartnerForUser(userId);
        if (link.isEmpty()) {
            return Map.of("success", false, "message", "Sizda hali sherik yo'q!");
        }

        StudyPartner sp = link.get();
        sp.setLastNudgeAt(LocalDateTime.now());
        studyPartnerRepository.save(sp);

        Long partnerId = sp.getUser1Id().equals(userId) ? sp.getUser2Id() : sp.getUser1Id();
        String partnerName = userRepository.findById(partnerId).map(User::getFirstName).orElse("Sherigingiz");

        return Map.of(
                "success", true,
                "message", partnerName + " ga eslatma (Nudge) muvaffaqiyatli yuborildi! 🔔"
        );
    }
}
