# 🚀 AI Language Learning Platform (Uzbek ↔ English ↔ Russian)
### Powered by Google Antigravity Architecture

A bilingual and trilingual language learning platform featuring a **Spring Boot 3** backend, integrated **Telegram Bot** with a 12-section Super Menu, **React + Tailwind** admin dashboard tracking 100 concurrent learners, automated **09:00 daily psychological re-entry pushes**, native **TTS audio synthesis**, and **resume-from-last-word** persistence.

---

## 🌟 Key Features

1. **100 Concurrent Learners Capacity**:
   - High-throughput persistence with PostgreSQL & H2 dev profile.
   - Comprehensive dashboard tracking Active (<24h) and Inactive (>24h) learners.
   - Per-user metrics: streak days, words learned (RU/EN/UZ), current topic, exact resume word.

2. **Daily Learning Flow (20 Words/Day)**:
   ```
   Step 1: 10 Words (with phonetics and native TTS audio)
   Step 2: Topic-related Dialogue (uses those 10 words)
   Step 3: 10 More Words (with audio)
   Step 4: Continuing Dialogue (reinforces all 20 words)
   Step 5: "Reinforce these words? / Закрепим слова?" (YES -> 5 Memory Games | NO -> End session)
   ```

3. **Critical Resume Logic**:
   - If a learner pauses at **Word #6**, their next session resumes at **Word #6** — never restarting from zero.
   - Word progress is saved to the database after every single word interaction.

4. **12-Section Bilingual Super Menu (Telegram Bot)**:
   1. 📚 **Learn Today** (20 words daily flow)
   2. 🎯 **Continue** (resume from last saved word)
   3. 🗂️ **Topics** (5 thematic modules)
   4. 🎮 **Games** (5 memory games)
   5. 🔊 **Audio Library** (word pronunciation catalogue)
   6. 📊 **Progress** (RU / EN / UZ word counters)
   7. 🌐 **Change Language** (instant re-rendering)
   8. 🔥 **My Streak** (flame counter & longest streak)
   9. 🏆 **Leaderboard** (Top 10 learners by words memorized)
   10. 🎁 **Daily Bonus** (free reward tokens & hints)
   11. ⚙️ **Settings** (notification preferences)
   12. ❓ **Help** (usage guide & commands)
   - Persistent `☰ Menu` button accessible on all screens.
   - Inactive learners are greeted with `🌅 Come Back / Вернуться` re-entry actions.

5. **Daily 09:00 Psychological Re-engagement (Cialdini + Fogg)**:
   - Automated Spring `@Scheduled(cron = "0 0 9 * * *")` engine.
   - Psychological triggers:
     - **Loss Aversion**: *"You're about to lose your 47-word streak!"*
     - **Curiosity Gap**: *"The next word will unlock an essential phrase in Food & Restaurants..."*
     - **Commitment & Consistency**: *"You promised yourself 20 words a day."*
     - **Social Proof**: *"92% of learners at your level completed their goal today."*
   - Bilingual notification templates (RU + EN) featuring exact resume word and days inactive.

6. **TTS Audio Pronunciation**:
   - WaveNet / Google Cloud TTS integration.
   - Embedded acoustic voice-formant generator ensuring all words and dialogues have native-quality audio even in offline/demo environments.

7. **5 Playful Memory Games**:
   - 🎴 Flashcard Match
   - 🧠 Word Recall (3-second flash)
   - 🔗 Word → Translation Match
   - 🎧 Listen & Choose
   - ✍️ Fill the Gap

