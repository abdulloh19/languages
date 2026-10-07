'use client';

import React from 'react';
import { 
  Home, 
  BookOpen, 
  GraduationCap, 
  Gamepad2, 
  MessageSquare, 
  BookMarked, 
  User as UserIcon 
} from 'lucide-react';
import { Tab } from '../types';

interface NavbarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Bosh sahifa', icon: <Home className="w-5 h-5" /> },
    { id: 'lesson', label: 'Dars', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'grammar', label: 'Grammatika', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'games', label: 'O‘yinlar', icon: <Gamepad2 className="w-5 h-5" /> },
    { id: 'dialogues', label: 'Dialoglar', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'dictionary', label: 'Lug‘at', icon: <BookMarked className="w-5 h-5" /> },
    { id: 'profile', label: 'Profil', icon: <UserIcon className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-card border-t border-slate-200/80 dark:border-slate-800/80 pb-safe transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-between px-1 py-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-0.5 rounded-xl transition-all ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-indigo-50 dark:bg-indigo-950/60' : ''}`}>
                {tab.icon}
              </div>
              <span className="text-[9.5px] mt-0.5 tracking-tight truncate max-w-[48px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
