package com.antigravity.languagebot.service;

import com.antigravity.languagebot.entity.Topic;
import com.antigravity.languagebot.entity.User;
import com.antigravity.languagebot.repository.TopicRepository;
import com.antigravity.languagebot.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendAudio;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.InputFile;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.api.objects.webapp.WebAppInfo;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@Service
public class TelegramBotService extends TelegramLongPollingBot {

    private static final Logger log = LoggerFactory.getLogger(TelegramBotService.class);

    @Value("${telegram.bot.username:languageForZubayr_bot}")
    private String botUsername;

    @Value("${telegram.bot.token:none}")
    private String botToken;

    @Value("${telegram.bot.webapp-url:}")
    private String webAppUrl;

    private final UserRepository userRepository;
    private final TopicRepository topicRepository;
    private final LearningFlowService learningFlowService;
    private final SuperMenuService superMenuService;
    private final GameService gameService;
    private final PsychologicalNudgeService psychologicalNudgeService;
    private final TtsAudioService ttsAudioService;

    public TelegramBotService(UserRepository userRepository,
                              TopicRepository topicRepository,
                              LearningFlowService learningFlowService,
                              SuperMenuService superMenuService,
                              GameService gameService,
                              PsychologicalNudgeService psychologicalNudgeService,
                              TtsAudioService ttsAudioService) {
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
        this.learningFlowService = learningFlowService;
        this.superMenuService = superMenuService;
        this.gameService = gameService;
        this.psychologicalNudgeService = psychologicalNudgeService;
        this.ttsAudioService = ttsAudioService;
    }

    @Override
    public String getBotUsername() {
        return botUsername;
    }

    @Override
    public String getBotToken() {
        return botToken;
    }

    public void setWebAppUrl(String url) {
        this.webAppUrl = url;
    }

    public String getWebAppUrl() {
        return webAppUrl;
    }

