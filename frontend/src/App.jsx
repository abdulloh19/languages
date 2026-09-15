import React, { useState, useEffect } from 'react';
import {
  Sparkles, BookOpen, Volume2, Users, Bot, Flame, Award,
  CheckCircle2, ChevronRight, Play, Globe, ShieldCheck, Zap
} from 'lucide-react';
import SuperAnimatedMenu from './components/SuperAnimatedMenu';
import WordLearningModal from './components/WordLearningModal';
import LevelSelectorModal from './components/LevelSelectorModal';
import AudioVocabularyViewer from './components/AudioVocabularyViewer';
import StatsHeader from './components/StatsHeader';
import UserTable from './components/UserTable';
import NudgeModal from './components/NudgeModal';
import BotSimulator from './components/BotSimulator';
import { TOPIC_MODULES, CURRICULUM_DAYS } from './data/curriculum20Days';
import { speechService } from './services/speechService';

export default function App() {
  // App state
  const [learningMode, setLearningMode] = useState('UZ_TO_RU'); // 'UZ_TO_RU' or 'UZ_TO_EN'
  const [currentLevel, setCurrentLevel] = useState('A1'); // 'A1', 'A2', 'B1', 'B2'
  const [activeDay, setActiveDay] = useState(1); // 1 to 20
  const [activeWordIndex, setActiveWordIndex] = useState(1); // 1 to 20
  
  // Modals state
  const [studyModalOpen, setStudyModalOpen] = useState(false);
  const [levelModalOpen, setLevelModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('learn'); // 'learn', 'audio', 'menu', 'admin'
  const [toastMessage, setToastMessage] = useState(null);

  // Backend sync state
  const [summary, setSummary] = useState(null);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserForNudge, setSelectedUserForNudge] = useState(null);
  const [simulatorUser, setSimulatorUser] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load backend data
  useEffect(() => {
    fetch('/api/dashboard/summary')
      .then(r => r.json())
      .then(d => setSummary(d))
      .catch(() => {});

    fetch(`/api/dashboard/users?status=${filter}&search=${encodeURIComponent(searchQuery)}`)
      .then(r => r.json())
      .then(data => {
        setUsers(data);
        if (data.length > 0 && !simulatorUser) {
          setSimulatorUser(data[0]);
        }
      })
      .catch(() => {});
  }, [filter, searchQuery]);

  const handleStartLesson = (dayNum = 1, wordIdx = 1) => {
    speechService.playTapSound();
    setActiveDay(dayNum);
    setActiveWordIndex(wordIdx);
    setStudyModalOpen(true);
  };

  const handleToggleLearningMode = (newMode) => {
    speechService.playTapSound();
    setLearningMode(newMode);
    showToast(newMode === 'UZ_TO_RU' ? "Yo'nalish: O'zbekcha ➔ Ruscha tanlandi" : "Yo'nalish: O'zbekcha ➔ Inglizcha tanlandi");
  };

  const handleMenuAction = (actionKey) => {
    if (actionKey === 'LEARN_TODAY' || actionKey === 'CONTINUE') {
      handleStartLesson(activeDay, activeWordIndex);
    } else if (actionKey === 'CHANGE_LANG') {
      handleToggleLearningMode(learningMode === 'UZ_TO_RU' ? 'UZ_TO_EN' : 'UZ_TO_RU');
    } else if (actionKey === 'AUDIO_LIB') {
      setActiveTab('audio');
    } else {
      showToast(`Tanlandi: ${actionKey}`);
    }
  };

  const streakDays = simulatorUser?.streakDays || 7;
  const tokenCount = simulatorUser?.tokenBalance || 25;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Toast message */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs animate-in slide-in-from-top duration-300">
          <ShieldCheck className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP RESPONSIVE APP BAR (Clean, Modern, No Overlap) */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Level Pill */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-black text-white shadow-md shadow-sky-500/25">
              AG
            </div>
            <div>
              <div className="font-extrabold text-white text-sm sm:text-base tracking-tight flex items-center gap-1.5">
                <span>Super Ilova</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-[10px] text-slate-400 font-medium hidden sm:block">
                O'zbekcha ➔ Ruscha / Inglizcha platforma
              </div>
            </div>

            {/* CEFR Level Selector Pill */}
            <button
              onClick={() => setLevelModalOpen(true)}
              className="ml-1 sm:ml-2 px-2.5 py-1 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-black text-amber-300 flex items-center gap-1 transition active:scale-95 shadow-sm"
              title="Darajani almashtirish"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentLevel}</span>
            </button>
          </div>

          {/* Stats & Direction Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak & Tokens */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded-xl border border-slate-800 text-xs font-bold">
              <span className="text-amber-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-400" /> {streakDays}d
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-sky-400">💎 {tokenCount}</span>
            </div>

            {/* Language Direction Toggle */}
            <div className="flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-800">
              <button
                onClick={() => handleToggleLearningMode('UZ_TO_RU')}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition ${
                  learningMode === 'UZ_TO_RU'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇷🇺 RU
              </button>
              <button
                onClick={() => handleToggleLearningMode('UZ_TO_EN')}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition ${
                  learningMode === 'UZ_TO_EN'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Clean Tab Navigation */}
        <div className="max-w-6xl mx-auto px-3 sm:px-6 flex items-center gap-2 pb-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'learn'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> 20 Kunlik Darslar
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'audio'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" /> Audio Lug'at
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'menu'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> 12 Portal
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Admin Panel
          </button>
        </div>
      </header>

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-6 flex-1 w-full space-y-8">
        
        {/* TAB 1: 20 KUNLIK O'QUV DASTURI (Primary Duolingo/Busuu experience) */}
        {activeTab === 'learn' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* HERO STUDY CARD (Single click to open study modal with auto-voice) */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 via-sky-950/50 to-purple-950/40 p-6 sm:p-8 border border-sky-500/30 shadow-2xl">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Kun {activeDay} • 20 Kunlik Reja
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300">
                      Daraja: {currentLevel}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                    {learningMode === 'UZ_TO_RU' ? "O'zbekcha ➔ Ruscha" : "O'zbekcha ➔ Inglizcha"} O'rganish
                  </h1>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Har bir yangi so'zga o'tganingizda ovoz <strong>avtomatik tarzda</strong> yangraydi. O'rganish to'g'ridan-to'g'ri maxsus interaktiv modalda amalga oshiriladi.
                  </p>
                </div>

                {/* Big Action Button -> Opens WordLearningModal */}
                <button
                  onClick={() => handleStartLesson(activeDay, activeWordIndex)}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-base shadow-xl shadow-sky-500/30 transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 group whitespace-nowrap"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Darsni Boshlash (Modal)</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>

            {/* 20-DAY THEMATIC ROADMAP GRID */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-sky-400" />
                    20 Kunlik O'quv Xaritasi
                  </h2>
                  <p className="text-xs text-slate-400">
                    5 ta asosiy hayotiy mavzuga bog'langan kunlik so'zlar va jonli dialoglar
                  </p>
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-6">
                {TOPIC_MODULES.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{topic.icon}</span>
                        <div>
                          <h3 className="text-base font-black text-white">
                            {topic.titleUz} <span className="text-xs font-normal text-slate-400">({topic.titleRu} / {topic.titleEn})</span>
                          </h3>
                          <span className="text-[11px] text-sky-400 font-semibold">
                            Kunlar: {topic.days.join(', ')}-kunlar
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Day Cards inside this module */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                      {topic.days.map((dayNum) => {
                        const dayInfo = CURRICULUM_DAYS[dayNum];
                        const isActive = activeDay === dayNum;

                        return (
                          <div
                            key={dayNum}
                            onClick={() => handleStartLesson(dayNum, 1)}
                            className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 group ${
                              isActive
                                ? 'bg-sky-950/40 border-sky-500 shadow-md shadow-sky-500/20'
                                : 'bg-slate-900/90 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="px-2.5 py-0.5 rounded-lg text-xs font-extrabold bg-slate-800 text-sky-300">
                                {dayNum}-Kun
                              </span>
                              <span className="text-xs font-bold text-slate-400 group-hover:text-sky-400 transition flex items-center gap-1">
                                O'rganish ➔
                              </span>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-sky-300 transition">
                                {dayInfo?.topicTitleUz || `Mavzu darsi`}
                              </div>
                              <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                Dialog: {dayInfo?.dialogue?.titleUz || 'Mavzuli suhbat'}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: AUDIO LUG'AT */}
        {activeTab === 'audio' && (
          <div className="animate-in fade-in duration-200">
            <AudioVocabularyViewer topics={summary?.topics} />
          </div>
        )}

        {/* TAB 3: 12-SECTION SUPER ANIMATED MENU */}
        {activeTab === 'menu' && (
          <div className="animate-in fade-in duration-200">
            <SuperAnimatedMenu
              user={simulatorUser || users[0]}
              onAction={handleMenuAction}
            />
          </div>
        )}

        {/* TAB 4: ADMIN DASHBOARD (Separated cleanly) */}
        {activeTab === 'admin' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Administrator Boshqaruv Paneli</h3>
                <p className="text-xs text-slate-400">100 ta o'quvchi monitoringi va psixologik eslatmalar</p>
              </div>
            </div>

            <StatsHeader
              summary={summary}
              filter={filter}
              setFilter={setFilter}
            />

            <UserTable
              users={users}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenNudge={(u) => setSelectedUserForNudge(u)}
              onResetProgress={(uid) => {}}
              onSelectUserForBot={(u) => { setSimulatorUser(u); }}
            />
          </div>
        )}
      </main>

      {/* 1. DEDICATED INTERACTIVE WORD LEARNING MODAL (With Automatic Voice On Next) */}
      {studyModalOpen && (
        <WordLearningModal
          initialDay={activeDay}
          initialWordIndex={activeWordIndex}
          learningMode={learningMode}
          currentLevel={currentLevel}
          onOpenLevelSelector={() => setLevelModalOpen(true)}
          onClose={() => setStudyModalOpen(false)}
          onProgressUpdate={(d, w) => {
            setActiveDay(d);
            setActiveWordIndex(w);
          }}
        />
      )}

      {/* 2. CEFR LEVEL SELECTOR MODAL (A1, A2, B1, B2) */}
      {levelModalOpen && (
        <LevelSelectorModal
          currentLevel={currentLevel}
          onSelectLevel={(lvl) => {
            setCurrentLevel(lvl);
            showToast(`Daraja muvaffaqiyatli tanlandi: ${lvl}`);
          }}
          onClose={() => setLevelModalOpen(false)}
        />
      )}

      {/* Nudge modal for admin */}
      {selectedUserForNudge && (
        <NudgeModal
          user={selectedUserForNudge}
          onClose={() => setSelectedUserForNudge(null)}
          onNudgeSent={() => {
            showToast(`Eslatma yuborildi!`);
          }}
        />
      )}

      {/* Clean Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>@languageForZubayr_bot • Super Ilova 2026</span>
          <span>Planshet, telefon va kompyuter uchun to'liq moslashgan</span>
        </div>
      </footer>
    </div>
  );
}
