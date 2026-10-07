import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, CheckCircle2, XCircle, Sparkles, RefreshCw, Award, Play, ChevronRight, HelpCircle } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function PracticeView() {
  const [activeTab, setActiveTab] = useState('SPEAKING'); // 'SPEAKING', 'GAP_FILL', 'AUDIO', 'QUIZ'
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // AI Speaking State
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [speakingResult, setSpeakingResult] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const recognitionRef = useRef(null);

  // Gap fill / Quiz State
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const tabs = [
    { id: 'SPEAKING', label: 'AI Speaking', icon: Mic, color: 'text-amber-400' },
    { id: 'GAP_FILL', label: 'Bo\'sh joylar', icon: Sparkles, color: 'text-sky-400' },
    { id: 'AUDIO', label: 'Audio Tinglash', icon: Volume2, color: 'text-emerald-400' },
    { id: 'QUIZ', label: 'Viktorina', icon: HelpCircle, color: 'text-purple-400' },
  ];

  useEffect(() => {
    setLoading(true);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setSpeakingResult(null);
    setRecognizedText('');
    setCurrentIndex(0);

    fetch(`/api/tasks?type=${activeTab}`)
      .then(r => r.json())
      .then(data => {
        setTasks(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeTab]);

  const currentTask = tasks[currentIndex];

  // Speech Recognition Setup
  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sizning brauzeringiz ovoz yozishni qo'llab-quvvatlamaydi. Iltimos, Chrome yoki zamonaviy mobil brauzerda oching.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setRecognizedText('');
        setSpeakingResult(null);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedText(transcript);
        setIsListening(false);
        evaluateSpeechOnServer(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const evaluateSpeechOnServer = (spokenText) => {
    if (!currentTask) return;
    setEvaluating(true);

    fetch('/api/tasks/speaking/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1,
        taskId: currentTask.id,
        spokenText: spokenText
      })
    })
      .then(r => r.json())
      .then(data => {
        setSpeakingResult(data);
        setEvaluating(false);
        if (data.passed) {
          speechService.playSuccessSound?.();
        }
      })
      .catch(() => {
        setEvaluating(false);
      });
  };

  // Option selection
  const handleSelectOption = (opt) => {
    if (isAnswerSubmitted) return;
    speechService.playTapSound();
    setSelectedOption(opt);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || !currentTask) return;
    setIsAnswerSubmitted(true);
    const correct = selectedOption.trim().toLowerCase() === (currentTask.correctAnswer || '').trim().toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      speechService.playSuccessSound?.();
    }
  };

  const handleNextTask = () => {
    speechService.playTapSound();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setSpeakingResult(null);
    setRecognizedText('');
    setCurrentIndex((prev) => (prev + 1 < tasks.length ? prev + 1 : 0));
  };

  const playSentenceAudio = (sentence) => {
    speechService.speak(sentence, 'en-US');
  };

  return (
    <div className="flex flex-col gap-5 pb-24">
      {/* Category selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                speechService.playTapSound();
                setActiveTab(tab.id);
              }}
              className={`py-2 px-3 rounded-2xl text-xs font-bold transition border flex items-center gap-1.5 whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white border-amber-500/50 shadow-md'
                  : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-2 text-slate-500">
          <div className="w-7 h-7 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs">Mashqlar yuklanmoqda...</span>
        </div>
      ) : !currentTask ? (
        <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
          Hozircha ushbu bo'limda mashqlar mavjud emas.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Exercise card */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                {currentTask.title}
              </span>
              <span className="text-xs text-slate-400 font-bold">
                +{currentTask.xpReward} XP
              </span>
            </div>

            {/* Instruction */}
            <p className="text-xs text-slate-300 font-medium">
              {currentTask.instructionUz}
            </p>

            {/* SPEAKING MODE */}
            {activeTab === 'SPEAKING' && (
              <div className="flex flex-col gap-5 items-center text-center">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 w-full relative">
                  <div className="text-base font-black text-white leading-relaxed">
                    "{currentTask.questionText}"
                  </div>
                  <button
                    onClick={() => playSentenceAudio(currentTask.questionText)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition"
                    title="To'g'ri talaffuzni eshitish"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Mic Record Button */}
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={isListening ? stopSpeechRecognition : startSpeechRecognition}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition shadow-2xl relative ${
                      isListening
                        ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-500/20'
                        : 'bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 hover:scale-105 shadow-amber-500/30'
                    }`}
                  >
                    {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </button>
                  <span className="text-xs font-bold text-slate-400">
                    {isListening ? 'Eshitilmoqda... Baland ovozda ayting!' : 'Mikrofonni bosib gapiring'}
                  </span>
                </div>

                {/* Evaluating status */}
                {evaluating && (
                  <div className="text-xs text-amber-400 flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    AI talaffuzni tahlil qilmoqda...
                  </div>
                )}

                {/* AI Result Card */}
                {speakingResult && (
                  <div className={`w-full p-4 rounded-2xl border text-left flex flex-col gap-3 ${
                    speakingResult.passed
                      ? 'bg-emerald-950/30 border-emerald-500/40'
                      : 'bg-rose-950/30 border-rose-500/40'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-white">
                        {speakingResult.passed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                        Aniqlik: {speakingResult.accuracyScore}%
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        +{speakingResult.earnedXp} XP
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 leading-relaxed">
                      {speakingResult.feedbackMessage}
                    </div>

                    {/* Word-by-word highlights */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {speakingResult.wordDetails?.map((wd, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-0.5 rounded font-bold ${
                            wd.isMatch
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {wd.word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* GAP FILL / AUDIO / QUIZ MODES */}
            {activeTab !== 'SPEAKING' && (
              <div className="flex flex-col gap-4">
                {/* Audio prompt button if audio */}
                {activeTab === 'AUDIO' && currentTask.audioPrompt && (
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Audio Dialog</div>
                      <div className="text-[11px] text-slate-400">Tinglash uchun bosing</div>
                    </div>
                    <button
                      onClick={() => playSentenceAudio(currentTask.audioPrompt)}
                      className="p-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="text-xs">Audioni qo'yish</span>
                    </button>
                  </div>
                )}

                {/* Question Text */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-sm font-bold text-white leading-relaxed">
                  {currentTask.questionText}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(currentTask.optionsCsv ? currentTask.optionsCsv.split(',') : ['A', 'B', 'C', 'D']).map((opt, i) => {
                    const isSelected = selectedOption === opt;
                    let style = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';

                    if (isAnswerSubmitted) {
                      if (opt.trim().toLowerCase() === (currentTask.correctAnswer || '').trim().toLowerCase()) {
                        style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected) {
                        style = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                      }
                    } else if (isSelected) {
                      style = 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold';
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(opt)}
                        className={`p-3.5 rounded-xl border text-xs font-semibold transition text-left flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {isAnswerSubmitted && opt.trim().toLowerCase() === (currentTask.correctAnswer || '').trim().toLowerCase() && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Submit / Check Button */}
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!selectedOption}
                    className="w-full py-3.5 rounded-xl font-black text-xs bg-amber-500 text-slate-950 hover:bg-amber-400 disabled:opacity-40 transition shadow-lg shadow-amber-500/20"
                  >
                    Javobni tekshirish
                  </button>
                ) : (
                  <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-bold ${
                    isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
                      : 'bg-rose-950/30 border-rose-500/30 text-rose-400'
                  }`}>
                    <div className="flex items-center gap-2">
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      <span>{isCorrect ? "To'g'ri javob! +15 XP" : `Noto'g'ri. To'g'ri javob: ${currentTask.correctAnswer}`}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Next Task Button */}
            {(isAnswerSubmitted || speakingResult) && (
              <button
                onClick={handleNextTask}
                className="w-full py-3 rounded-xl font-bold text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 transition flex items-center justify-center gap-1.5"
              >
                <span>Keyingi mashq</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
