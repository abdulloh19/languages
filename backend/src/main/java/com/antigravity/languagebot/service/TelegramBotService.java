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
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.ArrayList;
import java.util.List;

@Service
public class TelegramBotService extends TelegramLongPollingBot {

    private static final Logger log = LoggerFactory.getLogger(TelegramBotService.class);

    @Value("${telegram.bot.username:LanguageLearningMasterBot}")
    private String botUsername;

    @Value("${telegram.bot.token:none}")
    private String botToken;

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

    public record SimulationResponse(
            String replyText,
            List<List<String>> inlineButtons,
            String audioUrl,
            String currentStage
    ) {}

    @Override
    public void onUpdateReceived(Update update) {
        if ("none".equalsIgnoreCase(botToken) || botToken.isBlank()) {
            return; // Token not configured yet; simulator can still be used via REST
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
     * Simulator method for React Dashboard testing and headless testing
     */
    public SimulationResponse handleSimulatedAction(Long telegramId, String action, String data) {
        User user = learningFlowService.getOrCreateUser(telegramId, "test_user", "Tester");
        return processAction(user, action, data);
    }

    private void handleIncomingMessage(Long chatId, String text, User user) {
        if (text != null && (text.equalsIgnoreCase("/start") || text.equalsIgnoreCase("/menu"))) {
            sendReplyKeyboard(chatId);
        }
        SimulationResponse resp = processAction(user, text, null);
        sendTextMessage(chatId, resp.replyText(), resp.inlineButtons());
    }

    private void handleCallbackQuery(Long chatId, String callbackData, User user) {
        if (callbackData != null && (callbackData.contains("Audio") || callbackData.contains("Слушать") || callbackData.equalsIgnoreCase("AUDIO_LIB"))) {
            sendWordAudio(chatId, user);
        }
        SimulationResponse resp = processAction(user, callbackData, null);
        sendTextMessage(chatId, resp.replyText(), resp.inlineButtons());
    }

    private void sendReplyKeyboard(Long chatId) {
        SendMessage sm = new SendMessage();
        sm.setChatId(chatId.toString());
        sm.setText("📱 Навигация активирована. Кнопка «☰ Menu» всегда доступна внизу экрана.");
        ReplyKeyboardMarkup rk = new ReplyKeyboardMarkup();
        rk.setResizeKeyboard(true);
        rk.setSelective(false);
        List<KeyboardRow> rows = new ArrayList<>();
        KeyboardRow row = new KeyboardRow();
        row.add("☰ Menu");
        rows.add(row);
        rk.setKeyboard(rows);
        sm.setReplyMarkup(rk);
        try { execute(sm); } catch (Exception ignored) {}
    }

    private void sendWordAudio(Long chatId, User user) {
        try {
            LearningFlowService.WordCardDto card = learningFlowService.resume(user.getId());
            byte[] wavBytes = ttsAudioService.synthesizeAudio(card.wordTarget(), user.getTargetLanguage());
            if (wavBytes != null && wavBytes.length > 0) {
                org.telegram.telegrambots.meta.api.methods.send.SendAudio sendAudio = new org.telegram.telegrambots.meta.api.methods.send.SendAudio();
                sendAudio.setChatId(chatId.toString());
                sendAudio.setAudio(new org.telegram.telegrambots.meta.api.objects.InputFile(new java.io.ByteArrayInputStream(wavBytes), card.wordTarget() + ".wav"));
                sendAudio.setTitle(card.wordTarget() + " (" + user.getTargetLanguage() + ")");
                sendAudio.setPerformer("Google WaveNet TTS");
                execute(sendAudio);
            }
        } catch (Exception e) {
            log.warn("Could not send audio to Telegram: {}", e.getMessage());
        }
    }

    public SimulationResponse processAction(User user, String text, String extra) {
        String clean = text != null ? text.trim() : "";

        // 1. Navigation to Super Menu
        if (clean.equalsIgnoreCase("/start") || clean.equalsIgnoreCase("/menu")
                || clean.equalsIgnoreCase("☰ Menu") || clean.equalsIgnoreCase("⬅️ Back to Menu")
                || clean.equalsIgnoreCase("MENU")) {
            return renderSuperMenu(user);
        }

        // 2. Resume / Come Back (Critical requirement)
        if (clean.equalsIgnoreCase("CONTINUE") || clean.equalsIgnoreCase("🎯 Continue")
                || clean.equalsIgnoreCase("🌅 Come Back") || clean.equalsIgnoreCase("🌅 Вернуться")
                || clean.equalsIgnoreCase("/resume") || clean.equalsIgnoreCase("YES_RESUME")) {
            var card = learningFlowService.resume(user.getId());
            return renderWordCard(user, card, true);
        }

        // 3. Learn Today (20 words/day flow)
        if (clean.equalsIgnoreCase("LEARN_TODAY") || clean.equalsIgnoreCase("📚 Learn Today")
                || clean.equalsIgnoreCase("/learn")) {
            var card = learningFlowService.resume(user.getId());
            return renderWordCard(user, card, false);
        }

        // 4. Next Word
        if (clean.equalsIgnoreCase("NEXT_WORD")) {
            var card = learningFlowService.nextWord(user.getId());
            if (card.wordOrder() == 11) {
                // Transition to Dialogue 1
                return renderDialogueScreen(user, 1);
            } else if (card.wordOrder() == 1 && user.getCurrentWordIndex() == 1) {
                // Topic finished -> Dialogue 2 & Reinforcement prompt
                return renderDialogueScreen(user, 2);
            }
            return renderWordCard(user, card, false);
        }

        // 5. Dialogue Continuation
        if (clean.startsWith("DIALOGUE_")) {
            int diagOrder = Integer.parseInt(clean.replace("DIALOGUE_", ""));
            return renderDialogueScreen(user, diagOrder);
        }

        // 6. Dialogue Continue? (Confirm before next)
        if (clean.startsWith("CONFIRM_DIALOGUE_")) {
            int nextDiag = Integer.parseInt(clean.replace("CONFIRM_DIALOGUE_", ""));
            if (nextDiag > 5) {
                return renderReinforcementPrompt(user);
            }
            return renderDialogueScreen(user, nextDiag);
        }

        // 7. Reinforcement prompt (YES / NO)
        if (clean.equalsIgnoreCase("REINFORCE_YES")) {
            return renderGameScreen(user, "FLASHCARD");
        }
        if (clean.equalsIgnoreCase("REINFORCE_NO")) {
            return new SimulationResponse(
                    "✅ <b>Отличная работа сегодня! / Great work today!</b>\n\nВаш прогресс надёжно сохранён. До встречи завтра!\nYour progress is safely saved. See you tomorrow at 09:00!",
                    List.of(List.of("☰ Menu")),
                    null,
                    "SESSION_SAVED"
            );
        }

        // 8. Memory Games
        if (clean.equalsIgnoreCase("GAMES") || clean.equalsIgnoreCase("🎮 Games")) {
            return renderGamesMenu(user);
        }
        if (clean.startsWith("GAME_")) {
            String gType = clean.replace("GAME_", "");
            return renderGameScreen(user, gType);
        }

        // 9. Topics List
        if (clean.equalsIgnoreCase("TOPICS") || clean.equalsIgnoreCase("🗂️ Topics")) {
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

        // 10. Language Switch Tracker
        if (clean.equalsIgnoreCase("CHANGE_LANG") || clean.equalsIgnoreCase("🌐 Change Language")) {
            return renderLanguageSwitchMenu(user);
        }
        if (clean.startsWith("SET_LANG_")) {
            String newLang = clean.replace("SET_LANG_", "");
            learningFlowService.switchLanguage(user.getId(), newLang);
            return renderSuperMenu(user);
        }

        // 11. My Streak & Stats
        if (clean.equalsIgnoreCase("MY_STREAK") || clean.equalsIgnoreCase("🔥 My Streak")) {
            return new SimulationResponse(
                    String.format("""
                            🔥 <b>ВАША СЕРИЯ / YOUR STREAK</b>
                            
                            Текущая серия: <b>%d дней подряд</b>
                            Лучшая серия: <b>%d дней</b>
                            
                            🎯 Цель: 20 слов каждый день!
                            Продолжайте заниматься каждый день без перерывов.
                            """, user.getStreakDays(), user.getLongestStreak()),
                    List.of(List.of("🎯 Continue", "⬅️ Back to Menu")),
                    null,
                    "MY_STREAK"
            );
        }

        // 12. Leaderboard
        if (clean.equalsIgnoreCase("LEADERBOARD") || clean.equalsIgnoreCase("🏆 Leaderboard")) {
            return new SimulationResponse(
                    superMenuService.renderLeaderboardText(),
                    List.of(List.of("⬅️ Back to Menu")),
                    null,
                    "LEADERBOARD"
            );
        }

        // 13. Daily Bonus
        if (clean.equalsIgnoreCase("DAILY_BONUS") || clean.equalsIgnoreCase("🎁 Daily Bonus")) {
            user.setTokenBalance(user.getTokenBalance() + 5);
            userRepository.save(user);
            return new SimulationResponse(
                    "🎁 <b>Ежедневный бонус получен! / Daily Bonus Claimed!</b>\n\nВам начислено +5 токенов 💎.\nТекущий баланс: <b>" + user.getTokenBalance() + "</b> токенов.",
                    List.of(List.of("📚 Learn Today", "⬅️ Back to Menu")),
                    null,
                    "DAILY_BONUS"
            );
        }

        // 14. Audio Library
        if (clean.equalsIgnoreCase("AUDIO_LIB") || clean.equalsIgnoreCase("🔊 Audio Library")) {
            return new SimulationResponse(
                    """
                    🔊 <b>АУДИО БИБЛИОТЕКА / AUDIO LIBRARY</b>
                    
                    Все слова и диалоги озвучены на трёх языках:
                    • 🇷🇺 Русский (Google WaveNet)
                    • 🇬🇧 English (Native Acoustic Synthesis)
                    • 🇺🇿 O'zbekcha (Tabiiy talaffuz)
                    
                    Аудио воспроизводится автоматически на каждой карточке слова.
                    """,
                    List.of(List.of("📚 Learn Today", "⬅️ Back to Menu")),
                    null,
                    "AUDIO_LIB"
            );
        }

        // 15. Settings & Help
        if (clean.equalsIgnoreCase("SETTINGS") || clean.equalsIgnoreCase("⚙️ Settings")) {
            return new SimulationResponse(
                    "⚙️ <b>НАСТРОЙКИ / SETTINGS</b>\n\n• Уведомления: <b>09:00 Вкл</b>\n• Дневная норма: <b>20 слов</b>\n• Целевой язык: <b>" + user.getTargetLanguage() + "</b>",
                    List.of(List.of("🌐 Change Language", "⬅️ Back to Menu")),
                    null,
                    "SETTINGS"
            );
        }

        if (clean.equalsIgnoreCase("HELP") || clean.equalsIgnoreCase("❓ Help")) {
            return new SimulationResponse(
                    """
                    ❓ <b>СПРАВКА / HELP</b>
                    
                    Добро пожаловать в платформу изучения языков!
                    • <b>20 слов в день:</b> 10 слов ➔ Диалог ➔ 10 слов ➔ Закрепление.
                    • <b>Возобновление:</b> Мы никогда не начинаем с нуля — вы продолжите ровно с того слова, где остановились.
                    • <b>Игры:</b> 5 интерактивных игр для тренировки памяти.
                    
                    Нажмите «☰ Menu», чтобы открыть главное меню в любой момент.
                    """,
                    List.of(List.of("☰ Menu")),
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

        if (user.getDaysInactive() >= 1) {
            buttons.add(List.of("🌅 Come Back", "🎯 Continue"));
        } else {
            buttons.add(List.of("📚 Learn Today", "🎯 Continue"));
        }
        buttons.add(List.of("🗂️ Topics", "🎮 Games"));
        buttons.add(List.of("🔊 Audio Library", "📊 Progress"));
        buttons.add(List.of("🌐 Change Language", "🔥 My Streak"));
        buttons.add(List.of("🏆 Leaderboard", "🎁 Daily Bonus"));
        buttons.add(List.of("⚙️ Settings", "❓ Help"));

        return new SimulationResponse(text, buttons, null, "SUPER_MENU");
    }

    private SimulationResponse renderWordCard(User user, LearningFlowService.WordCardDto card, boolean isResume) {
        String header = isResume
                ? "🎯 <b>ВОЗОБНОВЛЕНИЕ С МЕСТА ПАУЗЫ / RESUME POINT</b>\n\n"
                : "📚 <b>ДНЕВНОЙ УРОК / DAILY LESSON</b>\n\n";

        String text = String.format("""
                %sТема: <b>%s</b> | Слово <b>%d / 20</b>
                
                🎯 <b>%s</b>
                🗣️ Транскрипция: <code>%s</code>
                🇷🇺 Перевод: <b>%s</b>
                🇺🇿 O'zbekcha: <b>%s</b>
                
                📝 <i>Пример / Example:</i>
                • %s
                • %s
                """,
                header,
                card.topicTitle(),
                card.progressOutOf20(),
                card.wordTarget(),
                card.phonetic(),
                card.wordNative(),
                card.wordUz(),
                card.exampleTarget(),
                card.exampleNative()
        );

        List<List<String>> buttons = List.of(
                List.of("🔊 Слушать / Audio", "➡️ Следующее слово / Next"),
                List.of("⬅️ Back to Menu")
        );

        return new SimulationResponse(text, buttons, card.audioUrl(), "WORD_CARD");
    }

    private SimulationResponse renderDialogueScreen(User user, int dialogueOrder) {
        var diag = learningFlowService.getDialogue(user.getId(), dialogueOrder);
        String text = String.format("""
                💬 <b>ДИАЛОГ / DIALOGUE (%d / 5)</b>
                Тема: <b>%s</b> — <i>%s</i>
                
                %s
                
                ──────────────────
                <b>Продолжить? / Continue?</b>
                """,
                diag.dialogueNumber(),
                diag.topicTitle(),
                diag.titleTarget(),
                diag.contentTarget()
        );

        List<List<String>> buttons = List.of(
                List.of("➡️ Да, продолжить / Continue", "📚 К словам / Back to Words"),
                List.of("⬅️ Back to Menu")
        );

        return new SimulationResponse(text, buttons, null, "DIALOGUE");
    }

    private SimulationResponse renderReinforcementPrompt(User user) {
        String text = """
                🎉 <b>20 слов и диалоги успешно пройдены!</b>
                
                🧠 <b>Закрепим слова в интерактивной игре? / Reinforce these words?</b>
                
                Регулярное повторение увеличивает запоминание на 85% согласно кривой Эббингауза!
                """;

        List<List<String>> buttons = List.of(
                List.of("✅ ДА, закрепить! / YES, reinforce", "❌ Нет, завершить / NO, finish"),
                List.of("⬅️ Back to Menu")
        );

        return new SimulationResponse(text, buttons, null, "REINFORCE_PROMPT");
    }

    private SimulationResponse renderGamesMenu(User user) {
        String text = """
                🎮 <b>ТРЕНИРОВКА ПАМЯТИ / MEMORY GAMES</b>
                
                Выберите режим игры для закрепления выученных слов:
                """;

        List<List<String>> buttons = List.of(
                List.of("🎴 Flashcard Match", "🧠 Word Recall (3s)"),
                List.of("🔗 Word → Translation", "🎧 Listen & Choose"),
                List.of("✍️ Fill the Gap"),
                List.of("⬅️ Back to Menu")
        );

        return new SimulationResponse(text, buttons, null, "GAMES_MENU");
    }

    private SimulationResponse renderGameScreen(User user, String gameType) {
        var q = gameService.generateGameQuestion(user.getCurrentTopicId(), gameType, user.getTargetLanguage());
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("🎮 <b>%s</b>\n\n", q.questionTitleRu()));
        sb.append(String.format("Слово: <b>%s</b>\n", q.targetWord()));
        if (q.gapSentence() != null) {
            sb.append(String.format("Предложение: <i>%s</i>\n", q.gapSentence()));
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
        buttons.add(List.of("🎲 Другая игра / Next Game", "⬅️ Back to Menu"));

        return new SimulationResponse(sb.toString(), buttons, q.audioUrl(), "GAME_ACTIVE");
    }

    private SimulationResponse renderTopicsMenu(User user) {
        List<Topic> topics = topicRepository.findAllByOrderByDisplayOrderAsc();
        StringBuilder sb = new StringBuilder("🗂️ <b>5 ТЕМАТИЧЕСКИХ МОДУЛЕЙ / 5 TOPICS</b>\n\n");
        List<List<String>> buttons = new ArrayList<>();

        for (Topic t : topics) {
            sb.append(String.format("%s <b>%s</b> (%s)\n", t.getIcon(), t.getTitleRu(), t.getTitleEn()));
            buttons.add(List.of(t.getIcon() + " " + t.getTitleEn()));
        }
        buttons.add(List.of("⬅️ Back to Menu"));

        return new SimulationResponse(sb.toString(), buttons, null, "TOPICS_MENU");
    }

    private SimulationResponse renderLanguageSwitchMenu(User user) {
        String text = superMenuService.renderLanguageSwitchText(user);
        List<List<String>> buttons = List.of(
                List.of("🇷🇺 Русский", "🇬🇧 English", "🇺🇿 O'zbek"),
                List.of("⬅️ Back to Menu")
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
        if (label.contains("Learn Today") || label.contains("Учить сегодня")) return "LEARN_TODAY";
        if (label.contains("Continue") || label.contains("Продолжить")) return "CONTINUE";
        if (label.contains("Come Back") || label.contains("Вернуться")) return "CONTINUE";
        if (label.contains("Next") || label.contains("Следующее")) return "NEXT_WORD";
        if (label.contains("Back to Menu") || label.contains("Menu")) return "MENU";
        if (label.contains("Topics") || label.contains("Темы")) return "TOPICS";
        if (label.contains("Games") || label.contains("Игры")) return "GAMES";
        if (label.contains("Change Language") || label.contains("Сменить язык")) return "CHANGE_LANG";
        if (label.contains("My Streak") || label.contains("Серия")) return "MY_STREAK";
        if (label.contains("Leaderboard") || label.contains("Лидеры")) return "LEADERBOARD";
        if (label.contains("Daily Bonus") || label.contains("Бонус")) return "DAILY_BONUS";
        if (label.contains("Settings") || label.contains("Настройки")) return "SETTINGS";
        if (label.contains("Help") || label.contains("Помощь")) return "HELP";
        if (label.contains("Audio") || label.contains("Слушать")) return "AUDIO_LIB";
        if (label.contains("ДА, закрепить") || label.contains("YES, reinforce")) return "REINFORCE_YES";
        if (label.contains("Нет, завершить") || label.contains("NO, finish")) return "REINFORCE_NO";
        if (label.contains("Русский")) return "SET_LANG_RU";
        if (label.contains("English")) return "SET_LANG_EN";
        if (label.contains("O'zbek")) return "SET_LANG_UZ";
        return label;
    }
}
