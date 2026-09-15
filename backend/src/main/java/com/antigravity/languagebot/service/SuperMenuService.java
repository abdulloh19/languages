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

    public record MenuItem(String id, String labelUz, String labelEn, String icon) {}

    public static final List<MenuItem> MENU_ITEMS = List.of(
            new MenuItem("LEARN_TODAY", "Bugungi dars (20 so'z)", "Learn Today (20 words)", "📚"),
            new MenuItem("CONTINUE", "Davom ettirish (to'xtagan joydan)", "Continue (resume from last)", "🎯"),
            new MenuItem("TOPICS", "5 ta Mavzu", "Topics (5 topics)", "🗂️"),
            new MenuItem("GAMES", "Xotira o'yinlari (5 ta)", "Memory Games (5 games)", "🎮"),
            new MenuItem("AUDIO_LIB", "Audio Lug'at & Talaffuz", "Audio Library", "🔊"),
            new MenuItem("PROGRESS", "Mening natijam", "My Progress", "📊"),
            new MenuItem("CHANGE_LANG", "Yo'nalishni almashtirish", "Change Language", "🌐"),
            new MenuItem("MY_STREAK", "Kunlik seriya (Streak)", "My Streak", "🔥"),
            new MenuItem("LEADERBOARD", "Peshqadamlar (Top 10)", "Leaderboard (Top 10)", "🏆"),
            new MenuItem("DAILY_BONUS", "Kunlik bonus", "Daily Bonus", "🎁"),
            new MenuItem("SETTINGS", "Sozlamalar", "Settings", "⚙️"),
            new MenuItem("HELP", "Yordam", "Help", "❓")
    );

    public String renderMenuText(User user) {
        String directionText = "RU".equalsIgnoreCase(user.getTargetLanguage())
                ? "🇺🇿 ➔ 🇷🇺 <b>O'zbekcha ➔ Ruscha (UZB ➔ RU)</b>"
                : "🇺🇿 ➔ 🇬🇧 <b>O'zbekcha ➔ Inglizcha (UZB ➔ EN)</b>";

        StringBuilder sb = new StringBuilder();
        if (user.getDaysInactive() >= 1) {
            sb.append("🌅 <b>Qaytganingiz bilan!</b> To'xtagan joyingizdan davom etish uchun <b>«🎯 Davom etish»</b> tugmasini bosing.\n\n");
        }

        sb.append("🌟 <b>SUPER ILOVA — ASOSIY MENYU</b>\n\n");
        sb.append("🎯 Faol yo'nalish: ").append(directionText).append("\n");
        sb.append(String.format("🔥 Seriya: <b>%d kun</b> | 💎 Tokenlar: <b>%d</b>\n", user.getStreakDays(), user.getTokenBalance()));
        sb.append(String.format("📊 O'rganilgan: 🇷🇺 RU: <b>%d</b> ta | 🇬🇧 EN: <b>%d</b> ta\n\n",
                user.getWordsLearnedRu(), user.getWordsLearnedEn()));
        sb.append("Pastdagi ko'k <b>«Super ilova»</b> tugmasi orqali to'liq animatsion ilovani ochishingiz mumkin 👇");

        return sb.toString();
    }

    public String renderLanguageSwitchText(User user) {
        String currentDir = "RU".equalsIgnoreCase(user.getTargetLanguage())
                ? "🇺🇿 ➔ 🇷🇺 O'zbekcha ➔ Ruscha"
                : "🇺🇿 ➔ 🇬🇧 O'zbekcha ➔ Inglizcha";

        return String.format("""
                🌐 <b>O'RGANISH YO'NALISHINI TANLASH</b>
                
                Hozirgi yo'nalish: <b>%s</b>
                
                📊 <b>Yodlangan so'zlar hisobi:</b>
                🇷🇺 Ruscha:    <b>%d</b> ta so'z
                🇬🇧 Inglizcha: <b>%d</b> ta so'z
                
                Qaysi yo'nalishda o'rganishni xohlaysiz?
                """,
                currentDir,
                user.getWordsLearnedRu(),
                user.getWordsLearnedEn()
        );
    }

    public String renderLeaderboardText() {
        List<User> topUsers = userRepository.findTop10ByTotalWordsLearned();
        StringBuilder sb = new StringBuilder();
        sb.append("🏆 <b>PESHQADAMLAR JADVALI (TOP-10)</b>\n\n");
        int rank = 1;
        for (User u : topUsers) {
            int total = u.getWordsLearnedRu() + u.getWordsLearnedEn();
            String medal = switch (rank) {
                case 1 -> "🥇";
                case 2 -> "🥈";
                case 3 -> "🥉";
                default -> "👤";
            };
            sb.append(String.format("%s %d. <b>%s</b> — %d ta so'z (🔥 %d kun)\n",
                    medal, rank++, (u.getFirstName() != null ? u.getFirstName() : "O'quvchi"), total, u.getStreakDays()));
        }
        return sb.toString();
    }
}
