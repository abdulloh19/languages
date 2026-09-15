package com.antigravity.languagebot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "topics")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "topic_key", unique = true)
    private String topicKey;

    @Column(name = "title_ru")
    private String titleRu;

    @Column(name = "title_en")
    private String titleEn;

    @Column(name = "title_uz")
    private String titleUz;

    @Column(name = "icon")
    private String icon;

    @Column(name = "display_order")
    private int displayOrder;

    public Topic() {}

    public Topic(String topicKey, String titleRu, String titleEn, String titleUz, String icon, int displayOrder) {
        this.topicKey = topicKey;
        this.titleRu = titleRu;
        this.titleEn = titleEn;
        this.titleUz = titleUz;
        this.icon = icon;
        this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTopicKey() { return topicKey; }
    public void setTopicKey(String topicKey) { this.topicKey = topicKey; }

    public String getTitleRu() { return titleRu; }
    public void setTitleRu(String titleRu) { this.titleRu = titleRu; }

    public String getTitleEn() { return titleEn; }
    public void setTitleEn(String titleEn) { this.titleEn = titleEn; }

    public String getTitleUz() { return titleUz; }
    public void setTitleUz(String titleUz) { this.titleUz = titleUz; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
}
