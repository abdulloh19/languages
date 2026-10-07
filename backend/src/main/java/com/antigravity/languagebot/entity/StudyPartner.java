package com.antigravity.languagebot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "study_partners")
public class StudyPartner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user1_id")
    private Long user1Id;

    @Column(name = "user2_id")
    private Long user2Id;

    @Column(name = "status")
    private String status = "ACTIVE"; // ACTIVE, PENDING, ENDED

    @Column(name = "matched_at")
    private LocalDateTime matchedAt = LocalDateTime.now();

    @Column(name = "last_nudge_at")
    private LocalDateTime lastNudgeAt;

    public StudyPartner() {}

    public StudyPartner(Long user1Id, Long user2Id) {
        this.user1Id = user1Id;
        this.user2Id = user2Id;
        this.matchedAt = LocalDateTime.now();
        this.status = "ACTIVE";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUser1Id() { return user1Id; }
    public void setUser1Id(Long user1Id) { this.user1Id = user1Id; }

    public Long getUser2Id() { return user2Id; }
    public void setUser2Id(Long user2Id) { this.user2Id = user2Id; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getMatchedAt() { return matchedAt; }
    public void setMatchedAt(LocalDateTime matchedAt) { this.matchedAt = matchedAt; }

    public LocalDateTime getLastNudgeAt() { return lastNudgeAt; }
    public void setLastNudgeAt(LocalDateTime lastNudgeAt) { this.lastNudgeAt = lastNudgeAt; }
}
