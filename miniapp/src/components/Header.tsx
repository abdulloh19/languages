'use client';

import React from 'react';
import { Flame, Sparkles, Moon, Sun, Globe } from 'lucide-react';
import { User, Language } from '../types';

interface HeaderProps {
  user: User | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  darkMode,
  onToggleDarkMode,
  onToggleLanguage,
}) => {
  const currentLang = user?.target_lang || 'en';

  const nextLang = currentLang === 'en' ? 'ru' : 'en';

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b px-4 py-3 flex items-center justify-between transition-colors">
      <div className="flex items-center space-x-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-black text-lg">
          T
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-base tracking-tight">Tilsevar</span>
            {user?.is_demo && (
              <span className="text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-full">
                Demo
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {user?.first_name || 'Xush kelibsiz'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Language switch button */}
        <button
          onClick={() => onToggleLanguage(nextLang)}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition"
          title="Tilni almashtirish"
        >
          <Globe className="w-3.5 h-3.5 text-indigo-500" />
          <span>{currentLang === 'en' ? '🇬🇧 EN' : '🇷🇺 RU'}</span>
        </button>

        {/* Streak indicator */}
        <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50 text-orange-600 dark:text-orange-400 text-xs font-bold">
          <Flame className="w-3.5 h-3.5 fill-orange-500" />
          <span>{user?.streak_days || 1}</span>
        </div>

        {/* XP badge */}
        <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-600 dark:text-amber-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{user?.xp || 0}</span>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 transition"
          aria-label="Rejimni o'zgartirish"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>
      </div>
    </header>
  );
};
