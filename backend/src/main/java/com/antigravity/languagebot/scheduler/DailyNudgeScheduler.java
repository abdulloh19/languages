package com.antigravity.languagebot.scheduler;

import com.antigravity.languagebot.entity.User;
import com.antigravity.languagebot.repository.UserRepository;
import com.antigravity.languagebot.service.PsychologicalNudgeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class DailyNudgeScheduler {

    private static final Logger log = LoggerFactory.getLogger(DailyNudgeScheduler.class);

    private final UserRepository userRepository;
    private final PsychologicalNudgeService psychologicalNudgeService;

    public DailyNudgeScheduler(UserRepository userRepository,
                               PsychologicalNudgeService psychologicalNudgeService) {
        this.userRepository = userRepository;
        this.psychologicalNudgeService = psychologicalNudgeService;
    }

    /**
     * Daily 09:00 cron job for inactive users.
     * Identifies all users inactive > 24 hours and dispatches psychologically-tailored nudges.
     */
    @Scheduled(cron = "${app.nudge.cron:0 0 9 * * *}")
    public void executeDailyNudgeJob() {
        log.info("Starting Daily 09:00 Psychological Re-engagement Cron Job...");
        LocalDateTime cutoff = LocalDateTime.now().minusHours(24);
        List<User> inactiveUsers = userRepository.findInactiveUsersForNudge(cutoff);

        int sent = 0;
        for (User user : inactiveUsers) {
            try {
                psychologicalNudgeService.dispatchNudge(user);
                sent++;
            } catch (Exception e) {
                log.error("Failed to send psychological nudge to user {}: {}", user.getId(), e.getMessage());
            }
        }
        log.info("Daily nudge job completed. Sent {} psychological re-engagement pushes.", sent);
    }
}
