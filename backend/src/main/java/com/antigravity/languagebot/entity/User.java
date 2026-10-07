package com.antigravity.languagebot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "telegram_id", unique = true)
    private Long telegramId;

    private String username;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "target_language")
    private String targetLanguage = "EN"; // Default target language

    @Column(name = "native_language")
    private String nativeLanguage = "UZ"; // Default native language is Uzbek

    @Column(name = "words_learned_ru")
    private int wordsLearnedRu = 0;

    @Column(name = "words_learned_en")
    private int wordsLearnedEn = 0;

    @Column(name = "words_learned_uz")
    private int wordsLearnedUz = 0;

    @Column(name = "current_topic_id")
    private Long currentTopicId = 1L;

    @Column(name = "current_word_index")
    private int currentWordIndex = 1; // 1 to 20

    @Column(name = "status")
    private String status = "ACTIVE"; // ACTIVE or INACTIVE

    @Column(name = "last_active_at")
    private LocalDateTime lastActiveAt;

    @Column(name = "streak_days")
    private int streakDays = 1;

    @Column(name = "longest_streak")
    private int longestStreak = 1;

    @Column(name = "last_bonus_claimed_at")
    private LocalDateTime lastBonusClaimedAt;

    @Column(name = "token_balance")
    private int tokenBalance = 10;

    @Column(name = "current_level")
    private String currentLevel = "Starter"; // Starter, Beginner, Elementary, Pre-Intermediate, Intermediate

    @Column(name = "xp_points")
    private int xpPoints = 120;

    @Column(name = "study_partner_id")
    private Long studyPartnerId;

    @Column(name = "study_partner_name")
    private String studyPartnerName;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {
        this.lastActiveAt = LocalDateTime.now();
    }

    public User(Long telegramId, String username, String firstName) {
        this.telegramId = telegramId;
        this.username = username;
        this.firstName = firstName;
        this.lastActiveAt = LocalDateTime.now();
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTelegramId() { return telegramId; }
    public void setTelegramId(Long telegramId) { this.telegramId = telegramId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getTargetLanguage() { return targetLanguage; }
    public void setTargetLanguage(String targetLanguage) { this.targetLanguage = targetLanguage; }

    public String getNativeLanguage() { return nativeLanguage; }
    public void setNativeLanguage(String nativeLanguage) { this.nativeLanguage = nativeLanguage; }

    public int getWordsLearnedRu() { return wordsLearnedRu; }
    public void setWordsLearnedRu(int wordsLearnedRu) { this.wordsLearnedRu = wordsLearnedRu; }

    public int getWordsLearnedEn() { return wordsLearnedEn; }
    public void setWordsLearnedEn(int wordsLearnedEn) { this.wordsLearnedEn = wordsLearnedEn; }

    public int getWordsLearnedUz() { return wordsLearnedUz; }
    public void setWordsLearnedUz(int wordsLearnedUz) { this.wordsLearnedUz = wordsLearnedUz; }

    public Long getCurrentTopicId() { return currentTopicId; }
    public void setCurrentTopicId(Long currentTopicId) { this.currentTopicId = currentTopicId; }

    public int getCurrentWordIndex() { return currentWordIndex; }
    public void setCurrentWordIndex(int currentWordIndex) { this.currentWordIndex = currentWordIndex; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getLastActiveAt() { return lastActiveAt; }
    public void setLastActiveAt(LocalDateTime lastActiveAt) { this.lastActiveAt = lastActiveAt; }

    public int getStreakDays() { return streakDays; }
    public void setStreakDays(int streakDays) { this.streakDays = streakDays; }

    public int getLongestStreak() { return longestStreak; }
    public void setLongestStreak(int longestStreak) { this.longestStreak = longestStreak; }

    public LocalDateTime getLastBonusClaimedAt() { return lastBonusClaimedAt; }
    public void setLastBonusClaimedAt(LocalDateTime lastBonusClaimedAt) { this.lastBonusClaimedAt = lastBonusClaimedAt; }

    public int getTokenBalance() { return tokenBalance; }
    public void setTokenBalance(int tokenBalance) { this.tokenBalance = tokenBalance; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getCurrentLevel() { return currentLevel; }
    public void setCurrentLevel(String currentLevel) { this.currentLevel = currentLevel; }

    public int getXpPoints() { return xpPoints; }
    public void setXpPoints(int xpPoints) { this.xpPoints = xpPoints; }

    public Long getStudyPartnerId() { return studyPartnerId; }
    public void setStudyPartnerId(Long studyPartnerId) { this.studyPartnerId = studyPartnerId; }

    public String getStudyPartnerName() { return studyPartnerName; }
    public void setStudyPartnerName(String studyPartnerName) { this.studyPartnerName = studyPartnerName; }

    public long getDaysInactive() {
        if (lastActiveAt == null) return 0;
        return java.time.Duration.between(lastActiveAt, LocalDateTime.now()).toDays();
    }
}
