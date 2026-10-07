import React, { useState, useEffect } from 'react';
import {
  Sparkles, Flame, Coins, Globe, Bot, ShieldCheck, X
} from 'lucide-react';
import LessonsView from './components/LessonsView';
import StoriesView from './components/StoriesView';
import PracticeView from './components/PracticeView';
import CommunityPartnerView from './components/CommunityPartnerView';
import ProfileChecklistView from './components/ProfileChecklistView';
import TilsevarBottomNav from './components/TilsevarBottomNav';
import BotSimulator from './components/BotSimulator';
import UserTable from './components/UserTable';
import NudgeModal from './components/NudgeModal';
import WordLearningModal from './components/WordLearningModal';
import { speechService } from './services/speechService';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons', 'stories', 'practice', 'partner', 'profile'
  const [learningMode, setLearningMode] = useState('UZ_TO_EN'); // 'UZ_TO_EN' or 'UZ_TO_RU'
  const [toastMessage, setToastMessage] = useState(null);

  // Modals & Sub-views
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [wordModalOpen, setWordModalOpen] = useState(false);
  const [selectedWordIndex, setSelectedWordIndex] = useState(1);

  // User & Stats state
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    telegramId: 8808898451,
    firstName: 'Zubayr',
    username: 'languageForZubayr_bot',
    currentLevel: 'Starter',
    streakDays: 7,
    xpPoints: 175,
    tokenBalance: 25,
    wordsLearnedEn: 24,
    wordsLearnedRu: 12
  });

  // Admin / simulator state
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserForNudge, setSelectedUserForNudge] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Telegram WebApp Initialization
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (tgUser) {
        setCurrentUser(prev => ({
          ...prev,
          telegramId: tgUser.id,
          firstName: tgUser.first_name || prev.firstName,
          username: tgUser.username || prev.username
        }));
      }
    }
  }, []);

  // Fetch admin users for simulator if needed
  useEffect(() => {
    fetch(`/api/dashboard/users?status=${filter}&search=${encodeURIComponent(searchQuery)}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setUsers(data);
          setCurrentUser(prev => ({ ...prev, ...data[0] }));
        }
      })
      .catch(() => {});
  }, [filter, searchQuery]);

  const handleToggleLearningMode = (newMode) => {
    speechService.playTapSound();
    setLearningMode(newMode);
    showToast(newMode === 'UZ_TO_EN' ? "Yo'nalish: O'zbekcha ➔ Inglizcha" : "Yo'nalish: O'zbekcha ➔ Ruscha");
  };

  const handleOpenWordStudy = (wordIdx = 1) => {
    setSelectedWordIndex(wordIdx);
    setWordModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">

      {/* Floating Toast notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs animate-in slide-in-from-top duration-300">
          <ShieldCheck className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER (Mobile-First TMA App Bar) */}
      <header className="sticky top-0 z-30 bg-[#0b0f19]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Logo & App Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-sm">
              <Sparkles className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm text-white tracking-tight">TILSEVAR</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                  TMA
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium leading-none">
                {currentUser?.firstName || 'O\'quvchi'} • {currentUser?.currentLevel || 'Starter'}
              </div>
            </div>
          </div>

          {/* Right Top Status Items */}
          <div className="flex items-center gap-2">
            {/* Streak flame badge */}
            <div
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-black shadow-sm"
              title="Uzluksiz kunlar"
            >
              <Flame className="w-3.5 h-3.5 fill-orange-400 text-orange-500 animate-pulse" />
              <span>{currentUser?.streakDays || 7}</span>
            </div>

            {/* Token Coins */}
            <div
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold"
              title="Coin balansi"
            >
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentUser?.tokenBalance || 25}</span>
            </div>

            {/* Language Switcher pill */}
            <button
              onClick={() => handleToggleLearningMode(learningMode === 'UZ_TO_EN' ? 'UZ_TO_RU' : 'UZ_TO_EN')}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
              title="Tilni almashtirish"
            >
              <Globe className="w-4 h-4 text-sky-400" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-4 flex flex-col">
        {activeTab === 'lessons' && (
          <LessonsView onOpenWordStudy={handleOpenWordStudy} />
        )}

        {activeTab === 'stories' && (
          <StoriesView />
        )}

        {activeTab === 'practice' && (
          <PracticeView />
        )}

        {activeTab === 'partner' && (
          <CommunityPartnerView />
        )}

        {activeTab === 'profile' && (
          <ProfileChecklistView
            user={currentUser}
            learningMode={learningMode}
            onToggleLearningMode={handleToggleLearningMode}
            onOpenAdminSimulator={() => setAdminModalOpen(true)}
          />
        )}
      </main>

      {/* BOTTOM NAVIGATION BAR */}
      <TilsevarBottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* FLASHCARD WORD STUDY MODAL */}
      {wordModalOpen && (
        <WordLearningModal
          isOpen={wordModalOpen}
          onClose={() => setWordModalOpen(false)}
          dayNumber={1}
          wordIndex={selectedWordIndex}
          learningMode={learningMode}
          user={currentUser}
          onProgressUpdate={() => {
            fetch(`/api/dashboard/users?status=ALL`)
              .then(r => r.json())
              .then(d => d.length > 0 && setCurrentUser(d[0]))
              .catch(() => {});
          }}
        />
      )}

      {/* ADMIN & BOT SIMULATOR MODAL */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-y-auto flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-sky-400" />
                <h2 className="text-base font-black text-white">Telegram Bot Simulyatori & O'quvchilar Boshqaruvi</h2>
              </div>
              <button
                onClick={() => setAdminModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Bot Simulyatori</h3>
                <BotSimulator currentUser={currentUser} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">O'quvchilar Ro'yxati</h3>
                <UserTable
                  users={users}
                  filter={filter}
                  onFilterChange={setFilter}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSelectForNudge={setSelectedUserForNudge}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NUDGE MODAL */}
      {selectedUserForNudge && (
        <NudgeModal
          user={selectedUserForNudge}
          onClose={() => setSelectedUserForNudge(null)}
          onSuccess={() => {
            showToast(`Eslatma @${selectedUserForNudge.username} ga muvaffaqiyatli yetkazildi!`);
          }}
        />
      )}
    </div>
  );
}
