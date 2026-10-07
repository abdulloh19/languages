import React, { useState, useEffect } from 'react';
import { User, Flame, Award, Coins, CheckCircle2, Circle, Sparkles, Globe, Bot, ShieldCheck, Zap } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function ProfileChecklistView({
  user,
  learningMode,
  onToggleLearningMode,
  onOpenAdminSimulator
}) {
  const [checklist, setChecklist] = useState({
    vocabDone: false,
    storyDone: false,
    speakingDone: false,
    streakClaimed: false
  });
  const [claiming, setClaiming] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  useEffect(() => {
    fetch('/api/checklist/me?userId=1')
      .then(r => r.json())
      .then(d => {
        if (d) setChecklist(d);
      })
      .catch(() => {});
  }, []);

  const handleToggle = (itemKey) => {
    speechService.playTapSound();
    fetch(`/api/checklist/toggle?userId=1&itemKey=${itemKey}`, { method: 'POST' })
      .then(r => r.json())
      .then(d => setChecklist(d))
      .catch(() => {});
  };

  const handleClaimStreak = () => {
    speechService.playSuccessSound?.();
    setClaiming(true);
    fetch('/api/checklist/claim-streak?userId=1', { method: 'POST' })
      .then(r => r.json())
      .then(data => {
        setClaiming(false);
        if (data.success) {
          setChecklist(prev => ({ ...prev, streakClaimed: true }));
          setToastMsg(data.message || "Streak muvaffaqiyatli saqlandi! 🔥");
        } else {
          setToastMsg(data.message);
        }
        setTimeout(() => setToastMsg(null), 3500);
      })
      .catch(() => setClaiming(false));
  };

  const allCompleted = checklist.vocabDone && checklist.storyDone && checklist.speakingDone;

  return (
    <div className="flex flex-col gap-5 pb-24">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs animate-in slide-in-from-top duration-300">
          <ShieldCheck className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col gap-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              {user?.firstName?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-base font-black text-white">{user?.firstName || 'Zubayr'}</h2>
              <span className="text-xs text-slate-400 font-medium">@{user?.username || 'learner'}</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  {user?.currentLevel || 'Starter'}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {user?.xpPoints || 150} XP
                </span>
              </div>
            </div>
          </div>

          {/* Streak indicator */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 font-black text-sm">
              <Flame className="w-4 h-4 fill-orange-400 text-orange-500 animate-bounce" />
              <span>{user?.streakDays || 7} kun</span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold">Uzluksiz o'rganish</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/80">
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center">
            <div className="text-[10px] text-slate-400 font-medium">Lug'at</div>
            <div className="text-sm font-black text-white mt-0.5">
              {(user?.wordsLearnedRu || 0) + (user?.wordsLearnedEn || 24)} so'z
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center">
            <div className="text-[10px] text-slate-400 font-medium">Coin Token</div>
            <div className="text-sm font-black text-amber-400 mt-0.5 flex items-center justify-center gap-1">
              <Coins className="w-3.5 h-3.5" />
              {user?.tokenBalance || 25}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center">
            <div className="text-[10px] text-slate-400 font-medium">Liga</div>
            <div className="text-sm font-black text-sky-400 mt-0.5 flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Oltin
            </div>
          </div>
        </div>
      </div>

      {/* TS-CHECKLIST (Kunlik odatlar) */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Kunlik Ts-Checklist
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Har kuni quyidagi 3 ta topshiriqni bajaring va streakni saqlang
            </p>
          </div>
          <span className="text-xs font-bold text-amber-400">
            {[checklist.vocabDone, checklist.storyDone, checklist.speakingDone].filter(Boolean).length} / 3
          </span>
        </div>

        {/* Checklist Items */}
        <div className="flex flex-col gap-2.5">
          {/* Task 1 */}
          <div
            onClick={() => handleToggle('vocab')}
            className={`p-3.5 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
              checklist.vocabDone
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              {checklist.vocabDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-slate-600 shrink-0" />
              )}
              <div>
                <div className="text-xs font-bold">5 ta yangi so'zni o'rganish</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Darslar yoki audio lug'at orqali</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-amber-400">+15 XP</span>
          </div>

          {/* Task 2 */}
          <div
            onClick={() => handleToggle('story')}
            className={`p-3.5 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
              checklist.storyDone
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              {checklist.storyDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-slate-600 shrink-0" />
              )}
              <div>
                <div className="text-xs font-bold">1 ta hikoyani o'qib audio eshitish</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Hikoyalar bo'limidan</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-amber-400">+25 XP</span>
          </div>

          {/* Task 3 */}
          <div
            onClick={() => handleToggle('speaking')}
            className={`p-3.5 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
              checklist.speakingDone
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              {checklist.speakingDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-slate-600 shrink-0" />
              )}
              <div>
                <div className="text-xs font-bold">1 ta AI Speaking mashqini bajarish</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Mikrofon bilan talaffuzni sinash</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-amber-400">+30 XP</span>
          </div>
        </div>

        {/* Claim Streak button */}
        <button
          onClick={handleClaimStreak}
          disabled={!allCompleted || checklist.streakClaimed || claiming}
          className={`w-full py-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition shadow-lg ${
            checklist.streakClaimed
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-not-allowed'
              : allCompleted
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 hover:from-orange-400 hover:to-amber-400 shadow-orange-500/20 animate-pulse'
              : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>
            {checklist.streakClaimed
              ? "Bugungi streak qabul qilindi! 🔥"
              : allCompleted
              ? "Bugungi Streakni qabul qilish (+50 XP, +1 kun streak) 🔥"
              : "Streak uchun barcha 3 ta vazifani bajaring"}
          </span>
        </button>
      </div>

      {/* Language Direction Setting */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Ta'lim yo'nalishi</div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {learningMode === 'UZ_TO_RU' ? "O'zbekcha ➔ Ruscha" : "O'zbekcha ➔ Inglizcha"}
            </div>
          </div>
        </div>

        <button
          onClick={() => onToggleLearningMode(learningMode === 'UZ_TO_RU' ? 'UZ_TO_EN' : 'UZ_TO_RU')}
          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
        >
          Almashtirish
        </button>
      </div>

      {/* Bot Simulator / Admin view trigger */}
      <button
        onClick={onOpenAdminSimulator}
        className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 text-xs font-bold text-slate-400 hover:text-white transition flex items-center justify-center gap-2"
      >
        <Bot className="w-4 h-4 text-sky-400" />
        <span>Telegram Bot Simulyatori & Admin paneli</span>
      </button>
    </div>
  );
}
