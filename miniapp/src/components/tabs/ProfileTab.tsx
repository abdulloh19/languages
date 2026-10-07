'use client';

import React from 'react';
import { 
  User as UserIcon, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  TrendingUp, 
  Award,
  Layers,
  BookOpen,
  Send
} from 'lucide-react';
import { User, ProfileStats, Language, Level } from '../../types';
import { updateUserPreferences } from '../../lib/api';

interface ProfileTabProps {
  user: User | null;
  stats: ProfileStats | null;
  onRefreshUser: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ user, stats, onRefreshUser }) => {
  const handleLanguageChange = async (newLang: Language) => {
    try {
      await updateUserPreferences(newLang);
      onRefreshUser();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLevelChange = async (newLevel: Level) => {
    try {
      await updateUserPreferences(undefined, newLevel);
      onRefreshUser();
    } catch (e) {
      console.error(e);
    }
  };

  const currentLevel = user?.current_level || 'BEGINNER';
  const targetLang = user?.target_lang || 'en';

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* Profile Card */}
      <div className="glass-card rounded-2xl p-5 shadow-lg space-y-4 border border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center space-x-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-indigo-500/30">
            {user?.first_name ? user.first_name[0].toUpperCase() : 'T'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                {user?.first_name || 'Foydalanuvchi'}
              </h2>
              {user?.is_demo && (
                <span className="text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 px-1.5 py-0.5 rounded-full">
                  Demo rejim
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user?.username ? `@${user.username}` : 'Tilsevar o‘quvchisi'}
            </p>
          </div>
        </div>

        {/* Quick Badges */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50 flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-orange-500" />
            </div>
            <div>
              <span className="text-sm font-black text-orange-600 dark:text-orange-400 block">
                {user?.streak_days || 1} kun
              </span>
              <span className="text-[10px] text-slate-500">Ketma-ket streak</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-black text-amber-600 dark:text-amber-400 block">
                {user?.xp || 0} XP
              </span>
              <span className="text-[10px] text-slate-500">To‘plangan tajriba</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Language Preference */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
          <Globe className="w-4 h-4 text-indigo-500" />
          <span>O‘rganilayotgan til</span>
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`p-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition ${
              targetLang === 'en'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'glass-card text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>🇬🇧 English</span>
          </button>
          <button
            onClick={() => handleLanguageChange('ru')}
            className={`p-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition ${
              targetLang === 'ru'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'glass-card text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>🇷🇺 Русский</span>
          </button>
        </div>
      </div>

      {/* Level Preference */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
          <Award className="w-4 h-4 text-indigo-500" />
          <span>Bilim darajangiz</span>
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'BEGINNER', label: 'Boshlang‘ich (A1)' },
            { id: 'INTERMEDIATE', label: 'O‘rta (B1)' },
            { id: 'ADVANCED', label: 'Yuqori (C1)' },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => handleLevelChange(l.id as Level)}
              className={`p-2.5 rounded-xl font-bold text-[11px] text-center transition ${
                currentLevel === l.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'glass-card text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Separate Language Statistics */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-600 dark:text-slate-300">
          Alohida til natijalari
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold block mb-1">🇬🇧 Ingliz tili</span>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
              {stats?.en_learned || 0} ta
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5">yodlangan so‘zlar</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold block mb-1">🇷🇺 Rus tili</span>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
              {stats?.ru_learned || 0} ta
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5">yodlangan so‘zlar</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold">💬 Yakunlangan Jonli Dialoglar:</span>
          <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
            {stats?.completed_dialogues_count || 0} ta
          </span>
        </div>
      </div>

      {/* Telegram Link Banner */}
      {user?.is_demo && (
        <div className="glass-card rounded-2xl p-4 border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/30 space-y-2">
          <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-300 font-bold text-xs">
            <Send className="w-4 h-4" />
            <span>Telegram Bot orqali to‘liq sinxronlash</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Hozir demo rejimidasiz. Natijalaringiz, streak va XP saqlanib qolishi uchun botimizdan foydalaning.
          </p>
          <a
            href="https://t.me/Tilsevar_bot"
            target="_blank"
            rel="noreferrer"
            className="inline-block py-2 px-3 rounded-xl bg-indigo-600 text-white font-bold text-xs"
          >
            @Tilsevar_bot ga o‘tish
          </a>
        </div>
      )}
    </div>
  );
};
