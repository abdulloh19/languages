package com.antigravity.languagebot.config;

import com.antigravity.languagebot.service.TelegramBotService;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

@Configuration
public class TelegramBotConfig {

    private static final Logger log = LoggerFactory.getLogger(TelegramBotConfig.class);

    private final TelegramBotService telegramBotService;

    @Value("${telegram.bot.token:none}")
    private String botToken;

    @Value("${telegram.bot.webapp-url:https://olive-women-itch.loca.lt}")
    private String webAppUrl;

    public TelegramBotConfig(TelegramBotService telegramBotService) {
        this.telegramBotService = telegramBotService;
    }

    @PostConstruct
    public void init() {
        if (botToken == null || botToken.isBlank() || "none".equalsIgnoreCase(botToken)) {
            log.warn("Telegram bot token is not configured. Running in simulator/web mode only.");
            return;
        }

        try {
            log.info("Connecting Telegram Bot [@{}] via TelegramBotsApi...", telegramBotService.getBotUsername());
            TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
            botsApi.registerBot(telegramBotService);
            log.info("✅ Telegram Bot [@{}] is LIVE and actively polling for messages!", telegramBotService.getBotUsername());

            if (webAppUrl != null && !webAppUrl.isBlank()) {
                telegramBotService.configureSuperIlovaMenuButton(webAppUrl);
                log.info("🚀 Telegram Menu Button configured for Web App: {}", webAppUrl);
            }
        } catch (TelegramApiException e) {
            log.error("❌ Failed to register Telegram bot: {}", e.getMessage(), e);
        }
    }
}
