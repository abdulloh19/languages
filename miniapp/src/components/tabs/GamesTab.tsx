'use client';

import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Layers, 
  CheckCircle, 
  Shuffle, 
  Zap, 
  BookOpen, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft,
  Trophy,
  XCircle,
  HelpCircle,
  Check,
  Sparkles,
  PartyPopper,
  Award,
  Home
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { User } from '../../types';
import { fetchExerciseContent, submitExercise } from '../../lib/api';

interface GamesTabProps {
  user: User | null;
  onRefreshUser: () => void;
  onNavigateTab: (tab: any) => void;
}

type GameType = 'FLASHCARD' | 'CHOICE' | 'BUILDER' | 'MATCH' | 'QUIZ';

export const GamesTab: React.FC<GamesTabProps> = ({ user, onRefreshUser, onNavigateTab }) => {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Gameplay state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState<{ xp_awarded: number; message: string } | null>(null);

  // Flashcard flip
  const [isFlipped, setIsFlipped] = useState(false);

  // Choice & Quiz feedback
  const [selectedAnswerChoice, setSelectedAnswerChoice] = useState<{ option: string; isCorrect: boolean } | null>(null);

  // Match state
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);

  // Builder state
  const [builderSelected, setBuilderSelected] = useState<string[]>([]);
  const [builderRemaining, setBuilderRemaining] = useState<string[]>([]);
  const [builderStatus, setBuilderStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const gamesList: { type: GameType; title: string; desc: string; icon: React.ReactNode; color: string }[] = [
    {
      type: 'FLASHCARD',
      title: 'Flashcard',
      desc: 'So‘z ↔ Tarjima kartochkalari',
      icon: <Layers className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      type: 'CHOICE',
      title: 'Variant tanlash',
      desc: '4 ta variantdan to‘g‘ri ma’noni toping',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      type: 'BUILDER',
      title: 'Gap tuzish',
      desc: 'Aralash so‘zlardan to‘g‘ri gap yasang',
      icon: <Shuffle className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-600',
    },
    {
      type: 'MATCH',
      title: 'Juftlikni topish',
      desc: 'So‘zlar va tarjimalarni o‘zaro moslang',
      icon: <Gamepad2 className="w-5 h-5" />,
      color: 'from-amber-500 to-orange-600',
    },
    {
      type: 'QUIZ',
      title: 'Tezkor 10 ta quiz',
      desc: '10 savollik bilim sinovi',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-rose-500 to-red-600',
    },
  ];

  const startGame = async (type: GameType) => {
    setActiveGame(type);
    setLoading(true);
    setGameOver(false);
    setGameResult(null);
    setCurrentIndex(0);
    setScore(0);
    setMistakes([]);
    setIsFlipped(false);
    setSelectedAnswerChoice(null);
    setMatchedIds([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setBuilderStatus('idle');

    try {
      const data = await fetchExerciseContent(type);
      setContent(data);
      if (type === 'BUILDER' && data.items && data.items.length > 0) {
        setBuilderRemaining([...data.items[0].tokens]);
        setBuilderSelected([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const finishGame = async (finalScore: number, finalMistakes: any[]) => {
    setGameOver(true);
    const xpReward = Math.max(5, Math.round((finalScore / 100) * 20));
    const idempotencyKey = `ex_${activeGame}_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    try {
      const tg = (window as any).Telegram?.WebApp;
      tg?.HapticFeedback?.notificationOccurred('success');
    } catch (_) {}

    try {
      confetti({ particleCount: 110, spread: 80, origin: { y: 0.5 } });
      setTimeout(() => {
        confetti({ particleCount: 70, angle: 60, spread: 60, origin: { x: 0 } });
        confetti({ particleCount: 70, angle: 120, spread: 60, origin: { x: 1 } });
      }, 250);
    } catch (_) {}

    try {
      const res = await submitExercise({
        exercise_type: activeGame || 'GAME',
        idempotency_key: idempotencyKey,
        score: finalScore,
        xp_earned: xpReward,
        mistakes: finalMistakes,
      });
      setGameResult(res);
      onRefreshUser();
    } catch (e) {
      console.error(e);
    }
  };

  // Choice / Quiz answer handler
  const handleAnswerChoice = (selectedOption: string, correctAnswer: string, questionObj: any) => {
    if (selectedAnswerChoice !== null) return;
    const isCorrect = selectedOption === correctAnswer;
    setSelectedAnswerChoice({ option: selectedOption, isCorrect });

    try {
      const tg = (window as any).Telegram?.WebApp;
      if (isCorrect) tg?.HapticFeedback?.notificationOccurred('success');
      else tg?.HapticFeedback?.notificationOccurred('error');
    } catch (_) {}

    const newScore = isCorrect ? score + 10 : score;
    setScore(newScore);

    const newMistakes = [...mistakes];
    if (!isCorrect) {
      newMistakes.push({
        question: questionObj.question,
        user_answer: selectedOption,
        correct_answer: correctAnswer,
      });
      setMistakes(newMistakes);
    }

    const totalQuestions = content.questions.length;
    setTimeout(() => {
      setSelectedAnswerChoice(null);
      if (currentIndex + 1 < totalQuestions) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        finishGame(Math.round((newScore / (totalQuestions * 10)) * 100), newMistakes);
      }
    }, 700);
  };

  // Match Pair Handlers
  const handleSelectLeft = (id: number) => {
    setSelectedLeft(id);
    if (selectedRight !== null) {
      checkMatch(id, selectedRight);
    }
  };

  const handleSelectRight = (id: number) => {
    setSelectedRight(id);
    if (selectedLeft !== null) {
      checkMatch(selectedLeft, id);
    }
  };

  const checkMatch = (leftId: number, rightId: number) => {
    if (leftId === rightId) {
      const newMatched = [...matchedIds, leftId];
      setMatchedIds(newMatched);
      setSelectedLeft(null);
      setSelectedRight(null);
      try {
        const tg = (window as any).Telegram?.WebApp;
        tg?.HapticFeedback?.impactOccurred('medium');
      } catch (_) {}

      if (newMatched.length === content.left_items.length) {
        setTimeout(() => {
          finishGame(100, mistakes);
        }, 300);
      }
    } else {
      setSelectedLeft(null);
      setSelectedRight(null);
      setMistakes((prev) => [...prev, { leftId, rightId }]);
      try {
        const tg = (window as any).Telegram?.WebApp;
        tg?.HapticFeedback?.notificationOccurred('error');
      } catch (_) {}
    }
  };

  // Builder Handlers
  const handleBuilderSelectToken = (token: string, idx: number) => {
    setBuilderSelected((prev) => [...prev, token]);
    setBuilderRemaining((prev) => prev.filter((_, i) => i !== idx));
    setBuilderStatus('idle');
  };

  const handleBuilderRemoveToken = (token: string, idx: number) => {
    setBuilderRemaining((prev) => [...prev, token]);
    setBuilderSelected((prev) => prev.filter((_, i) => i !== idx));
    setBuilderStatus('idle');
  };

  const handleBuilderReset = () => {
    const item = content.items[currentIndex];
    setBuilderRemaining([...item.tokens]);
    setBuilderSelected([]);
    setBuilderStatus('idle');
  };

  const handleBuilderCheck = () => {
    const item = content.items[currentIndex];
    const normalize = (s: string) => s.replace(/[.,?!'"]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    const userSentence = normalize(builderSelected.join(' '));
    const correctSentence = normalize(item.target_sentence);
    const isCorrect = userSentence === correctSentence;

    const newScore = isCorrect ? score + 20 : score;
    setScore(newScore);

    const newMistakes = [...mistakes];
    if (!isCorrect) {
      newMistakes.push({
        target: item.target_sentence,
        attempt: userSentence,
      });
      setMistakes(newMistakes);
      setBuilderStatus('wrong');
      try {
        const tg = (window as any).Telegram?.WebApp;
        tg?.HapticFeedback?.notificationOccurred('error');
      } catch (_) {}
    } else {
      setBuilderStatus('correct');
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        const tg = (window as any).Telegram?.WebApp;
        tg?.HapticFeedback?.notificationOccurred('success');
      } catch (_) {}

      setTimeout(() => {
        setBuilderStatus('idle');
        if (currentIndex + 1 < content.items.length) {
          setCurrentIndex((prev) => prev + 1);
          setBuilderRemaining([...content.items[currentIndex + 1].tokens]);
          setBuilderSelected([]);
        } else {
          finishGame(Math.round((newScore / 100) * 100), newMistakes);
        }
      }, 1000);
    }
  };

  // Render Hub
  if (!activeGame) {
    return (
      <div className="space-y-4 pb-20 animate-in fade-in duration-300">
        <div>
          <h2 className="text-lg font-black tracking-tight">Interaktiv Mashqlar va O‘yinlar</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Bilimingizni sinab ko‘ring, yangi so‘zlarni mustahkamlang va XP to‘plang.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {gamesList.map((g) => (
            <div
              key={g.type}
              onClick={() => startGame(g.type)}
              className="glass-card p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-indigo-400 transition group active:scale-98 shadow-sm"
            >
              <div className="flex items-center space-x-3.5">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${g.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition`}>
                  {g.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold">{g.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{g.desc}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition" />
            </div>
          ))}

          {/* Grammar sorting shortcut */}
          <div
            onClick={() => onNavigateTab('grammar')}
            className="glass-card p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-indigo-400 transition group active:scale-98 shadow-sm border-dashed"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Grammatika saralash</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Qoidalar asosida gap tuzish mashqi</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>
    );
  }

  // Loading view
  if (loading || !content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-medium">O‘yin yuklanmoqda...</p>
      </div>
    );
  }

  // Game Over Screen (Barcha o‘yinlar tugallanganda chiqadigan to‘liq bildirishnoma)
  if (gameOver) {
    return (
      <div className="space-y-4 pt-4 pb-20 animate-in zoom-in-95 duration-300">
        <div className="glass-card p-6 rounded-2xl text-center space-y-4 shadow-xl border-2 border-indigo-200 dark:border-indigo-800">
          {/* Animated Trophy Header */}
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-amber-500/40 animate-bounce">
              <Trophy className="w-10 h-10" />
            </div>
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-md">
              ✓
            </span>
          </div>

          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-black mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>O‘YIN MUVAFFAQIYATLI YAKUNLANDI</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Tabriklaymiz! 🎉
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[290px] mx-auto">
              Siz ushbu o‘yin bosqichlarini to‘liq yakunladingiz va profilingizga yangi tajriba ballari yozildi!
            </p>
          </div>

          {/* Performance Stats Cards */}
          <div className="grid grid-cols-2 gap-3 py-1">
            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 shadow-xs">
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                +{gameResult?.xp_awarded || 20}
              </span>
              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">To‘plangan XP</p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 shadow-xs">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {score}%
              </span>
              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">To‘g‘ri natija</p>
            </div>
          </div>

          {/* Status Message Banner */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
            ✅ Natijangiz serverda saqlandi va profilingiz yangilandi.
          </div>

          {/* Mistakes review */}
          {mistakes.length > 0 ? (
            <div className="text-left space-y-2 p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center space-x-1">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Qayta takrorlanadigan xatolar ({mistakes.length} ta):</span>
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Ushbu xatolar xotirada mustahkamlanishi uchun keyingi mashg‘ulotlarda avtomatik qaytariladi.
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center space-x-1.5 border border-emerald-200/60 dark:border-emerald-800/40">
              <PartyPopper className="w-4 h-4" />
              <span>Mukammal natija! Hech qanday xatoliksiz bajardingiz!</span>
            </div>
          )}

          {/* Action Navigation Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => setActiveGame(null)}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-1.5"
            >
              <span>Boshqa o‘yin tanlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => startGame(activeGame)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition flex items-center justify-center space-x-1 hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ushbu o‘yinni qayta o‘ynash</span>
            </button>
            <button
              onClick={() => onNavigateTab('home')}
              className="w-full py-2 px-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium text-xs transition flex items-center justify-center space-x-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Bosh sahifaga qaytish</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 1. FLASHCARD GAME
  if (activeGame === 'FLASHCARD') {
    const card = content.items[currentIndex];
    const totalCards = content.items.length;
    const isLastCard = currentIndex + 1 >= totalCards;

    return (
      <div className="space-y-4 pb-20 animate-in fade-in duration-300">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <button onClick={() => setActiveGame(null)} className="text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>O‘yinlar</span>
          </button>
          <span>Karta {currentIndex + 1} / {totalCards}</span>
        </div>

        {/* Top Progress bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>

        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="min-h-[260px] glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-lg transition-transform active:scale-98 border-2 border-indigo-200/60 dark:border-indigo-900/60"
        >
          {!isFlipped ? (
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider">
                Kartani bosib tarjimasini ko‘ring
              </span>
              <h2 className="text-3xl font-black">{card.front}</h2>
              {card.phonetic && <p className="text-xs font-mono text-slate-400">{card.phonetic}</p>}
            </div>
          ) : (
            <div className="space-y-3 animate-in fade-in duration-200">
              <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">
                O‘zbekcha ma’nosi:
              </span>
              <h2 className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {card.back}
              </h2>
              {card.mnemonic && (
                <p className="text-xs text-amber-700 dark:text-amber-300 italic max-w-[280px]">
                  💡 {card.mnemonic}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setIsFlipped(false);
                setCurrentIndex(currentIndex - 1);
              }
            }}
            disabled={currentIndex === 0}
            className="py-3 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-30 text-slate-700 dark:text-slate-300 font-bold text-xs shadow-sm transition flex items-center justify-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Oldingi</span>
          </button>
          <button
            onClick={() => {
              setIsFlipped(false);
              if (!isLastCard) {
                setCurrentIndex(currentIndex + 1);
              } else {
                finishGame(100, []);
              }
            }}
            className={`py-3 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center space-x-1 ${
              isLastCard 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/20' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <span>{isLastCard ? '🎉 Tugatish (+20 XP)' : 'Keyingisi'}</span>
            {!isLastCard && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    );
  }

  // 2. CHOICE OR QUIZ GAME
  if (activeGame === 'CHOICE' || activeGame === 'QUIZ') {
    const q = content.questions[currentIndex];
    const totalQuestions = content.questions.length;

    return (
      <div className="space-y-4 pb-20 animate-in fade-in duration-300">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <button onClick={() => setActiveGame(null)} className="text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>O‘yinlar</span>
          </button>
          <span>Savol {currentIndex + 1} / {totalQuestions}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        <div className="glass-card rounded-2xl p-5 shadow-lg space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white text-center py-2">
            {q.question}
          </h2>

          <div className="space-y-2.5">
            {q.options.map((opt: string, i: number) => {
              const isSelected = selectedAnswerChoice?.option === opt;
              let btnClass = "border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-800 dark:text-slate-200";
              if (selectedAnswerChoice) {
                if (opt === q.correct_answer) {
                  btnClass = "bg-emerald-500 border-emerald-500 text-white shadow-md";
                } else if (isSelected) {
                  btnClass = "bg-rose-500 border-rose-500 text-white shadow-md";
                } else {
                  btnClass = "opacity-40 border-slate-200 dark:border-slate-800";
                }
              }

              return (
                <button
                  key={i}
                  disabled={selectedAnswerChoice !== null}
                  onClick={() => handleAnswerChoice(opt, q.correct_answer, q)}
                  className={`w-full p-3.5 rounded-xl border text-left font-semibold text-xs transition active:scale-98 flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                    {['A', 'B', 'C', 'D'][i]}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedAnswerChoice && (
            <div className={`p-2.5 rounded-xl text-center text-xs font-bold animate-in zoom-in-95 ${
              selectedAnswerChoice.isCorrect 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' 
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
            }`}>
              {selectedAnswerChoice.isCorrect ? '✅ Barakalla! To‘g‘ri javob!' : `❌ Noto‘g‘ri. To‘g‘ri javob: ${q.correct_answer}`}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. MATCHING PAIRS GAME
  if (activeGame === 'MATCH') {
    return (
      <div className="space-y-4 pb-20 animate-in fade-in duration-300">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <button onClick={() => setActiveGame(null)} className="text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>O‘yinlar</span>
          </button>
          <span>Topildi: {matchedIds.length} / {content.left_items.length}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${(matchedIds.length / content.left_items.length) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Left Column (Target words) */}
          <div className="space-y-2">
            {content.left_items.map((item: any) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedLeft === item.id;
              if (isMatched) return null;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectLeft(item.id)}
                  className={`w-full p-3 rounded-xl text-xs font-bold text-center border transition ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-102'
                      : 'glass-card border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                  }`}
                >
                  {item.text}
                </button>
              );
            })}
          </div>

          {/* Right Column (Uzbek translations) */}
          <div className="space-y-2">
            {content.right_items.map((item: any) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedRight === item.id;
              if (isMatched) return null;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectRight(item.id)}
                  className={`w-full p-3 rounded-xl text-xs font-bold text-center border transition ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-102'
                      : 'glass-card border-slate-200 dark:border-slate-800 hover:border-purple-400'
                  }`}
                >
                  {item.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 4. SENTENCE BUILDER GAME
  if (activeGame === 'BUILDER') {
    const item = content.items[currentIndex];
    const totalItems = content.items.length;

    return (
      <div className="space-y-4 pb-20 animate-in fade-in duration-300">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <button onClick={() => setActiveGame(null)} className="text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>O‘yinlar</span>
          </button>
          <span>Gap {currentIndex + 1} / {totalItems}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalItems) * 100}%` }}
          />
        </div>

        <div className="glass-card rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-indigo-500 uppercase">Tarjimasi:</span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                «{item.uzbek_translation}»
              </p>
            </div>
            <button
              onClick={handleBuilderReset}
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Qayta</span>
            </button>
          </div>

          {/* Selected drop zone */}
          <div className="min-h-[60px] p-3 rounded-xl border-2 border-dashed border-indigo-300 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/20 flex flex-wrap gap-2 items-center">
            {builderSelected.length === 0 ? (
              <span className="text-xs text-slate-400 italic">So‘zlarni ketma-ket joylashtiring...</span>
            ) : (
              builderSelected.map((tok, i) => (
                <button
                  key={i}
                  onClick={() => handleBuilderRemoveToken(tok, i)}
                  className="px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-sm hover:bg-indigo-700 active:scale-95 transition"
                >
                  {tok}
                </button>
              ))
            )}
          </div>

          {/* Available tokens */}
          <div className="flex flex-wrap gap-2 pt-1">
            {builderRemaining.map((tok, i) => (
              <button
                key={i}
                onClick={() => handleBuilderSelectToken(tok, i)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-semibold text-xs transition active:scale-95"
              >
                {tok}
              </button>
            ))}
          </div>

          {builderStatus === 'correct' && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-in zoom-in-95">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Barakalla! To‘g‘ri gap tuzildi (+20 XP) 🎉</span>
            </div>
          )}

          {builderStatus === 'wrong' && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center space-x-2 animate-in zoom-in-95">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>Tartibda xatolik bor. Qaytadan urinib ko‘ring.</span>
            </div>
          )}

          <button
            onClick={handleBuilderCheck}
            disabled={builderSelected.length === 0}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition"
          >
            Tekshirish
          </button>
        </div>
      </div>
    );
  }

  return null;
};
