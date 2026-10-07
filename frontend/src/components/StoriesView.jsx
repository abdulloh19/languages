import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Volume2, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Clock, Globe } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function StoriesView() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [activeStory, setActiveStory] = useState(null);
  const [storyPages, setStoryPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showUzbek, setShowUzbek] = useState(true);
  const [selectedWord, setSelectedWord] = useState(null);
  const [completedStoryIds, setCompletedStoryIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('completed_stories') || '[]');
    } catch {
      return [];
    }
  });

  const levels = ['ALL', 'Starter', 'Beginner', 'Elementary'];

  useEffect(() => {
    setLoading(true);
    fetch(`/api/stories?level=${selectedLevel}`)
      .then(res => res.json())
      .then(data => {
        setStories(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedLevel]);

  const handleOpenStory = (story) => {
    speechService.playTapSound();
    setActiveStory(story);
    setCurrentPageIndex(0);
    setSelectedWord(null);

    fetch(`/api/stories/${story.id}/pages`)
      .then(r => r.json())
      .then(pages => setStoryPages(pages || []))
      .catch(() => setStoryPages([]));
  };

  const handlePlayPageAudio = (text) => {
    speechService.speak(text, 'en-US');
  };

  const handleWordClick = (rawWord) => {
    const cleaned = rawWord.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "").trim();
    if (!cleaned) return;
    speechService.playTapSound();
    speechService.speak(cleaned, 'en-US');
    setSelectedWord(cleaned);
  };

  const handleFinishStory = () => {
    speechService.playSuccessSound?.();
    const updated = Array.from(new Set([...completedStoryIds, activeStory.id]));
    setCompletedStoryIds(updated);
    localStorage.setItem('completed_stories', JSON.stringify(updated));

    // Auto-mark checklist story as done
    fetch('/api/checklist/toggle?userId=1&itemKey=story', { method: 'POST' }).catch(() => {});
    setActiveStory(null);
  };

  // Active Story Reader Mode
  if (activeStory && storyPages.length > 0) {
    const currentPage = storyPages[currentPageIndex] || storyPages[0];
    const isLastPage = currentPageIndex === storyPages.length - 1;
    const words = currentPage.textEn ? currentPage.textEn.split(' ') : [];

    return (
      <div className="flex flex-col gap-5 pb-24 animate-in fade-in duration-300">
        {/* Navigation header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveStory(null)}
            className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Hikoyalar</span>
          </button>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <span>Sahifa {currentPageIndex + 1} / {storyPages.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-300"
            style={{ width: `${((currentPageIndex + 1) / storyPages.length) * 100}%` }}
          />
        </div>

        {/* Story Card */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h2 className="text-base font-black text-white">{activeStory.title}</h2>
              <span className="text-xs text-amber-400 font-medium">{activeStory.titleUz}</span>
            </div>
            <button
              onClick={() => handlePlayPageAudio(currentPage.textEn)}
              className="p-3 rounded-2xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
              title="Audioni tinglash"
            >
              <Volume2 className="w-4 h-4" />
              <span className="text-xs hidden sm:inline">Eshitish</span>
            </button>
          </div>

          {/* Interactive English Text with Word Translation on Click */}
          <div className="text-sm leading-relaxed text-slate-100 font-medium tracking-wide flex flex-wrap gap-x-1.5 gap-y-1 select-none">
            {words.map((w, idx) => {
              const cleaned = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "").trim();
              const isSelected = selectedWord && selectedWord.toLowerCase() === cleaned.toLowerCase();
              return (
                <span
                  key={idx}
                  onClick={() => handleWordClick(w)}
                  className={`cursor-pointer px-1 py-0.5 rounded transition ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'hover:bg-slate-800 hover:text-amber-300'
                  }`}
                >
                  {w}
                </span>
              );
            })}
          </div>

          {/* Word Translator Tooltip Bar */}
          {selectedWord && (
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between text-xs animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-amber-300">"{selectedWord}"</span>
                <span className="text-slate-400">talaffuz qilindi</span>
              </div>
              <button
                onClick={() => speechService.speak(selectedWord, 'en-US')}
                className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Qayta eshitish
              </button>
            </div>
          )}

          {/* Uzbek Translation Toggle */}
          <div className="border-t border-slate-800/80 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                O'zbekcha tarjimasi
              </span>
              <button
                onClick={() => setShowUzbek(!showUzbek)}
                className="text-[11px] text-sky-400 hover:underline font-semibold"
              >
                {showUzbek ? 'Yashirish' : 'Ko\'rsatish'}
              </button>
            </div>
            {showUzbek && (
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/70">
                {currentPage.textUz}
              </p>
            )}
          </div>
        </div>

        {/* Page Switcher Buttons */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
            disabled={currentPageIndex === 0}
            className="flex-1 py-3 rounded-xl font-bold text-xs bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            Oldingi
          </button>

          {isLastPage ? (
            <button
              onClick={handleFinishStory}
              className="flex-1 py-3 rounded-xl font-black text-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              Hikoyani yakunlash (+25 XP)
            </button>
          ) : (
            <button
              onClick={() => setCurrentPageIndex(currentPageIndex + 1)}
              className="flex-1 py-3 rounded-xl font-bold text-xs bg-amber-500 text-slate-950 hover:bg-amber-400 transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
            >
              Keyingi sahifa
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Stories Catalog
  return (
    <div className="flex flex-col gap-5 pb-24">
      {/* Level filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {levels.map((lvl) => {
          const isActive = selectedLevel === lvl;
          return (
            <button
              key={lvl}
              onClick={() => {
                speechService.playTapSound();
                setSelectedLevel(lvl);
              }}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition border ${
                isActive
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {lvl === 'ALL' ? 'Barcha hikoyalar' : lvl}
            </button>
          );
        })}
      </div>

      {/* Hero card for stories */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/20 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-black text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            Darajalashtirilgan Hikoyalar
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            So'zlarni bosib tarjimasini ko'ring va jonli audio bilan tinglang
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
          {stories.length} ta kitob
        </span>
      </div>

      {/* Stories Grid */}
      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-500">
          <div className="w-7 h-7 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs">Hikoyalar yuklanmoqda...</span>
        </div>
      ) : stories.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 text-xs">
          Hikoyalar topilmadi.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stories.map((st) => {
            const isCompleted = completedStoryIds.includes(st.id);
            return (
              <div
                key={st.id}
                onClick={() => handleOpenStory(st)}
                className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 overflow-hidden cursor-pointer group transition shadow-lg flex flex-col"
              >
                <div className="h-36 w-full relative overflow-hidden bg-slate-950">
                  <img
                    src={st.coverImage || 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600'}
                    alt={st.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur text-[10px] font-bold text-amber-400 border border-amber-500/30">
                    {st.level}
                  </div>
                  {isCompleted && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-emerald-500/90 text-slate-950 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      O'qilgan
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <h3 className="text-sm font-black text-white group-hover:text-amber-400 transition">
                      {st.title}
                    </h3>
                    <p className="text-xs text-amber-400/80 font-medium">{st.titleUz}</p>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {st.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {st.readTimeMinutes} daqiqa
                    </span>
                    <span className="font-bold text-amber-400 group-hover:underline flex items-center gap-1">
                      O'qish
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
