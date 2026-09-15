package com.antigravity.languagebot.service;

import com.antigravity.languagebot.entity.User;
import com.antigravity.languagebot.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuperMenuService {

    private final UserRepository userRepository;

    public SuperMenuService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public record MenuItem(String id, String labelRu, String labelEn, String icon) {}

    public static final List<MenuItem> MENU_ITEMS = List.of(
            new MenuItem("LEARN_TODAY", "Учить сегодня (20 слов)", "Learn Today (20 words)", "📚"),
            new MenuItem("CONTINUE", "Продолжить (с места паузы)", "Continue (resume from last)", "🎯"),
            new MenuItem("TOPICS", "Темы (5 тем)", "Topics (5 topics)", "🗂️"),
            new MenuItem("GAMES", "Игры памяти (5 игр)", "Memory Games (5 games)", "🎮"),
            new MenuItem("AUDIO_LIB", "Аудио библиотека", "Audio Library", "🔊"),
            new MenuItem("PROGRESS", "Мой прогресс", "My Progress", "📊"),
            new MenuItem("CHANGE_LANG", "Сменить язык", "Change Language", "🌐"),
            new MenuItem("MY_STREAK", "Серия дней", "My Streak", "🔥"),
            new MenuItem("LEADERBOARD", "Топ-10 лидеров", "Leaderboard (Top 10)", "🏆"),
            new MenuItem("DAILY_BONUS", "Ежедневный бонус", "Daily Bonus", "🎁"),
            new MenuItem("SETTINGS", "Настройки", "Settings", "⚙️"),
            new MenuItem("HELP", "Помощь", "Help", "❓")
    );

    public String renderMenuText(User user) {
        boolean isRu = "RU".equalsIgnoreCase(user.getTargetLanguage()) || "RU".equalsIgnoreCase(user.getNativeLanguage());
        long daysInactive = user.getDaysInactive();

        StringBuilder sb = new StringBuilder();
        if (daysInactive >= 1) {
            sb.append(isRu
                    ? "🌅 <b>С возвращением!</b> Нажмите <b>«🌅 Вернуться»</b> или <b>«🎯 Продолжить»</b>, чтобы возобновить урок.\n\n"
                    : "🌅 <b>Welcome Back!</b> Tap <b>\"🌅 Come Back\"</b> or <b>\"🎯 Continue\"</b> to resume your lesson.\n\n");
        }

        sb.append(isRu ? "🌟 <b>СУПЕР МЕНЮ ОБУЧЕНИЯ</b>\n" : "🌟 <b>SUPER LEARNING HUB</b>\n");
        sb.append(isRu
                ? "Выберите нужный раздел или введите команду:\n\n"
                : "Select a module or enter a command:\n\n");

        sb.append(String.format("🔥 Серия / Streak: %d дн. | 💎 Токены: %d\n", user.getStreakDays(), user.getTokenBalance()));
        sb.append(String.format("🇷🇺 RU: %d слов | 🇬🇧 EN: %d слов | 🇺🇿 UZ: %d слов\n\n",
                user.getWordsLearnedRu(), user.getWordsLearnedEn(), user.getWordsLearnedUz()));

        return sb.toString();
    }

    public String renderLanguageSwitchText(User user) {
        return String.format("""
                🌐 <b>СМЕНА ЯЗЫКА / LANGUAGE SWITCH</b>
                
                Текущий целевой язык: <b>%s</b>
                
                📊 <b>Счётчик выученных слов:</b>
                🇷🇺 Russian:  <b>%d</b> слов выучено
                🇬🇧 English:  <b>%d</b> words memorized
                🇺🇿 Uzbek:    <b>%d</b> ta so'z yodlandi
                
                Выберите язык для изучения:
                """,
                user.getTargetLanguage(),
                user.getWordsLearnedRu(),
                user.getWordsLearnedEn(),
                user.getWordsLearnedUz()
        );
    }

    public String renderLeaderboardText() {
        List<User> topUsers = userRepository.findTop10ByTotalWordsLearned();
        StringBuilder sb = new StringBuilder();
        sb.append("🏆 <b>ТОП-10 УЧЕНИКОВ / LEADERBOARD</b>\n\n");
        int rank = 1;
        for (User u : topUsers) {
            int total = u.getWordsLearnedRu() + u.getWordsLearnedEn() + u.getWordsLearnedUz();
            String medal = switch (rank) {
                case 1 -> "🥇";
                case 2 -> "🥈";
                case 3 -> "🥉";
                default -> "👤";
            };
            sb.append(String.format("%s %d. <b>%s</b> — %d слов (🔥 %d дн.)\n",
                    medal, rank++, (u.getFirstName() != null ? u.getFirstName() : "Learner"), total, u.getStreakDays()));
        }
        return sb.toString();
    }
}
