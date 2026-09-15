package com.antigravity.languagebot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification_logs")
public class NotificationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "trigger_type")
    private String triggerType; // LOSS_AVERSION, CURIOSITY_GAP, COMMITMENT, SOCIAL_PROOF

    @Column(name = "message_ru", columnDefinition = "TEXT")
    private String messageRu;

    @Column(name = "message_en", columnDefinition = "TEXT")
    private String messageEn;

    @Column(name = "sent_at")
    private LocalDateTime sentAt = LocalDateTime.now();

    @Column(name = "resumed")
    private boolean resumed = false;

    public NotificationLog() {}

    public NotificationLog(Long userId, String triggerType, String messageRu, String messageEn) {
        this.userId = userId;
        this.triggerType = triggerType;
        this.messageRu = messageRu;
        this.messageEn = messageEn;
        this.sentAt = LocalDateTime.now();
        this.resumed = false;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTriggerType() { return triggerType; }
    public void setTriggerType(String triggerType) { this.triggerType = triggerType; }

    public String getMessageRu() { return messageRu; }
    public void setMessageRu(String messageRu) { this.messageRu = messageRu; }

    public String getMessageEn() { return messageEn; }
    public void setMessageEn(String messageEn) { this.messageEn = messageEn; }

    public LocalDateTime getSentAt() { return sentAt; }
    public void setSentAt(LocalDateTime sentAt) { this.sentAt = sentAt; }

    public boolean isResumed() { return resumed; }
    public void setResumed(boolean resumed) { this.resumed = resumed; }
}
