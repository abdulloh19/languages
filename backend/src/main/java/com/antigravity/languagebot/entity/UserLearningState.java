package com.antigravity.languagebot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_learning_states")
public class UserLearningState {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", unique = true)
    private Long userId;

    @Column(name = "topic_id")
    private Long topicId = 1L;

    @Column(name = "current_word_index")
    private int currentWordIndex = 1; // 1 to 20

    @Column(name = "dialogue_index")
    private int dialogueIndex = 1; // 1 to 5

    @Column(name = "stage")
    private String stage = "WORDS_PART_1"; // WORDS_PART_1, DIALOGUE_1, WORDS_PART_2, DIALOGUE_2, REINFORCE_PROMPT, GAME, COMPLETED

    @Column(name = "daily_completed")
    private boolean dailyCompleted = false;

    @Column(name = "last_updated_at")
    private LocalDateTime lastUpdatedAt = LocalDateTime.now();

    public UserLearningState() {}

    public UserLearningState(Long userId, Long topicId) {
        this.userId = userId;
        this.topicId = topicId;
        this.currentWordIndex = 1;
        this.dialogueIndex = 1;
        this.stage = "WORDS_PART_1";
        this.lastUpdatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getTopicId() { return topicId; }
    public void setTopicId(Long topicId) { this.topicId = topicId; }

    public int getCurrentWordIndex() { return currentWordIndex; }
    public void setCurrentWordIndex(int currentWordIndex) { this.currentWordIndex = currentWordIndex; }

    public int getDialogueIndex() { return dialogueIndex; }
    public void setDialogueIndex(int dialogueIndex) { this.dialogueIndex = dialogueIndex; }

    public String getStage() { return stage; }
    public void setStage(String stage) { this.stage = stage; }

    public boolean isDailyCompleted() { return dailyCompleted; }
    public void setDailyCompleted(boolean dailyCompleted) { this.dailyCompleted = dailyCompleted; }

    public LocalDateTime getLastUpdatedAt() { return lastUpdatedAt; }
    public void setLastUpdatedAt(LocalDateTime lastUpdatedAt) { this.lastUpdatedAt = lastUpdatedAt; }
}
