'use client';

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Check, 
  RotateCcw, 
  HelpCircle,
  Sparkles,
  ArrowRight,
  PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GrammarLesson, User } from '../../types';
import { fetchGrammarLessons, submitExercise } from '../../lib/api';

interface GrammarTabProps {
  user: User | null;
  onRefreshUser?: () => void;
}

export const GrammarTab: React.FC<GrammarTabProps> = ({ user, onRefreshUser }) => {
  const [lessons, setLessons] = useState<GrammarLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);

  // Sorting exercise state
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [remainingTokens, setRemainingTokens] = useState<string[]>([]);
  const [exerciseStatus, setExerciseStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isAllCompleted, setIsAllCompleted] = useState(false);

  useEffect(() => {
    loadLessons();
  }, [user?.target_lang, user?.current_level]);

  const loadLessons = async () => {
    setLoading(true);
    setIsAllCompleted(false);
    try {
      const data = await fetchGrammarLessons();
      setLessons(data);
      if (data.length > 0) {
        initLesson(data[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const initLesson = (lesson: GrammarLesson) => {
    setSelectedLesson(lesson);
    setExerciseStatus('idle');
    setSelectedTokens([]);
    if (lesson.sort_exercise?.tokens) {
      setRemainingTokens([...lesson.sort_exercise.tokens]);
    } else {
      setRemainingTokens([]);
    }
  };

  const handleSelectToken = (token: string, index: number) => {
    setSelectedTokens((prev) => [...prev, token]);
    setRemainingTokens((prev) => prev.filter((_, i) => i !== index));
    setExerciseStatus('idle');
  };

  const handleRemoveToken = (token: string, index: number) => {
    setRemainingTokens((prev) => [...prev, token]);
    setSelectedTokens((prev) => prev.filter((_, i) => i !== index));
    setExerciseStatus('idle');
  };

  const handleResetTokens = () => {
    if (selectedLesson?.sort_exercise?.tokens) {
      setRemainingTokens([...selectedLesson.sort_exercise.tokens]);
      setSelectedTokens([]);
      setExerciseStatus('idle');
    }
  };

  const handleCheckAnswer = async () => {
    if (!selectedLesson?.sort_exercise) return;
    const normalize = (s: string) => s.replace(/[.,?!'"]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    const userAnswer = normalize(selectedTokens.join(' '));
    const target = normalize(selectedLesson.sort_exercise.target_sentence);
    
    if (userAnswer === target) {
      setExerciseStatus('correct');
      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 }
        });
        const tg = (window as any).Telegram?.WebApp;
        tg?.HapticFeedback?.notificationOccurred('success');
      } catch (_) {}

      // Award XP idempotently
      const key = `grammar_${selectedLesson.id}_${Date.now()}`;
      try {
        await submitExercise({
          exercise_type: 'GRAMMAR',
          idempotency_key: key,
          score: 100,
          xp_earned: 10
        });
        onRefreshUser?.();
      } catch (err) {
        console.warn(err);
      }

      // Automatically move to the next lesson after 1.3 seconds
      setTimeout(() => {
        handleGoToNextLesson();
      }, 1300);

    } else {
      setExerciseStatus('wrong');
      try {
        const tg = (window as any).Telegram?.WebApp;
        tg?.HapticFeedback?.notificationOccurred('error');
      } catch (_) {}
    }
  };

  const handleGoToNextLesson = () => {
    if (!selectedLesson) return;
    const currentIdx = lessons.findIndex((l) => l.id === selectedLesson.id);
    if (currentIdx !== -1 && currentIdx + 1 < lessons.length) {
      initLesson(lessons[currentIdx + 1]);
    } else {
      setIsAllCompleted(true);
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 }
        });
      } catch (_) {}
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Grammatika darslari yuklanmoqda...</p>
      </div>
    );
  }

  if (isAllCompleted) {
    return (
      <div className="space-y-4 pt-4 pb-20 animate-in zoom-in-95 duration-300">
        <div className="glass-card p-6 rounded-2xl text-center space-y-4 shadow-xl border border-indigo-100 dark:border-indigo-900">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-teal-500/30">
            <PartyPopper className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Barcha darslar yakunlandi! 🎉</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Siz ushbu bo‘limdagi barcha grammatik gaplarni muvaffaqiyatli tuzib chiqdingiz!
            </p>
          </div>
          <button
            onClick={() => {
              setIsAllCompleted(false);
              if (lessons.length > 0) initLesson(lessons[0]);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition"
          >
            Boshidan qayta takrorlash
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* Lesson Selector Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
        {lessons.map((lesson, idx) => {
          const isSelected = selectedLesson?.id === lesson.id;
          return (
            <button
              key={lesson.id}
              onClick={() => initLesson(lesson)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'glass-card text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {idx + 1}. {lesson.title}
            </button>
          );
        })}
      </div>

      {selectedLesson && (
        <div className="space-y-4">
          {/* Lesson Header Card */}
          <div className="glass-card rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {selectedLesson.lang.toUpperCase()} • {selectedLesson.level}
              </span>
            </div>

            <h2 className="text-lg font-black tracking-tight">{selectedLesson.title}</h2>
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {selectedLesson.title_uz}
            </h3>

            {/* Formula box */}
            {selectedLesson.formula && (
              <div className="rounded-xl p-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-900/40">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-0.5">
                  Qoida formulasi:
                </span>
                <code className="text-xs font-mono font-bold text-indigo-900 dark:text-indigo-200 block">
                  {selectedLesson.formula}
                </code>
              </div>
            )}

            {/* Explanation */}
            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
              <p>{selectedLesson.explanation_uz}</p>
            </div>

            {/* Examples List */}
            {selectedLesson.examples && selectedLesson.examples.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block">
                  Misollar:
                </span>
                <div className="space-y-1.5">
                  {selectedLesson.examples.map((ex, i) => {
                    const foreignKey = selectedLesson.lang === 'ru' ? 'ru' : 'en';
                    return (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-xs">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {ex[foreignKey] || Object.values(ex)[0]}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 italic text-[11px] mt-0.5">
                          {ex.uz || Object.values(ex)[1]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Sorting Drill */}
          {selectedLesson.sort_exercise && (
            <div className="glass-card rounded-2xl p-5 space-y-3.5 border-2 border-indigo-200/80 dark:border-indigo-900/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Grammatika saralash mashqi</span>
                </div>
                <button
                  onClick={handleResetTokens}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center space-x-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Qayta</span>
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                O‘zbekcha tarjimasi: <i>«{selectedLesson.sort_exercise.uzbek_translation}»</i>
              </p>

              {/* Selected words drop area */}
              <div className="min-h-[52px] p-2.5 rounded-xl border-2 border-dashed border-indigo-300 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/20 flex flex-wrap gap-2 items-center">
                {selectedTokens.length === 0 ? (
                  <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                    So‘zlarni ketma-ket bosing...
                  </span>
                ) : (
                  selectedTokens.map((token, i) => (
                    <button
                      key={i}
                      onClick={() => handleRemoveToken(token, i)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-sm hover:bg-indigo-700 active:scale-95 transition"
                    >
                      {token}
                    </button>
                  ))
                )}
              </div>

              {/* Remaining tokens */}
              <div className="flex flex-wrap gap-2 pt-1">
                {remainingTokens.map((token, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectToken(token, i)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition active:scale-95"
                  >
                    {token}
                  </button>
                ))}
              </div>

              {/* Exercise validation banner */}
              {exerciseStatus === 'correct' && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-between animate-in zoom-in-95 duration-200">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Barakalla! To‘g‘ri topildi (+10 XP) 🎉</span>
                  </div>
                  <button
                    onClick={handleGoToNextLesson}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition"
                  >
                    Keyingisi →
                  </button>
                </div>
              )}

              {exerciseStatus === 'wrong' && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>Xatolik bor. So‘zlar tartibini tekshirib, qaytadan urinib ko‘ring.</span>
                </div>
              )}

              {exerciseStatus === 'correct' ? (
                <button
                  onClick={handleGoToNextLesson}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-1.5"
                >
                  <span>Keyingi mashqqa o‘tish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedTokens.length === 0}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition"
                >
                  Tekshirish
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
