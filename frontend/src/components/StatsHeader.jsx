import React from 'react';
import { Users, UserCheck, UserX, BookOpen, Flame, Sparkles } from 'lucide-react';

export default function StatsHeader({ summary, filter, setFilter }) {
  if (!summary) return null;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-900/60 via-indigo-900/40 to-slate-900/80 p-6 glass-panel border border-sky-500/20 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                Haqiqiy Foydalanuvchilar Hubi
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 24/7 Engine Live
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              AI Language Learning Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">UZ ↔ EN ↔ RU</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Real-time analytics for genuine learners, automated 09:00 psychological re-entry pushes, 12-section Telegram Super Menu, and adaptive audio pronunciation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetch('/api/dashboard/summary').then(() => window.location.reload());
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-sm font-medium border border-slate-700 transition flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-sky-400" /> Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Users */}
        <div 
          onClick={() => setFilter('ALL')}
          className={`cursor-pointer p-4 rounded-xl glass-panel glass-panel-hover transition border ${
            filter === 'ALL' ? 'border-sky-500 bg-sky-950/40 ring-1 ring-sky-500' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Learners</span>
            <Users className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white">{summary.totalUsers}</div>
          <div className="text-xs text-slate-400 mt-1">Real Telegram profiles</div>
        </div>

        {/* Active Today */}
        <div 
          onClick={() => setFilter('ACTIVE')}
          className={`cursor-pointer p-4 rounded-xl glass-panel glass-panel-hover transition border ${
            filter === 'ACTIVE' ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Active Users
            </span>
            <UserCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{summary.activeUsers}</div>
          <div className="text-xs text-emerald-400/80 mt-1">Logged in today (&lt;24h)</div>
        </div>

        {/* Inactive */}
        <div 
          onClick={() => setFilter('INACTIVE')}
          className={`cursor-pointer p-4 rounded-xl glass-panel glass-panel-hover transition border ${
            filter === 'INACTIVE' ? 'border-rose-500 bg-rose-950/40 ring-1 ring-rose-500' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Inactive Users</span>
            <UserX className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400">{summary.inactiveUsers}</div>
          <div className="text-xs text-rose-400/80 mt-1">Targeted for 09:00 Nudge</div>
        </div>

        {/* Words Memorized */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800">
          <div className="flex items-center justify-between text-indigo-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Words Memorized</span>
            <BookOpen className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">{summary.totalWordsLearned.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">Tracked across RU / EN / UZ</div>
        </div>

        {/* Avg Streak */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Streak</span>
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">{summary.averageStreak.toFixed(1)} <span className="text-sm font-normal text-slate-400">days</span></div>
          <div className="text-xs text-slate-400 mt-1">Fogg momentum index</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'ALL'
              ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          All Learners ({summary.totalUsers})
        </button>
        <button
          onClick={() => setFilter('ACTIVE')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
            filter === 'ACTIVE'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Active Learners ({summary.activeUsers})
        </button>
        <button
          onClick={() => setFilter('INACTIVE')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
            filter === 'INACTIVE'
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          Inactive Learners ({summary.inactiveUsers})
        </button>
      </div>
    </div>
  );
}
