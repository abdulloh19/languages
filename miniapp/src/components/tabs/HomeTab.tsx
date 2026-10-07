'use client';

import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Flame, 
  Gamepad2, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { User, Tab, ProfileStats } from '../../types';

interface HomeTabProps {
  user: User | null;
  stats: ProfileStats | null;
  onNavigateTab: (tab: Tab) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ user, stats, onNavigateTab }) => {
  const currentLangLabel = user?.target_lang === 'en' ? 'Ingliz tili 🇬🇧' : 'Rus tili 🇷🇺';
  const levelLabel = {
    BEGINNER: 'Boshlang‘ich (A1-A2)',
    INTERMEDIATE: 'O‘rta (B1-B2)',
    ADVANCED: 'Yuqori (C1)'
  }[user?.current_level || 'BEGINNER'];

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-5 shadow-lg shadow-indigo-500/20">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLangLabel}</span>
            </span>
            <span className="text-xs font-medium text-indigo-100">{levelLabel}</span>
          </div>

          <h2 className="text-xl font-black tracking-tight mb-1">
            Bugun 12 ta yangi so‘z o‘rganamizmi?
          </h2>
          <p className="text-xs text-indigo-100/90 mb-4 max-w-[280px]">
            Mnemotexnika va jonli misollar orqali so‘zlarni bir umrga eslab qoling.
          </p>

          <button
            onClick={() => onNavigateTab('lesson')}
            className="w-full flex items-center justify-center space-x-2 bg-white text-indigo-700 hover:bg-indigo-50 active:scale-98 font-bold py-2.5 px-4 rounded-xl shadow-md transition text-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>Bugungi darsni boshlash</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Quick Statistics Strip */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="glass-card p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-base font-extrabold">{stats?.total_words_learned || 0}</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Yodlangan</span>
        </div>

        <div className="glass-card p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-base font-extrabold">{stats?.total_words_reviewing || 0}</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Takrorlanmoqda</span>
        </div>

        <div className="glass-card p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-1">
            <Flame className="w-4 h-4 fill-orange-500" />
          </div>
          <span className="text-base font-extrabold">{user?.streak_days || 1} kun</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Ketma-ketlik</span>
        </div>
      </div>

      {/* Feature shortcuts */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold tracking-tight">O‘quv bo‘limlari</h3>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer" onClick={() => onNavigateTab('games')}>
            Barchasi
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div
            onClick={() => onNavigateTab('games')}
            className="glass-card p-3.5 rounded-xl flex items-center space-x-3 cursor-pointer hover:border-indigo-400 transition group active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold">6 xil O‘yinlar</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Flashcard, Test, Gap tuzish</p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('dialogues')}
            className="glass-card p-3.5 rounded-xl flex items-center space-x-3 cursor-pointer hover:border-indigo-400 transition group active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold">Jonli Dialoglar</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">8 mavzu, 24 ssenariy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Spaced repetition & Mnemonics Info Card */}
      <div className="glass-card p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 flex items-start space-x-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
          <BrainCircuit className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
            Tilsevar o‘qitish tamoyili
          </h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            Biz so‘zlarni quruq yodlash o‘rniga <b>o‘xshash o‘zbekcha eshitilish</b> (mnemonic hook) va 
            <b>qisqa hayotiy hikoyalar</b> orqali o‘rgatamiz. SM-2 algoritmi esa esingizdan chiqmasdan oldin takrorlatadi.
          </p>
        </div>
      </div>
    </div>
  );
};
