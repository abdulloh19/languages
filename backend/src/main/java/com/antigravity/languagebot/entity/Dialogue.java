package com.antigravity.languagebot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "dialogues")
public class Dialogue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "topic_id")
    private Long topicId;

    @Column(name = "dialogue_order")
    private int dialogueOrder; // 1 to 5

    @Column(name = "title_ru")
    private String titleRu;

    @Column(name = "title_en")
    private String titleEn;

    @Column(name = "title_uz")
    private String titleUz;

    @Column(name = "content_ru", columnDefinition = "TEXT")
    private String contentRu;

    @Column(name = "content_en", columnDefinition = "TEXT")
    private String contentEn;

    @Column(name = "content_uz", columnDefinition = "TEXT")
    private String contentUz;

    public Dialogue() {}

    public Dialogue(Long topicId, int dialogueOrder, String titleRu, String titleEn, String titleUz,
                    String contentRu, String contentEn, String contentUz) {
        this.topicId = topicId;
        this.dialogueOrder = dialogueOrder;
        this.titleRu = titleRu;
        this.titleEn = titleEn;
        this.titleUz = titleUz;
        this.contentRu = contentRu;
        this.contentEn = contentEn;
        this.contentUz = contentUz;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTopicId() { return topicId; }
    public void setTopicId(Long topicId) { this.topicId = topicId; }

    public int getDialogueOrder() { return dialogueOrder; }
    public void setDialogueOrder(int dialogueOrder) { this.dialogueOrder = dialogueOrder; }

    public String getTitleRu() { return titleRu; }
    public void setTitleRu(String titleRu) { this.titleRu = titleRu; }

    public String getTitleEn() { return titleEn; }
    public void setTitleEn(String titleEn) { this.titleEn = titleEn; }

    public String getTitleUz() { return titleUz; }
    public void setTitleUz(String titleUz) { this.titleUz = titleUz; }

    public String getContentRu() { return contentRu; }
    public void setContentRu(String contentRu) { this.contentRu = contentRu; }

    public String getContentEn() { return contentEn; }
    public void setContentEn(String contentEn) { this.contentEn = contentEn; }

    public String getContentUz() { return contentUz; }
    public void setContentUz(String contentUz) { this.contentUz = contentUz; }
}
