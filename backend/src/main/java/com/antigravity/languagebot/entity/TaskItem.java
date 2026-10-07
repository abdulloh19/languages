package com.antigravity.languagebot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "task_items")
public class TaskItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "level")
    private String level; // Starter, Beginner, Elementary, Pre-Intermediate

    @Column(name = "task_type")
    private String taskType; // GAP_FILL, AUDIO, SPEAKING, QUIZ

    @Column(name = "title")
    private String title;

    @Column(name = "instruction_uz")
    private String instructionUz;

    @Column(name = "question_text", length = 1000)
    private String questionText;

    @Column(name = "correct_answer", length = 500)
    private String correctAnswer;

    @Column(name = "options_csv", length = 1000)
    private String optionsCsv; // comma-separated options for choices

    @Column(name = "audio_prompt")
    private String audioPrompt;

    @Column(name = "xp_reward")
    private int xpReward = 15;

    public TaskItem() {}

    public TaskItem(String level, String taskType, String title, String instructionUz,
                    String questionText, String correctAnswer, String optionsCsv, String audioPrompt, int xpReward) {
        this.level = level;
        this.taskType = taskType;
        this.title = title;
        this.instructionUz = instructionUz;
        this.questionText = questionText;
        this.correctAnswer = correctAnswer;
        this.optionsCsv = optionsCsv;
        this.audioPrompt = audioPrompt;
        this.xpReward = xpReward;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getTaskType() { return taskType; }
    public void setTaskType(String taskType) { this.taskType = taskType; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getInstructionUz() { return instructionUz; }
    public void setInstructionUz(String instructionUz) { this.instructionUz = instructionUz; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }

    public String getOptionsCsv() { return optionsCsv; }
    public void setOptionsCsv(String optionsCsv) { this.optionsCsv = optionsCsv; }

    public String getAudioPrompt() { return audioPrompt; }
    public void setAudioPrompt(String audioPrompt) { this.audioPrompt = audioPrompt; }

    public int getXpReward() { return xpReward; }
    public void setXpReward(int xpReward) { this.xpReward = xpReward; }
}
