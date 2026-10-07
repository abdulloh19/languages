import React from 'react';
import { BookOpen, BookMarked, Mic, Users, User } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function TilsevarBottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'lessons', label: 'Darslar', icon: BookOpen },
    { id: 'stories', label: 'Hikoyalar', icon: BookMarked },
    { id: 'practice', label: 'Amaliyot', icon: Mic },
    { id: 'partner', label: 'Sherik', icon: Users },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  const handleTabClick = (id) => {
    speechService.playTapSound();
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
    onTabChange(id);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 max-w-md mx-auto sm:max-w-2xl pb-safe">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 py-1 px-1 rounded-2xl flex flex-col items-center gap-1 transition relative ${
                isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition ${
                  isActive ? 'bg-amber-500/15 text-amber-400 scale-110 shadow-sm' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] leading-tight font-medium tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-amber-400 absolute bottom-0" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