    /**
     * Sets Telegram Chat Menu Button to a Web App button named «Super ilova»
     * exactly matching the Telegram UI screenshot.
     */
    public boolean configureSuperIlovaMenuButton(String appUrl) {
        if (botToken == null || "none".equalsIgnoreCase(botToken) || appUrl == null || appUrl.isBlank()) {
            return false;
        }
        this.webAppUrl = appUrl;
        try {
            String endpoint = "https://api.telegram.org/bot" + botToken + "/setChatMenuButton";
            String jsonPayload = String.format("""
                {
                  "menu_button": {
                    "type": "web_app",
                    "text": "Super ilova",
                    "web_app": {
                      "url": "%s"
                    }
                  }
                }
                """, appUrl);

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(endpoint))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            log.info("Telegram setChatMenuButton response: {}", response.body());
            return response.statusCode() == 200 && response.body().contains("\"ok\":true");
        } catch (Exception e) {
            log.error("Failed to set Telegram ChatMenuButton: {}", e.getMessage());
            return false;
        }
    }

    public boolean configureSuperIlovaMenuButtonForChat(Long chatId, String appUrl) {
        if (botToken == null || "none".equalsIgnoreCase(botToken) || appUrl == null || appUrl.isBlank() || chatId == null) {
            return false;
        }
        try {
            String endpoint = "https://api.telegram.org/bot" + botToken + "/setChatMenuButton";
            String jsonPayload = String.format("""
                {
                  "chat_id": %d,
                  "menu_button": {
                    "type": "web_app",
                    "text": "Super ilova",
                    "web_app": {
                      "url": "%s"
                    }
                  }
                }
                """, chatId, appUrl);

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(endpoint))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            log.info("Telegram setChatMenuButton for chat {} response: {}", chatId, response.body());
            return response.statusCode() == 200 && response.body().contains("\"ok\":true");
        } catch (Exception e) {
            log.error("Failed to set Telegram ChatMenuButton for chat {}: {}", chatId, e.getMessage());
            return false;
        }
    }

    public record SimulationResponse(
            String replyText,
            List<List<String>> inlineButtons,
            String audioUrl,
            String currentStage
    ) {}

    @Override
    public void onUpdateReceived(Update update) {
        if ("none".equalsIgnoreCase(botToken) || botToken.isBlank()) {
            return;
        }

        try {
            if (update.hasMessage() && update.getMessage().hasText()) {
                String text = update.getMessage().getText();
                Long chatId = update.getMessage().getChatId();
                String username = update.getMessage().getFrom().getUserName();
                String firstName = update.getMessage().getFrom().getFirstName();

                User user = learningFlowService.getOrCreateUser(chatId, username, firstName);
                handleIncomingMessage(chatId, text, user);
            } else if (update.hasCallbackQuery()) {
                String callbackData = update.getCallbackQuery().getData();
                Long chatId = update.getCallbackQuery().getMessage().getChatId();
                String username = update.getCallbackQuery().getFrom().getUserName();
                String firstName = update.getCallbackQuery().getFrom().getFirstName();

                User user = learningFlowService.getOrCreateUser(chatId, username, firstName);
                handleCallbackQuery(chatId, callbackData, user);
            }
        } catch (Exception e) {
            log.error("Error processing update: {}", e.getMessage(), e);
        }
    }

    /**
     * Simulator method for React Dashboard testing
     */
    public SimulationResponse handleSimulatedAction(Long telegramId, String action, String data) {
        User user = learningFlowService.getOrCreateUser(telegramId, "test_user", "Tester");
        return processAction(user, action, data);
    }

    private void handleIncomingMessage(Long chatId, String text, User user) {
        if (text != null && (text.equalsIgnoreCase("/start") || text.equalsIgnoreCase("/menu"))) {
            if (webAppUrl != null && !webAppUrl.isBlank()) {
                configureSuperIlovaMenuButtonForChat(chatId, webAppUrl);
            }
            sendReplyKeyboard(chatId);
        }
        SimulationResponse resp = processAction(user, text, null);
        sendTextMessage(chatId, resp.replyText(), resp.inlineButtons());
    }

    private void handleCallbackQuery(Long chatId, String callbackData, User user) {
        if (callbackData != null && (callbackData.contains("Audio") || callbackData.contains("Tinglash") || callbackData.equalsIgnoreCase("AUDIO_LIB"))) {
            sendWordAudio(chatId, user);
        }
        SimulationResponse resp = processAction(user, callbackData, null);
        sendTextMessage(chatId, resp.replyText(), resp.inlineButtons());
    }

    private void sendReplyKeyboard(Long chatId) {
        SendMessage sm = new SendMessage();
        sm.setChatId(chatId.toString());
        sm.setText("🇺🇿 <b>Assalomu alaykum!</b>\n\nPastdagi ko'k <b>«Super ilova»</b> tugmasini bosib, barcha animatsion imkoniyatlarni ochishingiz mumkin!");
        sm.setParseMode("HTML");

        ReplyKeyboardMarkup rk = new ReplyKeyboardMarkup();
        rk.setResizeKeyboard(true);
        rk.setSelective(false);

        List<KeyboardRow> rows = new ArrayList<>();

        // Row 1: Super Ilova WebApp Button
        KeyboardRow row1 = new KeyboardRow();
        if (webAppUrl != null && !webAppUrl.isBlank()) {
            KeyboardButton webBtn = new KeyboardButton("🚀 Super ilova");
            webBtn.setWebApp(new WebAppInfo(webAppUrl));
            row1.add(webBtn);
        } else {
            row1.add("🚀 Super ilova");
        }
        rows.add(row1);

        // Row 2: Direction Switchers (UZB -> RU & UZB -> EN)
        KeyboardRow row2 = new KeyboardRow();
        row2.add("🇺🇿 ➔ 🇷🇺 Ruscha");
        row2.add("🇺🇿 ➔ 🇬🇧 Inglizcha");
        rows.add(row2);

        // Row 3: Daily Learning Flow
        KeyboardRow row3 = new KeyboardRow();
        row3.add("📚 Bugungi dars");
        row3.add("🎯 Davom etish");
        rows.add(row3);

        // Row 4: Topics, Games, Menu
        KeyboardRow row4 = new KeyboardRow();
        row4.add("🗂️ Mavzular");
        row4.add("🎮 O'yinlar");
        row4.add("☰ Menyu");
        rows.add(row4);

        rk.setKeyboard(rows);
        sm.setReplyMarkup(rk);

        try {
            execute(sm);
        } catch (Exception ignored) {}
    }

    private void sendWordAudio(Long chatId, User user) {
        try {
            LearningFlowService.WordCardDto card = learningFlowService.resume(user.getId());
            byte[] mp3Bytes = ttsAudioService.synthesizeAudio(card.wordTarget(), user.getTargetLanguage());
            if (mp3Bytes != null && mp3Bytes.length > 500) {
                SendAudio sendAudio = new SendAudio();
                sendAudio.setChatId(chatId.toString());
                sendAudio.setAudio(new InputFile(new ByteArrayInputStream(mp3Bytes), card.wordTarget() + ".mp3"));
                String langLabel = "RU".equalsIgnoreCase(user.getTargetLanguage()) ? "Ruscha (Google HD Voice)" : "English (Google HD Voice)";
                sendAudio.setTitle(card.wordTarget() + " — " + card.wordUz());
                sendAudio.setPerformer(langLabel);
                execute(sendAudio);
            }
        } catch (Exception e) {
            log.warn("Could not send audio note to Telegram: {}", e.getMessage());
        }
    }

    public SimulationResponse processAction(User user, String text, String extra) {
        String clean = text != null ? text.trim() : "";

        // 1. Navigation to Super Menu
        if (clean.equalsIgnoreCase("/start") || clean.equalsIgnoreCase("/menu")
                || clean.equalsIgnoreCase("☰ Menyu") || clean.equalsIgnoreCase("☰ Menu")
                || clean.equalsIgnoreCase("⬅️ Asosiy menyu") || clean.equalsIgnoreCase("MENU")) {
            return renderSuperMenu(user);
        }

        // 2. Direct Language Switch: UZB -> RU or UZB -> EN
        if (clean.equalsIgnoreCase("SET_LANG_RU") || clean.contains("Ruscha") || clean.equalsIgnoreCase("UZB_RU")) {
            learningFlowService.switchLanguage(user.getId(), "RU");
            return new SimulationResponse(
                    "✅ <b>O'rganish yo'nalishi o'zgartirildi:</b>\n\n🇺🇿 ➔ 🇷🇺 <b>O'zbekcha ➔ Ruscha (UZB ➔ RU)</b>\n\nBarcha so'zlar, darslar va xotira o'yinlari endi Rus tilini o'rganishga moslashtirildi.",
                    List.of(
                            List.of("📚 Bugungi dars", "🎯 Davom etish"),
                            List.of("☰ Asosiy menyu")
                    ),
                    null,
                    "LANG_SWITCHED"
            );
        }

        if (clean.equalsIgnoreCase("SET_LANG_EN") || clean.contains("Inglizcha") || clean.equalsIgnoreCase("UZB_EN")) {
            learningFlowService.switchLanguage(user.getId(), "EN");
            return new SimulationResponse(
                    "✅ <b>O'rganish yo'nalishi o'zgartirildi:</b>\n\n🇺🇿 ➔ 🇬🇧 <b>O'zbekcha ➔ Inglizcha (UZB ➔ EN)</b>\n\nBarcha so'zlar, darslar va xotira o'yinlari endi Ingliz tilini o'rganishga moslashtirildi.",
                    List.of(
                            List.of("📚 Bugungi dars", "🎯 Davom etish"),
                            List.of("☰ Asosiy menyu")
                    ),
                    null,
                    "LANG_SWITCHED"
            );
        }

        // 3. Resume / Come Back (Smart Resume from exact pause point)
        if (clean.equalsIgnoreCase("CONTINUE") || clean.equalsIgnoreCase("🎯 Davom etish")
                || clean.equalsIgnoreCase("🎯 Continue") || clean.equalsIgnoreCase("🌅 Qaytish")
                || clean.equalsIgnoreCase("/resume") || clean.equalsIgnoreCase("YES_RESUME")) {
            var card = learningFlowService.resume(user.getId());
            return renderWordCard(user, card, true);
        }

        // 4. Learn Today (20 words/day flow)
        if (clean.equalsIgnoreCase("LEARN_TODAY") || clean.equalsIgnoreCase("📚 Bugungi dars")
                || clean.equalsIgnoreCase("📚 Learn Today") || clean.equalsIgnoreCase("/learn")) {
            var card = learningFlowService.resume(user.getId());
            return renderWordCard(user, card, false);
        }

        // 5. Next Word
        if (clean.equalsIgnoreCase("NEXT_WORD") || clean.contains("Keyingi so'z")) {
            var card = learningFlowService.nextWord(user.getId());
            if (card.wordOrder() == 11) {
                return renderDialogueScreen(user, 1);
            } else if (card.wordOrder() == 1 && user.getCurrentWordIndex() == 1) {
                return renderDialogueScreen(user, 2);
            }
            return renderWordCard(user, card, false);
        }

        // 6. Dialogue Continuation
        if (clean.startsWith("DIALOGUE_")) {
            int diagOrder = Integer.parseInt(clean.replace("DIALOGUE_", ""));
            return renderDialogueScreen(user, diagOrder);
        }

        // 7. Dialogue Continue? (Confirm before next)
        if (clean.startsWith("CONFIRM_DIALOGUE_")) {
            int nextDiag = Integer.parseInt(clean.replace("CONFIRM_DIALOGUE_", ""));
            if (nextDiag > 5) {
                return renderReinforcementPrompt(user);
            }
            return renderDialogueScreen(user, nextDiag);
        }

        // 8. Reinforcement prompt (YES / NO)
        if (clean.equalsIgnoreCase("REINFORCE_YES") || clean.contains("Mustahkamlash")) {
            return renderGameScreen(user, "FLASHCARD");
        }
        if (clean.equalsIgnoreCase("REINFORCE_NO")) {
            return new SimulationResponse(
                    "✅ <b>Bugun ajoyib natija ko'rsatdingiz!</b>\n\nSizning natijalaringiz xavfsiz saqlandi. Ertaga soat 09:00 da yangi darsda kutamiz!",
                    List.of(List.of("☰ Menyu")),
                    null,
                    "SESSION_SAVED"
            );
        }

        // 9. Memory Games
        if (clean.equalsIgnoreCase("GAMES") || clean.contains("O'yinlar") || clean.contains("Games")) {
            return renderGamesMenu(user);
        }
        if (clean.startsWith("GAME_")) {
            String gType = clean.replace("GAME_", "");
            return renderGameScreen(user, gType);
        }

        // 10. Topics List
        if (clean.equalsIgnoreCase("TOPICS") || clean.contains("Mavzular") || clean.contains("Topics")) {
            return renderTopicsMenu(user);
        }
        if (clean.startsWith("SELECT_TOPIC_")) {
            Long tid = Long.parseLong(clean.replace("SELECT_TOPIC_", ""));
            user.setCurrentTopicId(tid);
            user.setCurrentWordIndex(1);
            userRepository.save(user);
            var card = learningFlowService.resume(user.getId());
            return renderWordCard(user, card, false);
        }

        // 11. Language Switch Tracker
        if (clean.equalsIgnoreCase("CHANGE_LANG") || clean.contains("Yo'nalish") || clean.contains("Change Language")) {
            return renderLanguageSwitchMenu(user);
        }

        // 12. My Streak & Stats
        if (clean.equalsIgnoreCase("MY_STREAK") || clean.contains("Seriya") || clean.contains("Streak")) {
            return new SimulationResponse(
                    String.format("""
                            🔥 <b>KUNLIK SERIYA (STREAK)</b>
                            
                            Hozirgi seriya: <b>%d kun ketma-ket</b>
                            Eng yaxshi natija: <b>%d kun</b>
                            
                            🎯 Kunlik maqsad: 20 ta so'z!
                            Har kuni shug'ullanish orqali seriyangizni saqlab qoling.
                            """, user.getStreakDays(), user.getLongestStreak()),
                    List.of(List.of("🎯 Davom etish", "☰ Asosiy menyu")),
                    null,
                    "MY_STREAK"
            );
        }

        // 13. Leaderboard
        if (clean.equalsIgnoreCase("LEADERBOARD") || clean.contains("Peshqadamlar") || clean.contains("Leaderboard")) {
            return new SimulationResponse(
                    superMenuService.renderLeaderboardText(),
                    List.of(List.of("☰ Asosiy menyu")),
                    null,
                    "LEADERBOARD"
            );
        }

        // 14. Daily Bonus
        if (clean.equalsIgnoreCase("DAILY_BONUS") || clean.contains("Bonus")) {
            user.setTokenBalance(user.getTokenBalance() + 5);
            userRepository.save(user);
            return new SimulationResponse(
                    "🎁 <b>Kunlik bonus muvaffaqiyatli olindi!</b>\n\nSizga +5 ta token 💎 berildi.\nJoriy hisobingiz: <b>" + user.getTokenBalance() + "</b> token.",
                    List.of(List.of("📚 Bugungi dars", "☰ Asosiy menyu")),
                    null,
                    "DAILY_BONUS"
            );
        }

        // 15. Audio Library
        if (clean.equalsIgnoreCase("AUDIO_LIB") || clean.contains("Lug'at") || clean.contains("Audio")) {
            return new SimulationResponse(
                    """
                    🔊 <b>AUDIO LUG'AT & TALAFFUZ</b>
                    
                    Barcha so'z va dialoglar sof inson ovozida (Google HD Voice):
                    • 🇷🇺 Ruscha talaffuz
                    • 🇬🇧 Inglizcha talaffuz
                    • 🇺🇿 O'zbekcha tarjimasi
                    
                    Har bir so'z kartochkasidagi «🔊 Tinglash» tugmasini bosing!
                    """,
                    List.of(List.of("📚 Bugungi dars", "☰ Asosiy menyu")),
                    null,
                    "AUDIO_LIB"
            );
        }

        // 16. Settings & Help
        if (clean.equalsIgnoreCase("SETTINGS") || clean.contains("Sozlamalar")) {
            String dir = "RU".equalsIgnoreCase(user.getTargetLanguage()) ? "🇺🇿 ➔ 🇷🇺 Ruscha" : "🇺🇿 ➔ 🇬🇧 Inglizcha";
            return new SimulationResponse(
                    "⚙️ <b>SOZLAMALAR</b>\n\n• Eslatmalar: <b>09:00 Faol</b>\n• Kunlik me'yor: <b>20 ta so'z</b>\n• O'rganish yo'nalishi: <b>" + dir + "</b>",
                    List.of(List.of("🌐 Yo'nalishni almashtirish", "☰ Asosiy menyu")),
                    null,
                    "SETTINGS"
            );
        }

        if (clean.equalsIgnoreCase("HELP") || clean.contains("Yordam")) {
            return new SimulationResponse(
                    """
                    ❓ <b>QO'LLANMA VA YORDAM</b>
                    
                    Xush kelibsiz! Platforma imkoniyatlari:
                    • <b>20 so'z/kun:</b> 10 so'z ➔ Dialog ➔ 10 so'z ➔ Mustahkamlash.
                    • <b>Aqlli davom etish:</b> Darslar hech qachon noldan boshlanmaydi.
                    • <b>Haqiqiy audio:</b> Har bir so'zning sof insoniy talaffuzi.
                    • <b>Super ilova:</b> Pastdagi ko'k tugma orqali to'liq animatsion Mini App!
                    """,
                    List.of(List.of("☰ Menyu")),
                    null,
                    "HELP"
            );
        }

        // Default: return menu
        return renderSuperMenu(user);
    }

    private SimulationResponse renderSuperMenu(User user) {
        String text = superMenuService.renderMenuText(user);
        List<List<String>> buttons = new ArrayList<>();

        buttons.add(List.of("🇺🇿 ➔ 🇷🇺 Ruscha", "🇺🇿 ➔ 🇬🇧 Inglizcha"));
        buttons.add(List.of("📚 Bugungi dars", "🎯 Davom etish"));
        buttons.add(List.of("🗂️ Mavzular", "🎮 O'yinlar"));
        buttons.add(List.of("🔊 Audio Lug'at", "📊 Natijam"));
        buttons.add(List.of("🔥 Seriya", "🏆 Peshqadamlar"));
        buttons.add(List.of("🎁 Bonus", "⚙️ Sozlamalar"));

        return new SimulationResponse(text, buttons, null, "SUPER_MENU");
    }

    private SimulationResponse renderWordCard(User user, LearningFlowService.WordCardDto card, boolean isResume) {
        boolean isRu = "RU".equalsIgnoreCase(user.getTargetLanguage());
        String dirTitle = isRu ? "🇺🇿 ➔ 🇷🇺 O'zbekcha ➔ Ruscha" : "🇺🇿 ➔ 🇬🇧 O'zbekcha ➔ Inglizcha";
        String flag = isRu ? "🇷🇺" : "🇬🇧";
        String langName = isRu ? "Ruscha" : "Inglizcha";

        String header = isResume
                ? "🎯 <b>TO'XTAGAN JOYDAN DAVOM ETISH</b>\n\n"
                : "📚 <b>BUGUNGI DARS</b>\n\n";

        String text = String.format("""
                %sYo'nalish: <b>%s</b>
                Mavzu: <b>%s</b> | So'z: <b>%d / 20</b>
                
                🇺🇿 O'zbekcha: <b>%s</b>
                %s %s: <b>%s</b>
                🗣️ Talaffuz: <code>%s</code>
                
                📝 <i>Misol:</i>
                • %s
                • %s
                """,
                header,
                dirTitle,
                card.topicTitle(),
                card.progressOutOf20(),
                card.wordUz(),
                flag, langName, card.wordTarget(),
                card.phonetic(),
                card.exampleTarget(),
                card.exampleNative()
        );

        List<List<String>> buttons = List.of(
                List.of("🔊 Tinglash / Audio", "➡️ Keyingi so'z"),
                List.of("☰ Asosiy menyu")
        );

        return new SimulationResponse(text, buttons, card.audioUrl(), "WORD_CARD");
    }

    private SimulationResponse renderDialogueScreen(User user, int dialogueOrder) {
        var diag = learningFlowService.getDialogue(user.getId(), dialogueOrder);
        String text = String.format("""
                💬 <b>DIALOG (%d / 5)</b>
                Mavzu: <b>%s</b> — <i>%s</i>
                
                %s
                
                ──────────────────
                <b>Davom ettirasizmi?</b>
                """,
                diag.dialogueNumber(),
                diag.topicTitle(),
                diag.titleTarget(),
                diag.contentTarget()
        );

        List<List<String>> buttons = List.of(
                List.of("➡️ Ha, davom etish", "📚 So'zlarga qaytish"),
                List.of("☰ Asosiy menyu")
        );

        return new SimulationResponse(text, buttons, null, "DIALOGUE");
    }

    private SimulationResponse renderReinforcementPrompt(User user) {
        String text = """
                🎉 <b>20 ta so'z va dialoglar muvaffaqiyatli yakunlandi!</b>
                
                🧠 <b>O'rganilgan so'zlarni interaktiv o'yinda mustahkamlaymizmi?</b>
                
                O'yin orqali takrorlash so'zlarni 85% ko'proq uzoq muddatli xotiraga muhrlaydi!
                """;

        List<List<String>> buttons = List.of(
                List.of("✅ Ha, mustahkamlash!", "❌ Yo'q, yakunlash"),
                List.of("☰ Asosiy menyu")
        );

        return new SimulationResponse(text, buttons, null, "REINFORCE_PROMPT");
    }

    private SimulationResponse renderGamesMenu(User user) {
        String text = """
                🎮 <b>XOTIRA O'YINLARI</b>
                
                So'zlarni yodlash uchun o'yin rejimini tanlang:
                """;

        List<List<String>> buttons = List.of(
                List.of("🎴 Flashcard Match", "🧠 Word Recall (3s)"),
                List.of("🔗 So'z ➔ Tarjima", "🎧 Eshitib top"),
                List.of("✍️ Bo'sh joyni to'ldir"),
                List.of("☰ Asosiy menyu")
        );

        return new SimulationResponse(text, buttons, null, "GAMES_MENU");
    }

    private SimulationResponse renderGameScreen(User user, String gameType) {
        var q = gameService.generateGameQuestion(user.getCurrentTopicId(), gameType, user.getTargetLanguage());
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("🎮 <b>%s</b>\n\n", q.questionTitleRu()));
        sb.append(String.format("So'z: <b>%s</b>\n", q.targetWord()));
        if (q.gapSentence() != null) {
            sb.append(String.format("Jumla: <i>%s</i>\n", q.gapSentence()));
        }
        sb.append(String.format("\n💡 <i>%s</i>\n", q.hint()));

        List<List<String>> buttons = new ArrayList<>();
        List<String> row1 = new ArrayList<>();
        List<String> row2 = new ArrayList<>();
        for (int i = 0; i < q.options().size(); i++) {
            if (i < 2) row1.add(q.options().get(i));
            else row2.add(q.options().get(i));
        }
        buttons.add(row1);
        if (!row2.isEmpty()) buttons.add(row2);
        buttons.add(List.of("🎲 Boshqa o'yin", "☰ Asosiy menyu"));

        return new SimulationResponse(sb.toString(), buttons, q.audioUrl(), "GAME_ACTIVE");
    }

    private SimulationResponse renderTopicsMenu(User user) {
        List<Topic> topics = topicRepository.findAllByOrderByDisplayOrderAsc();
        StringBuilder sb = new StringBuilder("🗂️ <b>5 TA ASOSIY MAVZU</b>\n\n");
        List<List<String>> buttons = new ArrayList<>();

        for (Topic t : topics) {
            sb.append(String.format("%s <b>%s</b> (%s)\n", t.getIcon(), t.getTitleUz(), t.getTitleRu()));
            buttons.add(List.of(t.getIcon() + " " + t.getTitleUz()));
        }
        buttons.add(List.of("☰ Asosiy menyu"));

        return new SimulationResponse(sb.toString(), buttons, null, "TOPICS_MENU");
    }

    private SimulationResponse renderLanguageSwitchMenu(User user) {
        String text = superMenuService.renderLanguageSwitchText(user);
        List<List<String>> buttons = List.of(
                List.of("🇺🇿 ➔ 🇷🇺 Ruscha", "🇺🇿 ➔ 🇬🇧 Inglizcha"),
                List.of("☰ Asosiy menyu")
        );
        return new SimulationResponse(text, buttons, null, "LANGUAGE_SWITCH");
    }

    private void sendTextMessage(Long chatId, String text, List<List<String>> buttonRows) {
        SendMessage sm = new SendMessage();
        sm.setChatId(chatId.toString());
        sm.setText(text);
        sm.setParseMode("HTML");

        if (buttonRows != null && !buttonRows.isEmpty()) {
            InlineKeyboardMarkup markup = new InlineKeyboardMarkup();
            List<List<InlineKeyboardButton>> keyboard = new ArrayList<>();

            // If webAppUrl is set, optionally prepend a Super Ilova button row
            if (webAppUrl != null && !webAppUrl.isBlank() && text.contains("SUPER ILOVA")) {
                List<InlineKeyboardButton> webRow = new ArrayList<>();
                InlineKeyboardButton webBtn = new InlineKeyboardButton();
                webBtn.setText("🚀 Super ilova ochish");
                webBtn.setWebApp(new WebAppInfo(webAppUrl));
                webRow.add(webBtn);
                keyboard.add(webRow);
            }

            for (List<String> row : buttonRows) {
                List<InlineKeyboardButton> btnRow = new ArrayList<>();
                for (String label : row) {
                    InlineKeyboardButton btn = new InlineKeyboardButton();
                    btn.setText(label);
                    btn.setCallbackData(toCallback(label));
                    btnRow.add(btn);
                }
                keyboard.add(btnRow);
            }
            markup.setKeyboard(keyboard);
            sm.setReplyMarkup(markup);
        }

        try {
            execute(sm);
        } catch (TelegramApiException e) {
            log.warn("Could not send Telegram message to chat {}: {}", chatId, e.getMessage());
        }
    }

    private String toCallback(String label) {
        if (label.contains("Ruscha")) return "SET_LANG_RU";
        if (label.contains("Inglizcha")) return "SET_LANG_EN";
        if (label.contains("Bugungi dars") || label.contains("Learn Today")) return "LEARN_TODAY";
        if (label.contains("Davom etish") || label.contains("Continue")) return "CONTINUE";
        if (label.contains("Keyingi so'z") || label.contains("Next")) return "NEXT_WORD";
        if (label.contains("Asosiy menyu") || label.contains("Menyu") || label.contains("Menu")) return "MENU";
        if (label.contains("Mavzular") || label.contains("Topics")) return "TOPICS";
        if (label.contains("O'yinlar") || label.contains("Games")) return "GAMES";
        if (label.contains("Yo'nalish") || label.contains("Change Language")) return "CHANGE_LANG";
        if (label.contains("Seriya") || label.contains("Streak")) return "MY_STREAK";
        if (label.contains("Peshqadamlar") || label.contains("Leaderboard")) return "LEADERBOARD";
        if (label.contains("Bonus")) return "DAILY_BONUS";
        if (label.contains("Sozlamalar") || label.contains("Settings")) return "SETTINGS";
        if (label.contains("Yordam") || label.contains("Help")) return "HELP";
        if (label.contains("Tinglash") || label.contains("Audio")) return "AUDIO_LIB";
        if (label.contains("mustahkamlash") || label.contains("YES")) return "REINFORCE_YES";
        if (label.contains("yakunlash") || label.contains("NO")) return "REINFORCE_NO";
        return label;
    }
}
