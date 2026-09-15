import React, { useState } from 'react';
import { Search, Flame, Send, RotateCcw, Bot, BookOpen, Volume2 } from 'lucide-react';

export default function UserTable({
  users,
  searchQuery,
  setSearchQuery,
  onOpenNudge,
  onResetProgress,
  onSelectUserForBot,
  onOpenAudio
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const filteredUsers = users.filter(u => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (u.firstName && u.firstName.toLowerCase().includes(q)) ||
      (u.username && u.username.toLowerCase().includes(q)) ||
      (u.telegramId && u.telegramId.toString().includes(q)) ||
      (u.currentTopicTitle && u.currentTopicTitle.toLowerCase().includes(q))
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="rounded-2xl glass-panel border border-slate-800 shadow-xl overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search learners by name, username..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-700/70 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
          />
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing <span className="text-white font-semibold">{paginatedUsers.length}</span> of <span className="text-white font-semibold">{filteredUsers.length}</span> learners
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/60 text-slate-400 text-xs uppercase font-semibold tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Learner</th>
              <th className="py-3 px-4">Status & Inactive</th>
              <th className="py-3 px-4">Target Lang</th>
              <th className="py-3 px-4">Words (RU / EN / UZ)</th>
              <th className="py-3 px-4">Current Topic</th>
              <th className="py-3 px-4">Resume Point</th>
              <th className="py-3 px-4">Streak</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-slate-500">
                  No learners found matching your criteria.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => {
                const isInactive = user.status === 'INACTIVE' || user.daysInactive > 0;
                return (
                  <tr key={user.id} className="hover:bg-slate-800/40 transition">
                    {/* Learner Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                          {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{user.firstName || 'Learner'}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-1.5">
                            <span>@{user.username || 'user'}</span>
                            <span className="text-slate-600">•</span>
                            <span className="font-mono text-[11px] text-slate-500">ID: {user.telegramId}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      {isInactive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          Inactive ({user.daysInactive}d ago)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Active Today
                        </span>
                      )}
                    </td>

                    {/* Target Lang */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-slate-800 text-sky-400 border border-slate-700">
                        {user.targetLanguage === 'RU' ? '🇷🇺 RU' : user.targetLanguage === 'UZ' ? '🇺🇿 UZ' : '🇬🇧 EN'}
                      </span>
                    </td>

                    {/* Words Breakdown */}
                    <td className="py-3 px-4">
                      <div className="text-xs space-y-0.5">
                        <div className="font-medium text-white">
                          Total: <span className="text-sky-400 font-bold">{user.totalWords}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          🇷🇺 {user.wordsRu} | 🇬🇧 {user.wordsEn} | 🇺🇿 {user.wordsUz}
                        </div>
                      </div>
                    </td>

                    {/* Topic */}
                    <td className="py-3 px-4">
                      <div className="text-xs font-medium text-slate-200">
                        {user.currentTopicTitle}
                      </div>
                    </td>

                    {/* Resume Point */}
                    <td className="py-3 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-indigo-950/40 text-indigo-300 border border-indigo-800/40">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Word #{user.currentWordIndex}: <strong>{user.resumePointWord}</strong></span>
                      </div>
                    </td>

                    {/* Streak */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                        <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span>{user.streakDays}d</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Send Nudge */}
                        <button
                          onClick={() => onOpenNudge(user)}
                          title="Send Psychological Nudge"
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition flex items-center gap-1 text-xs font-medium"
                        >
                          <Send className="w-3.5 h-3.5" /> Nudge
                        </button>

                        {/* Test in Bot Simulator */}
                        <button
                          onClick={() => onSelectUserForBot(user)}
                          title="Launch in Bot Simulator"
                          className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition flex items-center gap-1 text-xs font-medium"
                        >
                          <Bot className="w-3.5 h-3.5" /> Test Bot
                        </button>

                        {/* Reset */}
                        <button
                          onClick={() => onResetProgress(user.id)}
                          title="Reset Progress"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div>
          Page <span className="font-semibold text-white">{currentPage}</span> of <span className="font-semibold text-white">{totalPages}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
