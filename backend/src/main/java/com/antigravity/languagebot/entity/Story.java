package com.antigravity.languagebot.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "stories")
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "level")
    private String level; // Starter, Beginner, Elementary, Pre-Intermediate

    @Column(name = "title")
    private String title;

    @Column(name = "title_uz")
    private String titleUz;

    @Column(name = "cover_image")
    private String coverImage;

    @Column(name = "summary", length = 1000)
    private String summary;

    @Column(name = "read_time_minutes")
    private int readTimeMinutes = 3;

    @Column(name = "total_pages")
    private int totalPages = 1;

    public Story() {}

    public Story(String level, String title, String titleUz, String coverImage, String summary, int readTimeMinutes, int totalPages) {
        this.level = level;
        this.title = title;
        this.titleUz = titleUz;
        this.coverImage = coverImage;
        this.summary = summary;
        this.readTimeMinutes = readTimeMinutes;
        this.totalPages = totalPages;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getTitleUz() { return titleUz; }
    public void setTitleUz(String titleUz) { this.titleUz = titleUz; }

    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public int getReadTimeMinutes() { return readTimeMinutes; }
    public void setReadTimeMinutes(int readTimeMinutes) { this.readTimeMinutes = readTimeMinutes; }

    public int getTotalPages() { return totalPages; }
    public void setTotalPages(int totalPages) { this.totalPages = totalPages; }
}
