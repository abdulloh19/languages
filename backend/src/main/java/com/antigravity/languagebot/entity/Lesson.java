package com.antigravity.languagebot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "level")
    private String level; // Starter, Beginner, Elementary, Pre-Intermediate

    @Column(name = "unit_number")
    private int unitNumber = 1;

    @Column(name = "lesson_order")
    private int lessonOrder = 1;

    @Column(name = "title")
    private String title;

    @Column(name = "title_uz")
    private String titleUz;

    @Column(name = "description_uz", length = 1000)
    private String descriptionUz;

    @Column(name = "grammar_rule", length = 2000)
    private String grammarRule;

    @Column(name = "grammar_example", length = 1000)
    private String grammarExample;

    @Column(name = "icon")
    private String icon = "BookOpen";

    public Lesson() {}

    public Lesson(String level, int unitNumber, int lessonOrder, String title, String titleUz,
                  String descriptionUz, String grammarRule, String grammarExample, String icon) {
        this.level = level;
        this.unitNumber = unitNumber;
        this.lessonOrder = lessonOrder;
        this.title = title;
        this.titleUz = titleUz;
        this.descriptionUz = descriptionUz;
        this.grammarRule = grammarRule;
        this.grammarExample = grammarExample;
        this.icon = icon;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public int getUnitNumber() { return unitNumber; }
    public void setUnitNumber(int unitNumber) { this.unitNumber = unitNumber; }

    public int getLessonOrder() { return lessonOrder; }
    public void setLessonOrder(int lessonOrder) { this.lessonOrder = lessonOrder; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getTitleUz() { return titleUz; }
    public void setTitleUz(String titleUz) { this.titleUz = titleUz; }

    public String getDescriptionUz() { return descriptionUz; }
    public void setDescriptionUz(String descriptionUz) { this.descriptionUz = descriptionUz; }

    public String getGrammarRule() { return grammarRule; }
    public void setGrammarRule(String grammarRule) { this.grammarRule = grammarRule; }

    public String getGrammarExample() { return grammarExample; }
    public void setGrammarExample(String grammarExample) { this.grammarExample = grammarExample; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}
