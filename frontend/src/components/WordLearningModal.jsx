import React, { useState, useEffect } from 'react';
import {
  X, Volume2, ChevronRight, ChevronLeft, Sparkles, Award,
  CheckCircle2, MessageSquare, BookOpen, RotateCcw, Zap, PlayCircle
} from 'lucide-react';
import { getDayData } from '../data/curriculum20Days';
import { speechService } from '../services/speechService';

export default function WordLearningModal({
  initialDay = 1,
  initialWordIndex = 1,
  learningMode = 'UZ_TO_RU', // 'UZ_TO_RU' or 'UZ_TO_EN'
  currentLevel = 'A1',
  onOpenLevelSelector,
  onClose,
  onProgressUpdate
}) {
  const [currentDay, setCurrentDay] = useState(initialDay);
  const [wordIndex, setWordIndex] = useState(initialWordIndex);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [completedWordsCount, setCompletedWordsCount] = useState(0);
  const [checkpointStep, setCheckpointStep] = useState(null); // null, 1 (after word 10), or 2 (after word 20)

  const dayData = getDayData(currentDay);
  const wordsList = dayData.words || [];
  const currentWord = wordsList[wordIndex - 1] || wordsList[0] || {
    order: 1,
    uz: "Oila",
    ru: "Семья",
    en: "Family",
    phoneticRu: "[sem'ya]",
    phoneticEn: "[ˈfæm.əl.i]",
    exRu: "Это моя большая семья",
    exEn: "This is my big family"
  };

  const targetLangKey = learningMode === 'UZ_TO_RU' ? 'ru' : 'en';
  const targetLangCode = learningMode === 'UZ_TO_RU' ? 'RU' : 'EN';
  const targetWord = currentWord[targetLangKey] || currentWord.ru || currentWord.en;
  const targetPhonetic = learningMode === 'UZ_TO_RU' ? currentWord.phoneticRu : currentWord.phoneticEn;
  const targetExample = learningMode === 'UZ_TO_RU' ? currentWord.exRu : currentWord.exEn;
  const targetFlag = learningMode === 'UZ_TO_RU' ? '🇷🇺' : '🇬🇧';
  const targetLangTitle = learningMode === 'UZ_TO_RU' ? 'Ruscha' : 'Inglizcha';

  // AUTOMATIC PRONUNCIATION:
  // Whenever the word index, day, or learning mode changes and NOT in checkpoint, speak automatically!
  useEffect(() => {
    if (checkpointStep === null && targetWord) {
      setIsSpeaking(true);
      speechService.speak(targetWord, targetLangCode, () => {
        setIsSpeaking(false);
      });
    }
  }, [wordIndex, currentDay, learningMode, checkpointStep]);

  const handleNextWord = () => {
    speechService.playTapSound();
    setCompletedWordsCount(prev => prev + 1);
    if (onProgressUpdate) onProgressUpdate(currentDay, wordIndex);

    // After word 10 -> Trigger 10-word reinforcement dialogue!
    if (wordIndex === 10) {
      speechService.playSuccessSound();
      setCheckpointStep(1);
      return;
    }

    // After word 20 -> Trigger 20-word final reinforcement dialogue!
    if (wordIndex === 20 || wordIndex >= wordsList.length) {
      speechService.playSuccessSound();
      setCheckpointStep(2);
      return;
    }

    setWordIndex(prev => prev + 1);
  };

  const handlePrevWord = () => {
    speechService.playTapSound();
    if (checkpointStep !== null) {
      setCheckpointStep(null);
      return;
    }
    if (wordIndex > 1) {
      setWordIndex(prev => prev - 1);
    }
  };

  const handleManualReplayAudio = () => {
    setIsSpeaking(true);
    speechService.speak(targetWord, targetLangCode, () => {
      setIsSpeaking(false);
    });
  };

  const handleSpeakLine = (text) => {
    speechService.speak(text, targetLangCode);
  };

  const handleSpeakFullDialogue = (lines) => {
    if (!lines || lines.length === 0) return;
    const fullText = lines
      .map(l => (learningMode === 'UZ_TO_RU' ? l.ru : l.en))
      .join('. ');
    speechService.speak(fullText, targetLangCode);
  };

  const handleContinueFromCheckpoint1 = () => {
    speechService.playTapSound();
    setCheckpointStep(null);
    setWordIndex(11); // Advance directly to word 11
  };

  const handleFinishDayFromCheckpoint2 = () => {
    speechService.playSuccessSound();
    setCheckpointStep(null);
    if (currentDay < 20) {
      setCurrentDay(prev => prev + 1);
      setWordIndex(1);
    } else {
      setWordIndex(1);
    }
  };

  const progressPercent = Math.round((wordIndex / Math.max(wordsList.length, 1)) * 100);
  const activeCheckpoint = checkpointStep === 1 ? dayData.checkpoint1 : dayData.checkpoint2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-xl max-h-[94vh] flex flex-col rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden">

        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-40 bg-sky-500/20 rounded-full blur-3xl" />

        {/* Modal Top Header Bar */}
        <div className="relative z-10 p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Level selector trigger button */}
            <button
              onClick={onOpenLevelSelector}
              className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-black shadow-md flex items-center gap-1 transition active:scale-95"
              title="Darajani o'zgartirish"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{currentLevel}</span>
            </button>

            {/* Day & Curriculum Badge */}
            <span className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-bold text-slate-300">
              {currentDay}-Kun • {dayData.topicTitleUz}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {checkpointStep ? (
              <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> Dialog #{checkpointStep}
              </span>
            ) : (
              <span className="text-xs font-bold text-sky-400">
                #{wordIndex} / {wordsList.length}
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Smooth Animated Progress Bar */}
        <div className="w-full bg-slate-800/60 h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 transition-all duration-300 rounded-r-full shadow-lg shadow-sky-400/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Scrollable Center Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">

          {/* ============================================================ */}
          {/* VIEW 1: REINFORCEMENT DIALOGUE CHECKPOINT SCREEN */}
          {/* ============================================================ */}
          {checkpointStep !== null && activeCheckpoint ? (
            <div className="space-y-4 animate-in zoom-in-95 duration-200">
              {/* Checkpoint Header Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-indigo-950/50 to-slate-900 border border-purple-500/30 text-left relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    {checkpointStep === 1 ? "1-Bosqich: 10 ta so'zni mustahkamlash" : "2-Bosqich: 20 ta so'zni yakuniy mustahkamlash"}
                  </span>
                  <span className="text-xs font-bold text-amber-300">
                    {checkpointStep === 1 ? "10 / 20 so'z" : "20 / 20 so'z"}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {activeCheckpoint.titleUz}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {activeCheckpoint.summaryUz}
                </p>

                {/* Listen Full Dialogue Button */}
                <div className="mt-3 pt-3 border-t border-purple-500/20 flex items-center justify-between">
                  <button
                    onClick={() => handleSpeakFullDialogue(activeCheckpoint.lines)}
                    className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Volume2 className="w-4 h-4 text-purple-300" />
                    <span>Butun dialogni tinglash ({targetLangTitle})</span>
                  </button>
                  <span className="text-[11px] text-slate-400 italic">
                    Replikani bosib eshiting 👇
                  </span>
                </div>
              </div>

              {/* Dialogue Turns List */}
              <div className="space-y-3 text-left">
                {activeCheckpoint.lines && activeCheckpoint.lines.map((line, idx) => {
                  const targetText = learningMode === 'UZ_TO_RU' ? line.ru : line.en;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSpeakLine(targetText)}
                      className="group cursor-pointer p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/40 transition shadow-md flex items-start gap-3"
                    >
                      <button
                        className="mt-0.5 p-2 rounded-xl bg-slate-800 group-hover:bg-purple-600 text-slate-400 group-hover:text-white transition shrink-0"
                        title="Tinglash"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white group-hover:text-purple-300 transition">
                          {targetText}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 font-medium">
                          {line.uz}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continuation Action Buttons */}
              <div className="pt-2">
                {checkpointStep === 1 ? (
                  <button
                    onClick={handleContinueFromCheckpoint1}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-sky-500/30 transition transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>11-so'zga o'tish (Qolgan 10 ta so'z)</span>
                    <ChevronRight className="w-5 h-5 stroke-[3]" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishDayFromCheckpoint2}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/30 transition transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Kunni muvaffaqiyatli yakunlash ({currentDay < 20 ? `${currentDay + 1}-kunga o'tish` : "Barcha kunlar tamom"})</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* ============================================================ */
            /* VIEW 2: STANDARD WORD FLASHCARD VIEW */
            /* ============================================================ */
            <>
              {/* Flashcard Hero Container */}
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8 border border-slate-800 hover:border-sky-500/40 transition shadow-xl text-center space-y-4">
                
                {/* Stage Indicator: 1-10 or 11-20 */}
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 px-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/60">
                    {wordIndex <= 10 ? "1-qism (1-10 so'z)" : "2-qism (11-20 so'z)"}
                  </span>
                  <span className="text-amber-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-amber-400" />
                    {wordIndex <= 10
                      ? `${10 - wordIndex + 1} so'zdan so'ng dialog`
                      : `${20 - wordIndex + 1} so'zdan so'ng yakuniy dialog`}
                  </span>
                </div>

                {/* Uzbek Native Prompt (Big, Clean, Prominent) */}
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 inline-block mb-2">
                    🇺🇿 O'zbekcha
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {currentWord.uz}
                  </h2>
                </div>

                {/* Target Translation (Vibrant & Highlighted) */}
                <div className="pt-2">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-sky-400 mb-1">
                    <span>{targetFlag} {targetLangTitle}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-300">
                    {targetWord}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    {targetPhonetic}
                  </div>
                </div>

                {/* Big Interactive Speaker Button */}
                <div className="pt-2 flex justify-center">
                  <button
                    onClick={handleManualReplayAudio}
                    className={`group relative p-4 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-xl shadow-sky-500/25 transition transform active:scale-90 flex items-center justify-center ${
                      isSpeaking ? 'ring-4 ring-sky-400/40 animate-pulse' : ''
                    }`}
                    title="Qayta tinglash"
                  >
                    <Volume2 className={`w-7 h-7 ${isSpeaking ? 'animate-bounce text-emerald-300' : ''}`} />
                    {isSpeaking && (
                      <span className="absolute -bottom-6 text-[10px] font-extrabold text-sky-400 tracking-wider">
                        Yangramoqda...
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Example Sentence Box */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-1 text-left">
                <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wide flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Misol Jumla ({targetLangTitle}):</span>
                </div>
                <p className="text-sm font-semibold text-slate-200 italic">
                  "{targetExample}"
                </p>
              </div>

              {/* Quick Checkpoint Preview Box */}
              {dayData.checkpoint1 && (
                <div className="p-3.5 rounded-2xl bg-indigo-950/25 border border-indigo-500/20 text-left flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div className="text-xs text-slate-300">
                      <span className="font-bold text-white">10 va 20-so'zlardan so'ng:</span>
                      <span className="text-slate-400 block text-[11px]">Mustahkamlovchi jonli dialoglar beriladi</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setCheckpointStep(wordIndex <= 10 ? 1 : 2)}
                    className="px-2.5 py-1 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-bold transition whitespace-nowrap"
                  >
                    Dialogni ochish
                  </button>
                </div>
              )}
            </>
          )}

        </div>

        {/* Bottom Sticky Action Footer */}
        {checkpointStep === null && (
          <div className="p-4 sm:p-5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={handlePrevWord}
              disabled={wordIndex === 1}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-750 disabled:opacity-40 text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Oldingisi</span>
            </button>

            <div className="text-center">
              <span className="text-[11px] text-slate-400 block font-medium">
                {wordIndex === 10
                  ? "10-so'z: Keyingisida dialog chiqadi"
                  : wordIndex === 20
                  ? "20-so'z: Yakuniy dialog chiqadi"
                  : "Keyingi so'zda ovoz avtomatik yangraydi"}
              </span>
            </div>

            {/* Primary NEXT Button */}
            <button
              onClick={handleNextWord}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-black shadow-xl shadow-sky-500/30 transition transform hover:scale-[1.02] active:scale-95 flex items-center gap-2"
            >
              <span>{wordIndex === 10 ? "10-so'z Dialogi" : wordIndex === 20 ? "Yakuniy Dialog" : "Keyingi so'z"}</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
