package com.antigravity.languagebot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "story_pages")
public class StoryPage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "story_id")
    private Long storyId;

    @Column(name = "page_number")
    private int pageNumber;

    @Column(name = "text_en", length = 2000)
    private String textEn;

    @Column(name = "text_uz", length = 2000)
    private String textUz;

    @Column(name = "audio_hint")
    private String audioHint;

    public StoryPage() {}

    public StoryPage(Long storyId, int pageNumber, String textEn, String textUz, String audioHint) {
        this.storyId = storyId;
        this.pageNumber = pageNumber;
        this.textEn = textEn;
        this.textUz = textUz;
        this.audioHint = audioHint;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getStoryId() { return storyId; }
    public void setStoryId(Long storyId) { this.storyId = storyId; }

    public int getPageNumber() { return pageNumber; }
    public void setPageNumber(int pageNumber) { this.pageNumber = pageNumber; }

    public String getTextEn() { return textEn; }
    public void setTextEn(String textEn) { this.textEn = textEn; }

    public String getTextUz() { return textUz; }
    public void setTextUz(String textUz) { this.textUz = textUz; }

    public String getAudioHint() { return audioHint; }
    public void setAudioHint(String audioHint) { this.audioHint = audioHint; }
}
