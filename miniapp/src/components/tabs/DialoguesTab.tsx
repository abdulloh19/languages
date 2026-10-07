'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Car, 
  Building2, 
  Utensils, 
  Plane, 
  ShoppingBag, 
  Stethoscope, 
  Landmark, 
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Volume2,
  Globe,
  Sparkles,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Dialogue, User, Language } from '../../types';
import { fetchDialogues, updateDialogueStep, completeDialogue, getTTSAudioUrl, updateUserPreferences } from '../../lib/api';

interface DialoguesTabProps {
  user: User | null;
  onRefreshUser: () => void;
}

export const DialoguesTab: React.FC<DialoguesTabProps> = ({ user, onRefreshUser }) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('TAXI');
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const [currentDialogue, setCurrentDialogue] = useState<Dialogue | null>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const themes: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'TAXI', label: 'Taksi', icon: <Car className="w-4 h-4" /> },
    { id: 'HOTEL', label: 'Mehmonxona', icon: <Building2 className="w-4 h-4" /> },
    { id: 'RESTAURANT', label: 'Restoran', icon: <Utensils className="w-4 h-4" /> },
    { id: 'AIRPORT', label: 'Aeroport', icon: <Plane className="w-4 h-4" /> },
    { id: 'SHOPPING', label: 'Xarid', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'DOCTOR', label: 'Shifokor', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'BANK', label: 'Bank', icon: <Landmark className="w-4 h-4" /> },
    { id: 'MIXED', label: 'Aralash', icon: <Layers className="w-4 h-4" /> },
  ];

  useEffect(() => {
    loadThemeDialogues(selectedTheme);
  }, [selectedTheme, user?.target_lang]);

  const loadThemeDialogues = async (theme: string) => {
    setLoading(true);
    try {
      const data = await fetchDialogues(theme);
      setDialogues(data);
      if (!currentDialogue && data.length > 0) {
        openScenario(data[0]);
      } else if (currentDialogue) {
        const matched = data.find((d) => d.id === currentDialogue.id) || data[0];
        if (matched) openScenario(matched);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openScenario = (d: Dialogue) => {
    setCurrentDialogue(d);
    setCurrentLineIndex(d.current_line_index || 0);
  };

  const playLineAudio = (text: string) => {
    const lang = user?.target_lang || 'en';
    const url = getTTSAudioUrl(text, lang);
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
    } else {
      audioRef.current.src = url;
    }
    audioRef.current.play().catch(console.warn);
  };

  const handleNextLine = () => {
    if (!currentDialogue) return;
    if (currentLineIndex + 1 < currentDialogue.lines.length) {
      const nextIdx = currentLineIndex + 1;
      setCurrentLineIndex(nextIdx);
      updateDialogueStep(currentDialogue.id, nextIdx);
    }
  };

  const handlePrevLine = () => {
    if (!currentDialogue || currentLineIndex <= 0) return;
    const prevIdx = currentLineIndex - 1;
    setCurrentLineIndex(prevIdx);
    updateDialogueStep(currentDialogue.id, prevIdx);
  };

  const handleNextScenarioInTheme = () => {
    if (!currentDialogue) return;
    const currentIdx = dialogues.findIndex((d) => d.id === currentDialogue.id);
    if (currentIdx !== -1 && currentIdx + 1 < dialogues.length) {
      openScenario(dialogues[currentIdx + 1]);
    } else if (dialogues.length > 0) {
      openScenario(dialogues[0]);
    }
  };

  const handlePrevScenarioInTheme = () => {
    if (!currentDialogue) return;
    const currentIdx = dialogues.findIndex((d) => d.id === currentDialogue.id);
    if (currentIdx > 0) {
      openScenario(dialogues[currentIdx - 1]);
    } else if (dialogues.length > 0) {
      openScenario(dialogues[dialogues.length - 1]);
    }
  };

  const handleSwitchLanguage = async () => {
    const nextLang = user?.target_lang === 'en' ? 'ru' : 'en';
    try {
      await updateUserPreferences(nextLang);
      onRefreshUser();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCompleteDialogue = async () => {
    if (!currentDialogue) return;
    const key = `dlg_comp_${currentDialogue.id}_${Date.now()}`;
    try {
      await completeDialogue(currentDialogue.id, key);
      currentDialogue.is_completed = true;
      onRefreshUser();
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch (_) {}
    } catch (e) {
      console.error(e);
    }
  };

  // Touch swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      // Swiped left -> advance
      handleNextLine();
    } else if (diff < -45) {
      // Swiped right -> go back
      handlePrevLine();
    }
    setTouchStartX(null);
  };

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* 8 Themes Selector */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
        {themes.map((th) => {
          const isSelected = selectedTheme === th.id;
          return (
            <button
              key={th.id}
              onClick={() => {
                setSelectedTheme(th.id);
                setCurrentDialogue(null);
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'glass-card text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {th.icon}
              <span>{th.label}</span>
            </button>
          );
        })}
      </div>

      {/* Scenarios within theme */}
      <div className="grid grid-cols-3 gap-2">
        {dialogues.map((d, idx) => {
          const isCurrent = currentDialogue?.id === d.id;
          return (
            <button
              key={d.id}
              onClick={() => openScenario(d)}
              className={`p-2.5 rounded-xl text-left transition border ${
                isCurrent
                  ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 shadow-sm'
                  : 'glass-card border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-indigo-500">Ssenariy {idx + 1}</span>
                {d.is_completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
              </div>
              <h4 className="text-[11px] font-bold truncate">{d.scenario_title}</h4>
            </button>
          );
        })}
      </div>

      {/* Active Dialogue Interactive Player */}
      {currentDialogue && currentDialogue.lines.length > 0 && (
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="glass-card rounded-2xl p-5 shadow-lg space-y-4 border border-slate-200/80 dark:border-slate-800/80 select-none"
        >
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {currentDialogue.theme_title_uz} • {currentDialogue.level}
              </span>
              <span className="text-xs font-bold text-slate-400">
                Jumla {currentLineIndex + 1} / {currentDialogue.lines.length}
              </span>
            </div>
            <h3 className="text-base font-black tracking-tight mt-1">
              {currentDialogue.scenario_title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {currentDialogue.description_uz}
            </p>
            <div className="flex items-center space-x-1.5 mt-2 text-[11px] text-slate-600 dark:text-slate-300">
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              <span>Ishtirokchilar: <b>{currentDialogue.participants}</b></span>
            </div>
          </div>

          {/* Interactive Speech Bubble with Prominent Left & Right Navigation Icons */}
          <div className="flex items-stretch space-x-2">
            {/* Chapga surish / Oldingi jumla Icon */}
            <button
              onClick={handlePrevLine}
              disabled={currentLineIndex === 0}
              className={`w-10 rounded-2xl flex items-center justify-center transition border shrink-0 ${
                currentLineIndex === 0
                  ? 'opacity-25 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400 bg-slate-100/50 dark:bg-slate-900/40'
                  : 'bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:scale-105 active:scale-95 shadow-md shadow-indigo-500/10'
              }`}
              title="Oldingi jumla (chapga surish)"
              aria-label="Oldingi jumla"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Speech Bubble Content */}
            <div className="flex-1 min-w-0">
              {(() => {
                const line = currentDialogue.lines[currentLineIndex];
                const isUser = line.speaker.toLowerCase().includes('siz');
                return (
                  <div className={`p-4 rounded-2xl space-y-3 transition border ${
                    isUser 
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/60' 
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                        isUser ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                      }`}>
                        {line.speaker}
                      </span>
                      <button
                        onClick={() => playLineAudio(line.target_line)}
                        className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm hover:scale-105 transition"
                        title="Jumla audio talaffuzi"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                        "{line.target_line}"
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic font-medium">
                        — {line.uzbek_translation}
                      </p>
                    </div>

                    {/* Key vocabulary pills */}
                    {line.key_vocab && line.key_vocab.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Kalit so‘zlar:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {line.key_vocab.map((v, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-200 shadow-xs border border-slate-200/60 dark:border-slate-700"
                            >
                              <b>{v.word}</b>: {v.meaning}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* O'ngga surish / Keyingi jumla Icon */}
            <button
              onClick={handleNextLine}
              disabled={currentLineIndex + 1 >= currentDialogue.lines.length}
              className={`w-10 rounded-2xl flex items-center justify-center transition border shrink-0 ${
                currentLineIndex + 1 >= currentDialogue.lines.length
                  ? 'opacity-25 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400 bg-slate-100/50 dark:bg-slate-900/40'
                  : 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-md shadow-indigo-500/20'
              }`}
              title="Keyingi jumla (o‘ngga surish)"
              aria-label="Keyingi jumla"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Swipe indicator tip */}
          <div className="text-center">
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
              👈 Chap/o‘ng tugmalar yoki barmog‘ingiz bilan surish (swipe) orqali boshqaring 👉
            </span>
          </div>

          {/* Navigation Bottom Controls */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handlePrevLine}
              disabled={currentLineIndex === 0}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 font-bold text-xs flex items-center justify-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Oldingi jumla</span>
            </button>

            {currentLineIndex + 1 < currentDialogue.lines.length ? (
              <button
                onClick={handleNextLine}
                className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-md shadow-indigo-500/20"
              >
                <span>Keyingi jumla</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCompleteDialogue}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-md shadow-emerald-500/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Yakunlash (+25 XP)</span>
              </button>
            )}
          </div>

          {/* Scenario Switchers within theme */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
            <button
              onClick={handlePrevScenarioInTheme}
              className="flex items-center space-x-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Oldingi ssenariy</span>
            </button>

            <button
              onClick={handleNextScenarioInTheme}
              className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
            >
              <span>Keyingi ssenariy</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex justify-center pt-1">
            <button
              onClick={handleSwitchLanguage}
              className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <span>Tilni almashtirish ({user?.target_lang === 'en' ? 'RU 🇷🇺' : 'EN 🇬🇧'})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
