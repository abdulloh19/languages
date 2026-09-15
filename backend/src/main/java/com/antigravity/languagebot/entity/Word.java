package com.antigravity.languagebot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "words")
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "topic_id")
    private Long topicId;

    @Column(name = "word_order")
    private int wordOrder; // 1 to 20

    @Column(name = "word_ru")
    private String wordRu;

    @Column(name = "word_en")
    private String wordEn;

    @Column(name = "word_uz")
    private String wordUz;

    @Column(name = "phonetic_ru")
    private String phoneticRu;

    @Column(name = "phonetic_en")
    private String phoneticEn;

    @Column(name = "phonetic_uz")
    private String phoneticUz;

    @Column(name = "example_ru", length = 500)
    private String exampleRu;

    @Column(name = "example_en", length = 500)
    private String exampleEn;

    @Column(name = "example_uz", length = 500)
    private String exampleUz;

    public Word() {}

    public Word(Long topicId, int wordOrder, String wordRu, String wordEn, String wordUz,
                String phoneticRu, String phoneticEn, String phoneticUz,
                String exampleRu, String exampleEn, String exampleUz) {
        this.topicId = topicId;
        this.wordOrder = wordOrder;
        this.wordRu = wordRu;
        this.wordEn = wordEn;
        this.wordUz = wordUz;
        this.phoneticRu = phoneticRu;
        this.phoneticEn = phoneticEn;
        this.phoneticUz = phoneticUz;
        this.exampleRu = exampleRu;
        this.exampleEn = exampleEn;
        this.exampleUz = exampleUz;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTopicId() { return topicId; }
    public void setTopicId(Long topicId) { this.topicId = topicId; }

    public int getWordOrder() { return wordOrder; }
    public void setWordOrder(int wordOrder) { this.wordOrder = wordOrder; }

    public String getWordRu() { return wordRu; }
    public void setWordRu(String wordRu) { this.wordRu = wordRu; }

    public String getWordEn() { return wordEn; }
    public void setWordEn(String wordEn) { this.wordEn = wordEn; }

    public String getWordUz() { return wordUz; }
    public void setWordUz(String wordUz) { this.wordUz = wordUz; }

    public String getPhoneticRu() { return phoneticRu; }
    public void setPhoneticRu(String phoneticRu) { this.phoneticRu = phoneticRu; }

    public String getPhoneticEn() { return phoneticEn; }
    public void setPhoneticEn(String phoneticEn) { this.phoneticEn = phoneticEn; }

    public String getPhoneticUz() { return phoneticUz; }
    public void setPhoneticUz(String phoneticUz) { this.phoneticUz = phoneticUz; }

    public String getExampleRu() { return exampleRu; }
    public void setExampleRu(String exampleRu) { this.exampleRu = exampleRu; }

    public String getExampleEn() { return exampleEn; }
    public void setExampleEn(String exampleEn) { this.exampleEn = exampleEn; }

    public String getExampleUz() { return exampleUz; }
    public void setExampleUz(String exampleUz) { this.exampleUz = exampleUz; }
}
