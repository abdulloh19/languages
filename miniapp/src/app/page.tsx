'use client';

import React, { useState, useEffect } from 'react';
import { User, Tab, ProfileStats, Language } from '../types';
import { fetchCurrentUser, fetchProfileStats, updateUserPreferences } from '../lib/api';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { HomeTab } from '../components/tabs/HomeTab';
import { LessonTab } from '../components/tabs/LessonTab';
import { GrammarTab } from '../components/tabs/GrammarTab';
import { GamesTab } from '../components/tabs/GamesTab';
import { DialoguesTab } from '../components/tabs/DialoguesTab';
import { DictionaryTab } from '../components/tabs/DictionaryTab';
import { ProfileTab } from '../components/tabs/ProfileTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    // 1. Telegram WebApp initialization
    if (typeof window !== 'undefined') {
      const tg = (window as any).Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
        if (tg.colorScheme === 'dark') {
          setDarkMode(true);
        }
      }
    }

    // 2. Load User and Stats
    loadUserData();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const loadUserData = async () => {
    try {
      const u = await fetchCurrentUser();
      setUser(u);
      const st = await fetchProfileStats();
      setStats(st);
    } catch (e) {
      console.warn('Backend connection notice, running in demo fallback:', e);
      // Fallback demo user if backend is not reachable immediately
      setUser({
        id: 0,
        target_lang: 'en',
        current_level: 'BEGINNER',
        xp: 45,
        streak_days: 1,
        longest_streak: 1,
        is_demo: true,
        first_name: 'Mehmon'
      });
    } finally {
      setInitialized(true);
    }
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleToggleLanguage = async (newLang: Language) => {
    try {
      const updated = await updateUserPreferences(newLang);
      setUser(updated);
      const st = await fetchProfileStats();
      setStats(st);
    } catch (e) {
      console.error(e);
      if (user) {
        setUser({ ...user, target_lang: newLang });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Centered responsive container (ideal for 390px mobile up to desktop) */}
      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col relative shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-[#0d131f] min-h-screen">
        <Header
          user={user}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onToggleLanguage={handleToggleLanguage}
        />

        <main className="flex-1 px-4 pt-4 pb-20 overflow-y-auto">
          {activeTab === 'home' && (
            <HomeTab
              user={user}
              stats={stats}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'lesson' && (
            <LessonTab
              user={user}
              onRefreshUser={loadUserData}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'grammar' && (
            <GrammarTab user={user} onRefreshUser={loadUserData} />
          )}

          {activeTab === 'games' && (
            <GamesTab
              user={user}
              onRefreshUser={loadUserData}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'dialogues' && (
            <DialoguesTab
              user={user}
              onRefreshUser={loadUserData}
            />
          )}

          {activeTab === 'dictionary' && (
            <DictionaryTab
              user={user}
              onRefreshUser={loadUserData}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileTab
              user={user}
              stats={stats}
              onRefreshUser={loadUserData}
            />
          )}
        </main>

        <Navbar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />
      </div>
    </div>
  );
}
