import React from 'react';
import { X, Check, Award, Sparkles } from 'lucide-react';
import { CEFR_LEVELS } from '../data/curriculum20Days';
import { speechService } from '../services/speechService';

export default function LevelSelectorModal({ currentLevel, onSelectLevel, onClose }) {
  const handleLevelPick = (code) => {
    speechService.playTapSound();
    onSelectLevel(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl p-6 md:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                Til Darajasini Tanlang
              </h3>
              <p className="text-xs text-slate-400">
                CEFR xalqaro standarti bo'yicha mos darajangizni belgilang
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {CEFR_LEVELS.map((lvl) => {
            const isSelected = currentLevel === lvl.code;
            return (
              <div
                key={lvl.code}
                onClick={() => handleLevelPick(lvl.code)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-slate-850 border-sky-500 shadow-lg shadow-sky-500/20 scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-black tracking-wider uppercase bg-gradient-to-r ${lvl.color} text-white shadow-md`}>
                    {lvl.code}
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">
                    {lvl.name} <span className="text-xs text-slate-400 font-normal">({lvl.nameEn})</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                    {lvl.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Istalgan vaqtda darajangizni erkin o'zgartirishingiz mumkin.</span>
        </div>
      </div>
    </div>
  );
}
