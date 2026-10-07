import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, CheckCircle2, Play, ChevronRight, Volume2, ArrowLeft, Award, Lock } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function LessonsView({ onOpenWordStudy }) {
  const [selectedLevel, setSelectedLevel] = useState('Starter');
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const [vocabList, setVocabList] = useState([]);
  const [completedLessonIds, setCompletedLessonIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('completed_lessons') || '[1]');
    } catch {
      return [1];
    }
  });

  const levels = [
    { id: 'Starter', label: 'Starter', sub: 'Noldan', color: 'from-amber-500 to-orange-500' },
    { id: 'Beginner', label: 'Beginner', sub: 'Boshlang\'ich', color: 'from-sky-500 to-blue-600' },
    { id: 'Elementary', label: 'Elementary', sub: 'O\'rta-quyi', color: 'from-emerald-500 to-teal-600' },
    { id: 'Pre-Intermediate', label: 'Pre-Int', sub: 'O\'rta', color: 'from-purple-500 to-indigo-600' },
  ];

  useEffect(() => {
    setLoading(true);
    fetch(`/api/lessons?level=${selectedLevel}`)
      .then(res => res.json())
      .then(data => {
        setLessons(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [selectedLevel]);

  const handleSelectLesson = (lesson) => {
    speechService.playTapSound();
    setActiveLesson(lesson);
    // Fetch vocab for this lesson
    fetch(`/api/lessons/${lesson.id}/vocab`)
      .then(r => r.json())
      .then(data => setVocabList(data || []))
      .catch(() => setVocabList([]));
  };

  const handleCompleteLesson = (lessonId) => {
    speechService.playSuccessSound?.();
    const updated = Array.from(new Set([...completedLessonIds, lessonId]));
    setCompletedLessonIds(updated);
    localStorage.setItem('completed_lessons', JSON.stringify(updated));
    // Toggle checklist vocab task
    fetch('/api/checklist/toggle?userId=1&itemKey=vocab', { method: 'POST' }).catch(() => {});
    setActiveLesson(null);
  };

  const playWordAudio = (word, lang = 'en') => {
    speechService.speak(word, lang === 'ru' ? 'ru-RU' : 'en-US');
  };

  // If a lesson is actively open in reading/study mode
  if (activeLesson) {
    const isCompleted = completedLessonIds.includes(activeLesson.id);

    return (
      <div className="flex flex-col gap-5 pb-24 animate-in fade-in duration-300">
        {/* Back header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveLesson(null)}
            className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Darslar ro'yxatiga</span>
          </button>
          <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            {activeLesson.level} • Dars #{activeLesson.lessonOrder}
          </span>
        </div>

        {/* Lesson header card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-xl font-black text-white flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            {activeLesson.title}
          </h2>
          <p className="text-sm font-medium text-amber-400/90 mt-1">{activeLesson.titleUz}</p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{activeLesson.descriptionUz}</p>
        </div>

        {/* Grammar Rule Section */}
        {activeLesson.grammarRule && (
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80">
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              Grammatika Qoidasi
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              {activeLesson.grammarRule}
            </p>
            {activeLesson.grammarExample && (
              <div className="mt-3 p-3 rounded-xl bg-sky-950/30 border border-sky-800/30 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-sky-400 font-bold">Misol:</div>
                  <div className="text-xs font-semibold text-white mt-0.5">{activeLesson.grammarExample}</div>
                </div>
                <button
                  onClick={() => playWordAudio(activeLesson.grammarExample)}
                  className="p-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 transition"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Vocabulary for this lesson */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Darsdagi yangi so'zlar ({vocabList.length > 0 ? vocabList.length : '10+'})
            </h3>
            <span className="text-[11px] text-slate-500">Talaffuz uchun bosing</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(vocabList.length > 0 ? vocabList.slice(0, 10) : [
              { id: 1, wordEn: 'Hello', phoneticEn: '[həˈləʊ]', wordUz: 'Salom', exampleEn: 'Hello, world!' },
              { id: 2, wordEn: 'Welcome', phoneticEn: '[ˈwel.kəm]', wordUz: 'Xush kelibsiz', exampleEn: 'Welcome home' },
              { id: 3, wordEn: 'Friend', phoneticEn: '[frend]', wordUz: 'Do\'st', exampleEn: 'He is my best friend' },
              { id: 4, wordEn: 'Language', phoneticEn: '[ˈlæŋ.ɡwɪdʒ]', wordUz: 'Til', exampleEn: 'Language of knowledge' }
            ]).map((w) => (
              <div
                key={w.id}
                onClick={() => playWordAudio(w.wordEn || w.wordRu)}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/50 hover:bg-slate-900 transition flex items-center justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white group-hover:text-amber-400 transition">
                      {w.wordEn || w.wordRu}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">{w.phoneticEn || w.phoneticRu}</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-0.5">{w.wordUz}</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/60 group-hover:bg-amber-500/20 text-slate-400 group-hover:text-amber-400 transition">
                  <Volume2 className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mark completed button */}
        <button
          onClick={() => handleCompleteLesson(activeLesson.id)}
          className={`w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition shadow-lg ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Dars yakunlangan (Qayta topshirish)' : 'Darsni yakunlash va +30 XP olish'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-24">
      {/* Level selector tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {levels.map((lvl) => {
          const isActive = selectedLevel === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => {
                speechService.playTapSound();
                setSelectedLevel(lvl.id);
              }}
              className={`flex-1 min-w-[85px] py-2.5 px-3 rounded-2xl flex flex-col items-center gap-0.5 transition relative border ${
                isActive
                  ? 'bg-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-950/80 border-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`text-xs font-black ${isActive ? 'text-amber-400' : 'text-slate-300'}`}>
                {lvl.label}
              </span>
              <span className="text-[10px] text-slate-500">{lvl.sub}</span>
              {isActive && (
                <div className="absolute -bottom-1 w-6 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Level Summary Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-slate-900 border border-amber-500/20 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            {selectedLevel} Bosqichi
          </div>
          <div className="text-xs text-slate-300 mt-0.5">
            Grammatika, interaktiv lug'at va talaffuz amaliyoti
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-black text-white">
            {lessons.filter(l => completedLessonIds.includes(l.id)).length} / {lessons.length || 4}
          </div>
          <div className="text-[10px] text-emerald-400 font-semibold">Tugallandi</div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-500">
            <div className="w-7 h-7 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs">Darslar yuklanmoqda...</span>
          </div>
        ) : lessons.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 text-xs">
            Ushbu daraja uchun darslar tayyorlanmoqda...
          </div>
        ) : (
          lessons.map((lesson, idx) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => handleSelectLesson(lesson)}
                className={`p-4 rounded-2xl border transition flex items-center justify-between cursor-pointer group ${
                  isCompleted
                    ? 'bg-slate-900/40 border-emerald-500/20 hover:border-emerald-500/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 shadow-md'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-950 transition'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-amber-400 transition">
                        {lesson.title}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{lesson.titleUz}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400 group-hover:text-amber-400 transition">
                  <span className="text-[11px] font-semibold hidden sm:inline">
                    {isCompleted ? 'Takrorlash' : 'O\'rganish'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
