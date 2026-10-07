package com.antigravity.languagebot.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "daily_checklists", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "checklist_date"})
})
public class DailyChecklist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "checklist_date")
    private LocalDate checklistDate = LocalDate.now();

    @Column(name = "vocab_done")
    private boolean vocabDone = false;

    @Column(name = "story_done")
    private boolean storyDone = false;

    @Column(name = "speaking_done")
    private boolean speakingDone = false;

    @Column(name = "streak_claimed")
    private boolean streakClaimed = false;

    public DailyChecklist() {}

    public DailyChecklist(Long userId, LocalDate checklistDate) {
        this.userId = userId;
        this.checklistDate = checklistDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public LocalDate getChecklistDate() { return checklistDate; }
    public void setChecklistDate(LocalDate checklistDate) { this.checklistDate = checklistDate; }

    public boolean isVocabDone() { return vocabDone; }
    public void setVocabDone(boolean vocabDone) { this.vocabDone = vocabDone; }

    public boolean isStoryDone() { return storyDone; }
    public void setStoryDone(boolean storyDone) { this.storyDone = storyDone; }

    public boolean isSpeakingDone() { return speakingDone; }
    public void setSpeakingDone(boolean speakingDone) { this.speakingDone = speakingDone; }

    public boolean isStreakClaimed() { return streakClaimed; }
    public void setStreakClaimed(boolean streakClaimed) { this.streakClaimed = streakClaimed; }

    public boolean isAllCompleted() {
        return vocabDone && storyDone && speakingDone;
    }
}
