package com.antigravity.languagebot.controller;

import com.antigravity.languagebot.service.GameService;
import com.antigravity.languagebot.service.LearningFlowService;
import com.antigravity.languagebot.service.TelegramBotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class LearningApiController {

    private final LearningFlowService learningFlowService;
    private final GameService gameService;
    private final TelegramBotService telegramBotService;

    public LearningApiController(LearningFlowService learningFlowService,
                                 GameService gameService,
                                 TelegramBotService telegramBotService) {
        this.learningFlowService = learningFlowService;
        this.gameService = gameService;
        this.telegramBotService = telegramBotService;
    }

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
