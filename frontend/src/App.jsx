import React, { useState, useEffect } from 'react';
import { Bot, Users, BookOpen, Volume2, Sparkles, Activity, ShieldCheck, Github, ExternalLink } from 'lucide-react';
import StatsHeader from './components/StatsHeader';
import UserTable from './components/UserTable';
import NudgeModal from './components/NudgeModal';
import BotSimulator from './components/BotSimulator';
import AudioVocabularyViewer from './components/AudioVocabularyViewer';

export default function App() {
  const [summary, setSummary] = useState(null);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('ALL'); // ALL, ACTIVE, INACTIVE
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserForNudge, setSelectedUserForNudge] = useState(null);
  const [simulatorUser, setSimulatorUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'simulator', 'vocabulary'
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = async () => {
    try {
      const [sumRes, usersRes] = await Promise.all([
        fetch('/api/dashboard/summary'),
        fetch(`/api/dashboard/users?status=${filter}&search=${encodeURIComponent(searchQuery)}`)
      ]);

      if (sumRes.ok) {
        const sumData = await sumRes.json();
        setSummary(sumData);
      }
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
        if (!simulatorUser && usersData.length > 0) {
          setSimulatorUser(usersData[0]);
        }
      }
    } catch (e) {
      console.error('Failed to fetch dashboard data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filter, searchQuery]);

  const handleResetProgress = async (userId) => {
    if (!window.confirm('Reset progress for this learner to Word #1?')) return;
    try {
      const res = await fetch(`/api/dashboard/reset/${userId}`, { method: 'POST' });
      if (res.ok) {
        showToast('Learner progress successfully reset to Word #1');
        loadData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLaunchBotForUser = (user) => {
    setSimulatorUser(user);
    setActiveTab('simulator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs animate-in slide-in-from-top duration-300">
          <ShieldCheck className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">
              AG
            </div>
            <div>
              <div className="font-bold text-white text-base tracking-tight flex items-center gap-2">
                Antigravity Language Learning Platform
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                Telegram Bot + 100-User Dashboard & Psychological Nudge Engine
              </div>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" /> 100 Learners
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4" /> Bot Simulator
            </button>
            <button
              onClick={() => setActiveTab('vocabulary')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'vocabulary'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Volume2 className="w-4 h-4" /> Audio & Topics
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://github.com/abdulloh19/languages.git"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition"
            >
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-200">
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
              onResetProgress={handleResetProgress}
              onSelectUserForBot={handleLaunchBotForUser}
            />
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="animate-in fade-in duration-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-sky-400" />
                  Live Telegram Bot Simulator
                </h2>
                <p className="text-xs text-slate-400">
                  Simulating interaction for <strong>{simulatorUser?.firstName}</strong> (@{simulatorUser?.username}) — resume point saved word by word.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
              >
                ← Back to Dashboard
              </button>
            </div>

            <BotSimulator
              activeUser={simulatorUser}
              allUsers={users}
              onUserChange={(u) => setSimulatorUser(u)}
            />
          </div>
        )}

        {activeTab === 'vocabulary' && (
          <div className="animate-in fade-in duration-200 space-y-4">
            <AudioVocabularyViewer topics={summary?.topics} />
          </div>
        )}
      </main>

      {/* Psychological Nudge Modal */}
      {selectedUserForNudge && (
        <NudgeModal
          user={selectedUserForNudge}
          onClose={() => setSelectedUserForNudge(null)}
          onNudgeSent={() => {
            showToast(`Psychological push sent to @${selectedUserForNudge.username}!`);
            loadData();
          }}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <div>
            Built with Spring Boot 3.3.4, Telegram Long Polling, PostgreSQL & React + Tailwind
          </div>
          <div className="flex items-center gap-4">
            <span>Daily 09:00 Cron Active</span>
            <span>•</span>
            <span>Resume-from-Last-Word Enabled</span>
            <span>•</span>
            <span>WaveNet TTS Synthesizer</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
