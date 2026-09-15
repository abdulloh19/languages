package com.antigravity.languagebot.controller;

import com.antigravity.languagebot.entity.NotificationLog;
import com.antigravity.languagebot.entity.User;
import com.antigravity.languagebot.repository.UserRepository;
import com.antigravity.languagebot.service.DashboardService;
import com.antigravity.languagebot.service.PsychologicalNudgeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;
    private final PsychologicalNudgeService psychologicalNudgeService;
    private final UserRepository userRepository;

    public DashboardController(DashboardService dashboardService,
                               PsychologicalNudgeService psychologicalNudgeService,
                               UserRepository userRepository) {
        this.dashboardService = dashboardService;
        this.psychologicalNudgeService = psychologicalNudgeService;
        this.userRepository = userRepository;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardService.DashboardSummaryDto> getSummary() {
        return ResponseEntity.ok(dashboardService.getSummary());
    }

    @GetMapping("/users")
    public ResponseEntity<List<DashboardService.UserListItemDto>> getUsers(
            @RequestParam(required = false, defaultValue = "ALL") String status,
            @RequestParam(required = false, defaultValue = "") String search) {
        return ResponseEntity.ok(dashboardService.getUsers(status, search));
    }

    @PostMapping("/nudge/{userId}")
    public ResponseEntity<NotificationLog> triggerNudge(@PathVariable Long userId) {
        return ResponseEntity.ok(dashboardService.triggerManualNudge(userId));
    }

    @GetMapping("/nudge-preview/{userId}")
    public ResponseEntity<PsychologicalNudgeService.NudgePayload> previewNudge(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return ResponseEntity.ok(psychologicalNudgeService.buildNudge(user));
    }

    @PostMapping("/reset/{userId}")
    public ResponseEntity<Map<String, Object>> resetUser(@PathVariable Long userId) {
        dashboardService.resetUserProgress(userId);
        return ResponseEntity.ok(Map.of("success", true, "userId", userId, "message", "User progress reset to word #1"));
    }
}
