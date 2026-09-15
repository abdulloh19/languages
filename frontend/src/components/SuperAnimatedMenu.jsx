import React, { useState, useEffect } from 'react';
import {
  BookOpen, Target, FolderKanban, Gamepad2, Volume2, BarChart3,
  Languages, Flame, Trophy, Gift, Settings, HelpCircle,
  Sparkles, Zap, ArrowRight, Play, CheckCircle2, Bot, Bell, ShieldCheck
} from 'lucide-react';
import { speechService } from '../services/speechService';

export default function SuperAnimatedMenu({ user, onAction, onNavigateToSimulator }) {
  const [bonusClaimed, setBonusClaimed] = useState(false);
  const [claimedCount, setClaimedCount] = useState(user?.tokenBalance || 15);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedDirection, setSelectedDirection] = useState(
    user?.targetLanguage === 'RU' ? 'UZ_TO_RU' : 'UZ_TO_EN'
  );

  useEffect(() => {
    // If inside Telegram WebApp, notify ready and expand to full height
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor('#0f172a');
      window.Telegram.WebApp.setBackgroundColor('#020617');
    }
  }, []);

  const handleCardClick = (actionKey) => {
    speechService.playTapSound();
    if (onAction) onAction(actionKey);
  };

  const handleClaimBonus = (e) => {
    e.stopPropagation();
    if (bonusClaimed) return;
    speechService.playSuccessSound();
    setBonusClaimed(true);
    setClaimedCount(prev => prev + 10);
    if (onAction) onAction('DAILY_BONUS');
  };

  const switchDirection = (dir) => {
    setSelectedDirection(dir);
    speechService.playTapSound();
    const newLang = dir === 'UZ_TO_RU' ? 'RU' : 'EN';
    if (onAction) onAction('SET_LANG_' + newLang);
  };

  const playVoiceSample = (e) => {
    e.stopPropagation();
    if (selectedDirection === 'UZ_TO_RU') {
      speechService.speak("Здравствуйте! Добро пожаловать в супер приложение.", "RU");
    } else {
      speechService.speak("Hello! Welcome to the super learning app.", "EN");
    }
  };

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

      {/* Hero Animated Banner with Direction Switcher */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 via-sky-950/60 to-purple-950/40 p-6 md:p-8 glass-panel border border-sky-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-gradient-to-br from-sky-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/25 flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" /> 🚀 SUPER ILOVA
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                @languageForZubayr_bot
              </span>
              {window.Telegram?.WebApp && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Telegram Mini App Faol
                </span>
              )}
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              12 Bo'limli <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">Super Animatsion Menyu</span>
            </h2>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              O'zbek tili bazasida xalqaro tillarni o'rganing. Telegram Bot bilan to'liq sinxronlashgan portal.
            </p>

            {/* Primary Direction Selector: UZB -> RU & UZB -> EN */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                O'rganish yo'nalishi:
              </span>
              <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-2xl border border-slate-700/80 shadow-inner">
                <button
                  onClick={() => switchDirection('UZ_TO_RU')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                    selectedDirection === 'UZ_TO_RU'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/40 scale-105'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-sm">🇺🇿 ➔ 🇷🇺</span>
                  <span>O'zbekcha ➔ Ruscha</span>
                </button>
                <button
                  onClick={() => switchDirection('UZ_TO_EN')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                    selectedDirection === 'UZ_TO_EN'
                      ? 'bg-gradient-to-r from-sky-500 to-emerald-600 text-white shadow-lg shadow-sky-500/40 scale-105'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-sm">🇺🇿 ➔ 🇬🇧</span>
                  <span>O'zbekcha ➔ Inglizcha</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={playVoiceSample}
              className="px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-sky-400 border border-slate-700 text-xs font-bold transition flex items-center gap-2 shadow-md active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>Ovoz namunasi ({selectedDirection === 'UZ_TO_RU' ? 'RU' : 'EN'})</span>
            </button>

            <button
              onClick={() => handleCardClick('CONTINUE')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-sm font-black shadow-xl shadow-sky-500/30 transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>To'xtagan joydan davom etish</span>
            </button>
          </div>
        </div>
      </div>

      {/* 12 SUPER ANIMATED CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {/* 1. 📚 Bugun o'rganish (20 so'z) */}
        <div
          onClick={() => handleCardClick('LEARN_TODAY')}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-sky-950/40 to-slate-900/80 border border-slate-800 hover:border-sky-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-2xl shadow-lg shadow-sky-500/20 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
              📚
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Kunlik 20 so'z
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition">
            1. Bugungi dars
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            {selectedDirection === 'UZ_TO_RU' ? "O'zbekcha ➔ Ruscha 20 ta yangi so'z va dialoglar." : "O'zbekcha ➔ Inglizcha 20 ta yangi so'z va dialoglar."}
          </p>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-2">
            <div className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full w-3/5 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-1">
            <span>Progress: 12 / 20 so'z</span>
            <span className="text-sky-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
              Boshlash ➔
            </span>
          </div>
        </div>

        {/* 2. 🎯 To'xtagan joydan davom etish */}
        <div
          onClick={() => handleCardClick('CONTINUE')}
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
            2. Davom ettirish
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Noldan boshlamaydi! Aynan qayerda to'xtagan bo'lsangiz o'sha so'zdan boshlanadi.
          </p>
          <div className="p-2.5 rounded-xl bg-indigo-950/50 border border-indigo-500/20 text-xs font-mono text-indigo-300 flex items-center justify-between">
            <span>To'xtash nuqtasi:</span>
            <span className="text-white font-bold">#{user?.currentWordIndex || 1}-so'z</span>
          </div>
        </div>

        {/* 3. 🗂️ 5 ta Mavzuli Modul */}
        <div
          onClick={() => handleCardClick('TOPICS')}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-emerald-950/40 to-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
              🗂️
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              5 ta Modul
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
            3. Mavzular
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            5 ta asosiy hayotiy mavzu: Oila, Ish, Sayohat, Taom va Salomatlik.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 overflow-x-auto py-1">
            <span className="px-2 py-0.5 rounded-lg bg-slate-800">👨‍👩‍👧 Oila</span>
            <span className="px-2 py-0.5 rounded-lg bg-slate-800">💼 Ish</span>
            <span className="px-2 py-0.5 rounded-lg bg-slate-800">✈️ Sayohat</span>
          </div>
        </div>

        {/* 4. 🎮 Xotira o'yinlari */}
        <div
          onClick={() => handleCardClick('GAMES')}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-fuchsia-950/40 to-slate-900/80 border border-slate-800 hover:border-fuchsia-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30 flex items-center justify-center text-2xl shadow-lg shadow-fuchsia-500/20 group-hover:scale-110 group-hover:-rotate-3 transition duration-300">
              🎮
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
              5 Rejim
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-fuchsia-300 transition">
            4. Xotira O'yinlari
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Flashcard moslash, 3 soniyali chaqiruv, Eshitib topish va Bo'sh joyni to'ldirish.
          </p>
          <div className="flex items-center justify-between text-xs text-fuchsia-400 font-semibold pt-1">
            <span>O'yinni boshlash</span>
            <span className="group-hover:translate-x-1 transition font-bold">🎮 Kirish</span>
          </div>
        </div>

        {/* 5. 🔊 Audio Lug'at & Tabiiy Talaffuz */}
        <div
          onClick={() => handleCardClick('AUDIO_LIB')}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-cyan-950/40 to-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
              🔊
            </div>
            {/* Equalizer Audio Waves Animation */}
            <div className="flex items-end gap-1 h-6">
              <span className="w-1 bg-cyan-400 rounded-full animate-bounce" style={{ height: '18px' }} />
              <span className="w-1 bg-cyan-400 rounded-full animate-bounce" style={{ height: '24px', animationDelay: '0.15s' }} />
              <span className="w-1 bg-cyan-400 rounded-full animate-bounce" style={{ height: '14px', animationDelay: '0.3s' }} />
              <span className="w-1 bg-cyan-400 rounded-full animate-bounce" style={{ height: '20px', animationDelay: '0.2s' }} />
            </div>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
            5. Audio Lug'at
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Barcha 100 ta so'z va dialoglar tiniq inson talaffuzida audio bilan ta'minlangan.
          </p>
          <div className="text-xs text-cyan-400 font-bold flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 fill-cyan-400" /> Lug'atni ochish
          </div>
        </div>

        {/* 6. 📊 O'rganilgan So'zlar Hisobi */}
        <div
          onClick={() => handleCardClick('PROGRESS')}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-violet-950/40 to-slate-900/80 border border-slate-800 hover:border-violet-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/20 text-violet-400 border border-violet-500/30 flex items-center justify-center text-2xl shadow-lg shadow-violet-500/20 group-hover:scale-110 group-hover:-rotate-3 transition duration-300">
              📊
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">
              Jonli Hisob
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition">
            6. Mening natijam
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            O'rganilgan so'zlar soni real vaqtda yangilanadi.
          </p>
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700/60">
              <div className="text-[10px] text-slate-400">Ruscha (RU)</div>
              <div className="font-black text-blue-400 text-base">{user?.wordsLearnedRu || 65} ta</div>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700/60">
              <div className="text-[10px] text-slate-400">Inglizcha (EN)</div>
              <div className="font-black text-sky-400 text-base">{user?.wordsLearnedEn || 98} ta</div>
            </div>
          </div>
        </div>

        {/* 7. 🌐 Yo'nalishni o'zgartirish (UZB -> RU / UZB -> EN) */}
        <div
          onClick={() => switchDirection(selectedDirection === 'UZ_TO_RU' ? 'UZ_TO_EN' : 'UZ_TO_RU')}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-blue-950/40 to-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
              🌐
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {selectedDirection === 'UZ_TO_RU' ? 'UZB ➔ RU' : 'UZB ➔ EN'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition">
            7. Yo'nalishni almashtirish
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            O'zbekcha ➔ Ruscha yoki O'zbekcha ➔ Inglizcha yo'nalishiga bir bosishda o'ting.
          </p>
          <div className="flex items-center justify-between text-xs pt-1 font-bold">
            <span className={`px-3 py-1.5 rounded-xl border ${selectedDirection === 'UZ_TO_RU' ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
              🇺🇿 ➔ 🇷🇺 Ruscha
            </span>
            <span className={`px-3 py-1.5 rounded-xl border ${selectedDirection === 'UZ_TO_EN' ? 'bg-sky-600 text-white border-sky-400' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
              🇺🇿 ➔ 🇬🇧 Inglizcha
            </span>
          </div>
        </div>

        {/* 8. 🔥 Ketma-ket kunlar (Streak) */}
        <div
          onClick={() => handleCardClick('MY_STREAK')}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-amber-950/40 to-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20 animate-bounce">
              🔥
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {streak} Kunlik Streak
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
            8. Kunlik Seriya
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            O'rganishni uzmaslik uchun psixologik motivatsiya va himoya qalqoni.
          </p>
          <div className="flex items-center justify-between text-xs text-amber-400 font-bold pt-1">
            <span>🔥 {streak} kun ketma-ket</span>
            <span className="text-slate-400 font-normal">Rekord: {Math.max(streak, 14)} kun</span>
          </div>
        </div>

        {/* 9. 🏆 Peshqadamlar jadvali */}
        <div
          onClick={() => handleCardClick('LEADERBOARD')}
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
            9. Peshqadamlar
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Eng ko'p so'z o'rgangan faol o'quvchilar reytingi.
          </p>
          <div className="flex items-center justify-between text-xs text-yellow-400 font-semibold pt-1">
            <span>🥇 Azizbek (280 so'z)</span>
            <span className="text-slate-400">🥈 Nodira</span>
          </div>
        </div>

        {/* 10. 🎁 Kunlik Bonus */}
        <div
          onClick={handleClaimBonus}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-rose-950/40 to-slate-900/80 border border-slate-800 hover:border-rose-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-2xl shadow-lg shadow-rose-500/20 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
              🎁
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {bonusClaimed ? 'Olingan' : 'Mavjud'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition">
            10. Kunlik Bonus
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Har kuni bepul tokenlar va qo'shimcha so'z ochish imkoniyati.
          </p>
          <div className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-500/20 text-xs text-rose-300 flex items-center justify-between font-bold">
            <span>💎 Tokenlar: {claimedCount}</span>
            <span>{bonusClaimed ? '✅ +10 Olingan' : 'Olish uchun bosing'}</span>
          </div>
        </div>

        {/* 11. ⚙️ Sozlamalar */}
        <div
          onClick={() => handleCardClick('SETTINGS')}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-slate-800/40 to-slate-900/80 border border-slate-800 hover:border-slate-600 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-700/30 text-slate-300 border border-slate-700/50 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition duration-300">
              ⚙️
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
              09:00 Eslatma
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-slate-200 transition">
            11. Sozlamalar
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Kunlik 09:00 eslatmasi, ovoz sozlamalari va o'rganish me'yori.
          </p>
          <div className="text-xs text-slate-400 font-semibold pt-1 flex items-center justify-between">
            <span>Eslatmalar: Yoqilgan</span>
            <span className="text-sky-400 font-bold">Boshqarish ➔</span>
          </div>
        </div>

        {/* 12. ❓ Yordam va Qo'llanma */}
        <div
          onClick={() => handleCardClick('HELP')}
          className="group super-card-glow cursor-pointer rounded-3xl glass-panel p-6 bg-gradient-to-br from-slate-900/90 via-teal-950/40 to-slate-900/80 border border-slate-800 hover:border-teal-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center text-2xl shadow-lg shadow-teal-500/20 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
              ❓
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
              Qo'llanma
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition">
            12. Yordam
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            Bot va Super Ilova imkoniyatlaridan to'liq foydalanish sirlari.
          </p>
          <div className="text-xs text-teal-400 font-bold pt-1 flex items-center justify-between">
            <span>Savol-javoblar</span>
            <span className="group-hover:translate-x-1 transition">Ko'rish ➔</span>
          </div>
        </div>

      </div>
    </div>
  );
}
