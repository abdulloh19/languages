package com.antigravity.languagebot.controller;

import com.antigravity.languagebot.entity.*;
import com.antigravity.languagebot.service.GameService;
import com.antigravity.languagebot.service.LearningFlowService;
import com.antigravity.languagebot.service.TelegramBotService;
import com.antigravity.languagebot.service.TilsevarContentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LearningApiController {

    private final LearningFlowService learningFlowService;
    private final GameService gameService;
    private final TelegramBotService telegramBotService;
    private final TilsevarContentService tilsevarContentService;

    public LearningApiController(LearningFlowService learningFlowService,
                                 GameService gameService,
                                 TelegramBotService telegramBotService,
                                 TilsevarContentService tilsevarContentService) {
        this.learningFlowService = learningFlowService;
        this.gameService = gameService;
        this.telegramBotService = telegramBotService;
        this.tilsevarContentService = tilsevarContentService;
    }

    // ==========================================
    // TILSEVAR MINI APP CORE API
    // ==========================================

    @GetMapping("/lessons")
    public ResponseEntity<List<Lesson>> getLessons(@RequestParam(required = false, defaultValue = "ALL") String level) {
        return ResponseEntity.ok(tilsevarContentService.getLessons(level));
    }

    @GetMapping("/lessons/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable Long id) {
        return tilsevarContentService.getLessonById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/lessons/{id}/vocab")
    public ResponseEntity<List<Word>> getLessonVocab(@PathVariable Long id) {
        return ResponseEntity.ok(tilsevarContentService.getWordsForLesson(id));
    }

    @GetMapping("/stories")
    public ResponseEntity<List<Story>> getStories(@RequestParam(required = false, defaultValue = "ALL") String level) {
        return ResponseEntity.ok(tilsevarContentService.getStories(level));
    }

    @GetMapping("/stories/{id}")
    public ResponseEntity<Story> getStoryById(@PathVariable Long id) {
        return tilsevarContentService.getStoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stories/{id}/pages")
    public ResponseEntity<List<StoryPage>> getStoryPages(@PathVariable Long id) {
        return ResponseEntity.ok(tilsevarContentService.getStoryPages(id));
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<TaskItem>> getTasks(
            @RequestParam(required = false, defaultValue = "ALL") String level,
            @RequestParam(required = false) String type) {
        return ResponseEntity.ok(tilsevarContentService.getTasks(level, type));
    }

    public record SpeakingEvaluationRequest(Long userId, Long taskId, String spokenText) {}

    @PostMapping("/tasks/speaking/evaluate")
    public ResponseEntity<TilsevarContentService.SpeakingEvaluationResult> evaluateSpeaking(
            @RequestBody SpeakingEvaluationRequest request) {
        return ResponseEntity.ok(tilsevarContentService.evaluateSpeaking(
                request.userId() != null ? request.userId() : 1L,
                request.taskId() != null ? request.taskId() : 1L,
                request.spokenText()
        ));
    }

    @GetMapping("/checklist/me")
    public ResponseEntity<DailyChecklist> getMyChecklist(@RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(tilsevarContentService.getOrCreateTodayChecklist(userId));
    }

    @PostMapping("/checklist/toggle")
    public ResponseEntity<DailyChecklist> toggleChecklist(
            @RequestParam(defaultValue = "1") Long userId,
            @RequestParam String itemKey) {
        return ResponseEntity.ok(tilsevarContentService.toggleChecklist(userId, itemKey));
    }

    @PostMapping("/checklist/claim-streak")
    public ResponseEntity<Map<String, Object>> claimStreak(@RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(tilsevarContentService.claimStreak(userId));
    }

    @GetMapping("/partner/me")
    public ResponseEntity<TilsevarContentService.StudyPartnerDto> getMyPartner(
            @RequestParam(defaultValue = "1") Long userId) {
        TilsevarContentService.StudyPartnerDto dto = tilsevarContentService.getStudyPartner(userId);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
    }

    @PostMapping("/partner/match")
    public ResponseEntity<TilsevarContentService.StudyPartnerDto> matchPartner(
            @RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(tilsevarContentService.matchPartner(userId));
    }

    @PostMapping("/partner/nudge")
    public ResponseEntity<Map<String, Object>> nudgePartner(
            @RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(tilsevarContentService.sendPartnerNudge(userId));
    }

    @PostMapping("/tunnel/update")
    public ResponseEntity<Map<String, Object>> updateTunnelUrl(@RequestParam String url) {
        telegramBotService.setWebAppUrl(url);
        telegramBotService.configureSuperIlovaMenuButton(url);
        return ResponseEntity.ok(Map.of("success", true, "url", url));
    }

    // ==========================================
    // LEGACY & SIMULATION APIS
    // ==========================================

    @GetMapping("/session/state")
    public ResponseEntity<LearningFlowService.SessionStateDto> getState(@RequestParam Long userId) {
        return ResponseEntity.ok(learningFlowService.getSessionState(userId));
    }

    @PostMapping("/session/resume")
    public ResponseEntity<LearningFlowService.WordCardDto> resume(@RequestParam Long userId) {
        return ResponseEntity.ok(learningFlowService.resume(userId));
    }

    @PostMapping("/word/next")
    public ResponseEntity<LearningFlowService.WordCardDto> nextWord(@RequestParam Long userId) {
        return ResponseEntity.ok(learningFlowService.nextWord(userId));
    }

    @GetMapping("/dialogue/next")
    public ResponseEntity<LearningFlowService.DialogueDto> getDialogue(
            @RequestParam Long userId,
            @RequestParam(defaultValue = "1") int dialogueOrder) {
        return ResponseEntity.ok(learningFlowService.getDialogue(userId, dialogueOrder));
    }

    @GetMapping("/game/start")
    public ResponseEntity<GameService.GameQuestionDto> startGame(
            @RequestParam(defaultValue = "1") Long topicId,
            @RequestParam(defaultValue = "FLASHCARD") String gameType,
            @RequestParam(defaultValue = "EN") String targetLang) {
        return ResponseEntity.ok(gameService.generateGameQuestion(topicId, gameType, targetLang));
    }

    @PostMapping("/session/switch-language")
    public ResponseEntity<Map<String, Object>> switchLanguage(
            @RequestParam Long userId,
            @RequestParam String targetLang) {
        learningFlowService.switchLanguage(userId, targetLang);
        return ResponseEntity.ok(Map.of("success", true, "newLanguage", targetLang));
    }

    @PostMapping("/bot/simulate")
    public ResponseEntity<TelegramBotService.SimulationResponse> simulateBot(
            @RequestParam Long telegramId,
            @RequestParam(defaultValue = "/menu") String action,
            @RequestParam(required = false) String data) {
        return ResponseEntity.ok(telegramBotService.handleSimulatedAction(telegramId, action, data));
    }
}