8. **5 Thematic Modules (RU, EN, UZ)**:
   - 👨‍👩‍👧 Family & Friends (Семья и друзья / Oila va do'stlar)
   - 💼 Work & Career (Работа и карьера / Ish va karyera)
   - ✈️ Travel (Путешествия / Sayohat)
   - 🍕 Food & Restaurants (Еда и рестораны / Ovqat va restoran)
   - 🏥 Health (Здоровье / Salomatlik)

---

## 🏗️ Technical Architecture

```
languageBot/
├── backend/
│   ├── src/main/java/com/antigravity/languagebot/
│   │   ├── LanguageBotApplication.java
│   │   ├── config/ (CORS, Scheduling)
│   │   ├── controller/
│   │   │   ├── DashboardController.java     # /api/dashboard/summary, /users, /nudge, /reset
│   │   │   ├── LearningApiController.java   # /api/session/resume, /word/next, /bot/simulate
│   │   │   └── TtsApiController.java        # /api/tts/synthesize
│   │   ├── entity/                          # User, Topic, Word, Dialogue, LearningState, NotificationLog
│   │   ├── repository/                      # Spring Data JPA Repositories
│   │   ├── scheduler/
│   │   │   └── DailyNudgeScheduler.java     # Daily 09:00 AM inactive re-engagement cron
│   │   └── service/
│   │       ├── TelegramBotService.java      # Telegram Long Polling & Web Simulator
│   │       ├── LearningFlowService.java     # 20-word flow & resume-from-last-word engine
│   │       ├── PsychologicalNudgeService.java# Cialdini & Fogg re-entry message builder
│   │       ├── SuperMenuService.java        # 12-section hub renderer
│   │       ├── GameService.java             # 5 memory games engine
│   │       ├── TtsAudioService.java         # Google WaveNet & embedded synthesis
│   │       ├── DashboardService.java        # 100-user analytics & management
│   │       └── DataInitializerService.java  # Seeds 100 learners, 5 topics, 25 dialogues, 100 words
│   ├── src/main/resources/
│   │   ├── application.yml                 # H2 in-memory (dev) & PostgreSQL (prod)
│   │   └── static/                         # Built React dashboard bundle
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── App.jsx                         # Main dashboard controller
│   │   └── components/
│   │       ├── StatsHeader.jsx             # Active/Inactive metrics cards
│   │       ├── UserTable.jsx               # 100-user table with search & actions
│   │       ├── NudgeModal.jsx              # Psychological push preview & dispatch
│   │       ├── BotSimulator.jsx            # Interactive browser Telegram simulator
│   │       └── AudioVocabularyViewer.jsx   # 5-topic audio player
│   ├── package.json
│   └── vite.config.js
├── Dockerfile                              # Multi-stage production container
├── docker-compose.yml                      # Full-stack PostgreSQL + App
├── railway.toml                            # Railway.app configuration
├── Procfile                                # PaaS runner
└── .github/workflows/deploy.yml            # CI/CD automated pipeline
```

---

## 🚀 Quick Start & Local Execution

### 1. Build and Run Backend
```bash
# Package with Maven
mvn clean package -DskipTests

# Run Spring Boot (starts on port 8080)
java -jar backend/target/language-bot-1.0.0.jar
```

Access the application in your browser:
- **Admin Dashboard & Bot Simulator**: `http://localhost:8080`
- **Dashboard API Summary**: `http://localhost:8080/api/dashboard/summary`
- **Audio Synthesizer**: `http://localhost:8080/api/tts/synthesize?text=Family&lang=EN`
- **H2 Database Console**: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:language_db`, User: `sa`)

### 2. Environment Variables for Production / Railway
| Variable | Description | Default |
|---|---|---|
| `PORT` | Web server port | `8080` |
| `SPRING_PROFILES_ACTIVE` | Spring profile (`dev` or `prod`) | `prod` |
| `DB_URL` | PostgreSQL JDBC Connection URL | Railway PostgreSQL Addon |
| `TELEGRAM_BOT_USERNAME` | Your Telegram Bot Username | `LanguageLearningMasterBot` |
| `TELEGRAM_BOT_TOKEN` | Bot token from @BotFather | `none` (headless/simulator mode) |
| `TTS_API_KEY` | Google Cloud Text-to-Speech API key | Optional (embedded fallback active) |
| `NUDGE_CRON` | Daily cron schedule for inactive nudges | `0 0 9 * * *` (09:00 AM) |

---

## 🚢 Deploying to Railway.app (24/7 Hosting)

1. Fork or push this repository to GitHub: `https://github.com/abdulloh19/languages.git`.
2. Open [Railway.app](https://railway.app/) and create a **New Project**.
3. Select **Deploy from GitHub repo** and connect `languages`.
4. Add a **PostgreSQL Database** service in Railway.
5. In the web service **Variables**, set:
   - `TELEGRAM_BOT_TOKEN`: `<your-bot-token-from-botfather>`
   - `TELEGRAM_BOT_USERNAME`: `<your-bot-username>`
   - `SPRING_PROFILES_ACTIVE`: `prod`
   - `DB_URL`: `${{Postgres.DATABASE_URL}}`
6. Railway will automatically build the `Dockerfile` and run the platform 24/7.
