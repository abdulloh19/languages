import React, { useState, useEffect } from 'react';
import {
  BookOpen, Target, FolderKanban, Gamepad2, Volume2, BarChart3,
  Languages, Flame, Trophy, Gift, Settings, HelpCircle,
  Sparkles, Zap, ArrowRight, Play, CheckCircle2, Bot, Bell
} from 'lucide-react';

export default function SuperAnimatedMenu({ user, onAction, onNavigateToSimulator }) {
  const [activeCard, setActiveCard] = useState(null);
  const [bonusClaimed, setBonusClaimed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [claimedCount, setClaimedCount] = useState(user?.tokenBalance || 15);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Web Audio pleasant chime generator
  const playChime = (freq = 520) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // AudioContext not allowed or unsupported
    }
  };

  const handleCardClick = (actionKey, defaultFreq = 440) => {
    playChime(defaultFreq);
    if (onAction) onAction(actionKey);
  };

  const handleClaimBonus = (e) => {
    e.stopPropagation();
    if (bonusClaimed) return;
    playChime(780);
    setBonusClaimed(true);
    setClaimedCount(prev => prev + 10);
    if (onAction) onAction('DAILY_BONUS');
  };

  const targetLang = user?.targetLanguage || 'EN';
  const streak = user?.streakDays || 7;

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className="relative space-y-8 select-none"
    >
      {/* Ambient Interactive Glowing Orbs */}
      <div
        className="pointer-events-none absolute -z-10 w-96 h-96 rounded-full bg-sky-500/15 blur-[120px] transition-all duration-700 ease-out"
        style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}
      />
      <div
        className="pointer-events-none absolute -z-10 w-80 h-80 rounded-full bg-purple-500/15 blur-[120px] transition-all duration-1000 ease-out"
        style={{ transform: `translate(${mousePos.x * -0.3 + 400}px, ${mousePos.y * -0.3 + 200}px)` }}
      />

      {/* Hero Animated Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 via-sky-950/60 to-purple-950/40 p-8 glass-panel border border-sky-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-gradient-to-br from-sky-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/25 flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" /> Super Interactive Hub
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                @languageForZubayr_bot Connected
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              12-Section <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">Super Animated Menu</span>
            </h2>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Real-time synchronization with your Telegram Bot. Tap any animated portal below to trigger daily lessons, smart resume, voice synthesis, or memory challenges.
            </p>
          </div>

          {/* Quick Actions & Sound FX Toggle */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold border transition flex items-center gap-2 ${
                soundEnabled
                  ? 'bg-sky-500/20 text-sky-400 border-sky-500/40 shadow-lg shadow-sky-500/10'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>Chime Audio: {soundEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => handleCardClick('CONTINUE', 600)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-sm font-bold shadow-xl shadow-sky-500/25 transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>Quick Resume (Word #{user?.currentWordIndex || 1})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 12 SUPER ANIMATED CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {/* 1. 📚 Learn Today */}
        <div
          onClick={() => handleCardClick('LEARN_TODAY', 440)}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-sky-950/40 to-slate-900/80 border border-slate-800 hover:border-sky-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-2xl shadow-lg shadow-sky-500/20 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
              📚
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Daily Quota
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition">
            1. Learn Today
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Учить сегодня (20 слов) • Split 10 words ➔ Dialogue ➔ 10 words.
          </p>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-2">
            <div className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full w-3/5 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-1">
            <span>Progress: 12 / 20</span>
            <span className="text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition">
              Start ➔
            </span>
          </div>
        </div>

        {/* 2. 🎯 Continue (Smart Resume) */}
        <div
          onClick={() => handleCardClick('CONTINUE', 490)}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-indigo-950/40 to-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:-rotate-3 transition duration-300">
              🎯
            </div>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500" />
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition">
            2. Smart Continue
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Продолжить • Resumes directly from Word #{user?.currentWordIndex || 1} without zero restart.
          </p>
          <div className="p-2.5 rounded-xl bg-indigo-950/50 border border-indigo-500/20 text-xs font-mono text-indigo-300 flex items-center justify-between">
            <span>Resume: Word #{user?.currentWordIndex || 1}</span>
            <span className="text-white font-bold">{user?.resumePointWord || 'Active'}</span>
          </div>
        </div>

        {/* 3. 🗂️ Topics (5 Modules) */}
        <div
          onClick={() => handleCardClick('TOPICS', 520)}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-emerald-950/40 to-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
              🗂️
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              5 Topics
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
            3. Thematic Topics
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            5 тем × 5 диалогов • Family, Work, Travel, Food & Health modules.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 overflow-x-auto py-1">
            <span className="px-2 py-0.5 rounded-lg bg-slate-800">👨‍👩‍👧 Family</span>
            <span className="px-2 py-0.5 rounded-lg bg-slate-800">💼 Work</span>
            <span className="px-2 py-0.5 rounded-lg bg-slate-800">✈️ Travel</span>
          </div>
        </div>

        {/* 4. 🎮 Memory Games */}
        <div
          onClick={() => handleCardClick('GAMES', 580)}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-fuchsia-950/40 to-slate-900/80 border border-slate-800 hover:border-fuchsia-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30 flex items-center justify-center text-2xl shadow-lg shadow-fuchsia-500/20 group-hover:scale-110 group-hover:-rotate-3 transition duration-300 animate-float">
              🎮
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
              5 Modes
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-fuchsia-300 transition">
            4. Memory Games
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Игры памяти • Flashcard Match, 3s Recall, Listen & Choose, Fill Gap.
          </p>
          <div className="flex items-center justify-between text-xs text-fuchsia-400 font-semibold pt-1">
            <span>Play Memory Booster</span>
            <span className="group-hover:translate-x-1 transition">🎮 Enter</span>
          </div>
        </div>

        {/* 5. 🔊 Audio Voice Library */}
        <div
          onClick={() => handleCardClick('AUDIO_LIB', 620)}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-cyan-950/40 to-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
              🔊
            </div>
            {/* Equalizer Audio Waves Animation */}
            <div className="flex items-end gap-1 h-6">
              <span className="w-1 bg-cyan-400 rounded-full animate-[wave-bounce_1.1s_ease-in-out_infinite]" />
              <span className="w-1 bg-cyan-400 rounded-full animate-[wave-bounce_0.8s_ease-in-out_infinite]" />
              <span className="w-1 bg-cyan-400 rounded-full animate-[wave-bounce_1.4s_ease-in-out_infinite]" />
              <span className="w-1 bg-cyan-400 rounded-full animate-[wave-bounce_0.9s_ease-in-out_infinite]" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
            5. Audio Library
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Аудио библиотека • Google WaveNet & native phonetics for every single word.
          </p>
          <div className="text-xs text-cyan-400 font-semibold flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 fill-cyan-400" /> Listen Voice Samples
          </div>
        </div>

        {/* 6. 📊 Progress Matrix */}
        <div
          onClick={() => handleCardClick('PROGRESS', 650)}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-violet-950/40 to-slate-900/80 border border-slate-800 hover:border-violet-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/20 text-violet-400 border border-violet-500/30 flex items-center justify-center text-2xl shadow-lg shadow-violet-500/20 group-hover:scale-110 group-hover:-rotate-3 transition duration-300">
              📊
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">
              Live Stats
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition">
            6. Word Counters
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Мой прогресс • Real-time counts across Russian, English, and Uzbek.
          </p>
          <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
            <div className="bg-slate-800/80 p-1.5 rounded-lg">
              <div className="text-[10px] text-slate-400">RU</div>
              <div className="font-bold text-white">{user?.wordsRu || 65}</div>
            </div>
            <div className="bg-slate-800/80 p-1.5 rounded-lg">
              <div className="text-[10px] text-slate-400">EN</div>
              <div className="font-bold text-sky-400">{user?.wordsEn || 98}</div>
            </div>
            <div className="bg-slate-800/80 p-1.5 rounded-lg">
              <div className="text-[10px] text-slate-400">UZ</div>
              <div className="font-bold text-emerald-400">{user?.wordsUz || 22}</div>
            </div>
          </div>
        </div>

        {/* 7. 🌐 Change Language */}
        <div
          onClick={() => handleCardClick('CHANGE_LANG', 700)}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-blue-950/40 to-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
              🌐
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Target: {targetLang}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition">
            7. Change Language
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Сменить язык • Switch between Uzbek, English, and Russian seamlessly.
          </p>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-200">🇷🇺 RU</span>
            <span className="px-2 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/40">🇬🇧 EN</span>
            <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-200">🇺🇿 UZ</span>
          </div>
        </div>

        {/* 8. 🔥 My Streak */}
        <div
          onClick={() => handleCardClick('MY_STREAK', 740)}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-amber-950/40 to-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20 animate-flame">
              🔥
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {streak} Days Streak
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
            8. My Streak
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Серия дней • BJ Fogg behavioral momentum & streak shield protector.
          </p>
          <div className="flex items-center justify-between text-xs text-amber-400 font-bold pt-1">
            <span>🔥 {streak} Consecutive Days</span>
            <span className="text-slate-400 font-normal">Best: {Math.max(streak, 14)}d</span>
          </div>
        </div>

        {/* 9. 🏆 Leaderboard */}
        <div
          onClick={() => handleCardClick('LEADERBOARD', 780)}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-yellow-950/40 to-slate-900/80 border border-slate-800 hover:border-yellow-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 flex items-center justify-center text-2xl shadow-lg shadow-yellow-500/20 group-hover:scale-110 group-hover:-rotate-3 transition duration-300">
              🏆
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              Top 10
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition">
            9. Leaderboard
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Топ-10 лидеров • Hall of fame for the most dedicated multilingual learners.
          </p>
          <div className="flex items-center justify-between text-xs text-yellow-400 font-semibold pt-1">
            <span>🥇 Azizbek (280w)</span>
            <span className="text-slate-400">🥈 Nodira</span>
          </div>
        </div>

        {/* 10. 🎁 Daily Bonus Vault */}
        <div
          onClick={handleClaimBonus}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-rose-950/40 to-slate-900/80 border border-slate-800 hover:border-rose-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-2xl shadow-lg shadow-rose-500/20 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
              🎁
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {bonusClaimed ? 'Claimed' : 'Available'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition">
            10. Daily Bonus
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Ежедневный бонус • Free words, hint tokens, and game powerups.
          </p>
          <div className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-500/20 text-xs text-rose-300 flex items-center justify-between font-bold">
            <span>💎 Tokens: {claimedCount}</span>
            <span>{bonusClaimed ? '✅ +10 Claimed' : 'Tap to Claim'}</span>
          </div>
        </div>

        {/* 11. ⚙️ Settings */}
        <div
          onClick={() => handleCardClick('SETTINGS', 820)}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-slate-800/40 to-slate-900/80 border border-slate-800 hover:border-slate-600 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-45 transition duration-300">
              ⚙️
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
              09:00 Cron
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-slate-300 transition">
            11. Settings
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Настройки • Re-engagement push scheduler, native tongue & notifications.
          </p>
          <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
            <span>Daily Nudge: Active</span>
            <span className="text-slate-300 font-semibold">09:00 AM</span>
          </div>
        </div>

        {/* 12. ❓ Help & Guide */}
        <div
          onClick={() => handleCardClick('HELP', 880)}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-teal-950/40 to-slate-900/80 border border-slate-800 hover:border-teal-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center text-2xl shadow-lg shadow-teal-500/20 group-hover:scale-110 group-hover:-rotate-3 transition duration-300">
              ❓
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
              Guide
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition">
            12. Help & Commands
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Помощь • Interactive command guide, rules, and learning workflow tips.
          </p>
          <div className="text-xs text-teal-400 font-semibold flex items-center gap-1.5 pt-1">
            <HelpCircle className="w-3.5 h-3.5" /> View Command Index
          </div>
        </div>

      </div>

      {/* Floating Telegram Status Floating Bar */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 flex flex-col md:flex-row items-center justify-between gap-4 glass-panel">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-300">
            Active Bot Session: <strong className="text-white">@languageForZubayr_bot</strong> is actively listening to commands.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://t.me/languageForZubayr_bot"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-sky-500/20"
          >
            <Bot className="w-3.5 h-3.5" /> Open in Telegram App
          </a>
        </div>
      </div>
    </div>
  );
}
