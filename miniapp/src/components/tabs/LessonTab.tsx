'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  Lightbulb, 
  BookMarked, 
  Check, 
  RotateCcw, 
  ArrowRight, 
  Sparkles,
  PartyPopper,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Word, User, Language } from '../../types';
import { fetchDailyLesson, reviewWord, getTTSAudioUrl } from '../../lib/api';

interface LessonTabProps {
  user: User | null;
  onRefreshUser: () => void;
  onNavigateTab: (tab: any) => void;
}

export const LessonTab: React.FC<LessonTabProps> = ({ user, onRefreshUser, onNavigateTab }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionXP, setSessionXP] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    loadLesson();
  }, [user?.target_lang, user?.current_level]);

  const loadLesson = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDailyLesson();
      setWords(data.words);
      setCurrentIndex(0);
      setIsCompleted(false);
      setSessionXP(0);
      setReviewCount(0);
    } catch (err: any) {
      setError('Kunlik darsni yuklashda xatolik yuz berdi. Iltimos qayta urinib ko‘ring.');
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (text: string, lang: Language) => {
    const url = getTTSAudioUrl(text, lang);
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
    } else {
      audioRef.current.src = url;
    }

    setIsPlayingAudio(true);
    audioRef.current.play().catch((e) => {
      console.warn('Audio playback error:', e);
      setIsPlayingAudio(false);
    });
    audioRef.current.onended = () => setIsPlayingAudio(false);
  };

  const handleReview = async (quality: number) => {
    const currentWord = words[currentIndex];
    if (!currentWord) return;

    try {
      const res = await reviewWord(currentWord.id, quality);
      setSessionXP((prev) => prev + res.xp_added);
      if (quality < 3) {
        setReviewCount((prev) => prev + 1);
      }
      onRefreshUser();

      if (currentIndex + 1 < words.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (_) {}
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Kunlik 12 ta so‘z tayyorlanmoqda...</p>
      </div>
    );
  }

  if (error || words.length === 0) {
    return (
      <div className="glass-card p-6 rounded-2xl text-center space-y-3 mt-8">
        <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
        <h3 className="text-base font-bold">Dars topilmadi</h3>
        <p className="text-xs text-slate-500">{error || 'Bu daraja uchun so‘zlar mavjud emas.'}</p>
        <button
          onClick={loadLesson}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          Qayta yuklash
        </button>
      </div>
    );
  }

  // Completed Screen
  if (isCompleted) {
    return (
      <div className="space-y-4 pt-4 pb-20 animate-in zoom-in-95 duration-300">
        <div className="glass-card p-6 rounded-2xl text-center space-y-4 border border-indigo-200 dark:border-indigo-900 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30">
            <PartyPopper className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Bugungi dars tamomlandi! 🎉</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Siz bugun 12 ta so‘zni muvaffaqiyatli o‘rgandingiz va xotirangizni charxladingiz.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900">
              <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">+{sessionXP}</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">To‘plangan XP</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-100 dark:border-orange-900">
              <span className="text-xl font-black text-orange-600 dark:text-orange-400">
                {reviewCount > 0 ? `${reviewCount} ta` : '0 ta'}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Qayta takrorlanadi</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => onNavigateTab('games')}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition"
            >
              O‘yinlar orqali mustahkamlash
            </button>
            <button
              onClick={loadLesson}
              className="w-full py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs transition"
            >
              Yana yangi so‘zlar olish
            </button>
          </div>
        </div>
      </div>
    );
  }

  const word = words[currentIndex];
  const progressPercent = ((currentIndex + 1) / words.length) * 100;

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* Top Step Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 px-1">
          <span>Kunlik dars ({user?.target_lang?.toUpperCase()})</span>
          <span>{currentIndex + 1} / {words.length}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Word Card */}
      <div className="glass-card rounded-2xl p-5 shadow-lg border border-slate-200/80 dark:border-slate-800/80 space-y-4">
        {/* Word Title & Pronunciation */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {word.word}
              </h1>
              {word.phonetic && (
                <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md">
                  {word.phonetic}
                </span>
              )}
            </div>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {word.uzbek_meaning}
            </p>
          </div>

          {/* TTS Audio Button */}
          <button
            onClick={() => playAudio(word.word, word.lang)}
            className={`p-3 rounded-xl transition ${
              isPlayingAudio 
                ? 'bg-indigo-600 text-white scale-105' 
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 dark:text-indigo-300'
            }`}
            title="Audio talaffuzini tinglash"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Mnemonic Hook & Story */}
        <div className="rounded-xl p-3.5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 space-y-2">
          {word.mnemonic_hook && (
            <div className="flex items-center space-x-1.5 text-amber-800 dark:text-amber-300 text-xs font-extrabold">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Eslab qolish kodi:</span>
              <span className="px-1.5 py-0.5 bg-amber-200/60 dark:bg-amber-800/60 rounded text-[11px] font-mono">
                {word.mnemonic_hook}
              </span>
            </div>
          )}
          {word.mnemonic_story && (
            <p className="text-xs text-amber-950/90 dark:text-amber-200/90 italic leading-relaxed pl-5">
              «{word.mnemonic_story}»
            </p>
          )}
        </div>

        {/* Example Sentence & Translation */}
        <div className="rounded-xl p-3.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
          <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 text-[11px] font-semibold">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Misol:</span>
          </div>
          <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
            "{word.example_sentence}"
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            — {word.example_translation}
          </p>
        </div>

        {/* Action grading buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => handleReview(1)}
            className="flex items-center justify-center space-x-1.5 py-3 px-4 rounded-xl border-2 border-orange-200 hover:bg-orange-50 dark:border-orange-900/60 dark:hover:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-bold text-xs transition active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Takrorlash kerak (+1 XP)</span>
          </button>

          <button
            onClick={() => handleReview(4)}
            className="flex items-center justify-center space-x-1.5 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 hover:opacity-95 transition active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Bilaman (+5 XP)</span>
          </button>
        </div>

        {/* Skip button */}
        <div className="text-center pt-1">
          <button
            onClick={() => {
              if (currentIndex + 1 < words.length) {
                setCurrentIndex((prev) => prev + 1);
              } else {
                setIsCompleted(true);
              }
            }}
            className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold"
          >
            Keyingi so‘zga o‘tish →
          </button>
        </div>
      </div>
    </div>
  );
};
