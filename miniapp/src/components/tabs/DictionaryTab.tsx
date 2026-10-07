'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  BookMarked, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Filter,
  X
} from 'lucide-react';
import { Word, User, Language, Level } from '../../types';
import { fetchAllWords, resetWord, getTTSAudioUrl } from '../../lib/api';

interface DictionaryTabProps {
  user: User | null;
  onRefreshUser: () => void;
}

export const DictionaryTab: React.FC<DictionaryTabProps> = ({ user, onRefreshUser }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState<string>('ALL');
  const [status, setStatus] = useState<string>('ALL');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadWords();
  }, [user?.target_lang, level, status, search]);

  const loadWords = async () => {
    setLoading(true);
    try {
      const data = await fetchAllWords({
        lang: user?.target_lang,
        level,
        status,
        search,
        limit: 100,
      });
      setWords(data.words);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (text: string) => {
    const lang = user?.target_lang || 'en';
    const url = getTTSAudioUrl(text, lang);
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
    } else {
      audioRef.current.src = url;
    }
    audioRef.current.play().catch(console.warn);
  };

  const handleReset = async (wordId: number) => {
    try {
      await resetWord(wordId);
      loadWords();
      onRefreshUser();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      <div>
        <h2 className="text-lg font-black tracking-tight">Lug‘at va So‘zlar Bazasi</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          O‘rgangan so‘zlaringizni qidiring, takrorlang yoki qayta o‘rganishga belgilang.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="So‘z yoki tarjimasi bo‘yicha qidiring..."
          className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filters Strip */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {/* Status Filters */}
        <button
          onClick={() => setStatus('ALL')}
          className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition ${
            status === 'ALL'
              ? 'bg-indigo-600 text-white'
              : 'glass-card text-slate-600 dark:text-slate-300'
          }`}
        >
          Barchasi
        </button>
        <button
          onClick={() => setStatus('LEARNED')}
          className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition ${
            status === 'LEARNED'
              ? 'bg-emerald-600 text-white'
              : 'glass-card text-slate-600 dark:text-slate-300'
          }`}
        >
          Yodlangan
        </button>
        <button
          onClick={() => setStatus('REVIEWING')}
          className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition ${
            status === 'REVIEWING'
              ? 'bg-amber-600 text-white'
              : 'glass-card text-slate-600 dark:text-slate-300'
          }`}
        >
          Takrorlanmoqda
        </button>
        <button
          onClick={() => setStatus('NEW')}
          className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition ${
            status === 'NEW'
              ? 'bg-blue-600 text-white'
              : 'glass-card text-slate-600 dark:text-slate-300'
          }`}
        >
          Yangi
        </button>
      </div>

      {/* Level Filters */}
      <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-slate-500">
        <Filter className="w-3.5 h-3.5" />
        <span>Daraja:</span>
        {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className={`px-2 py-0.5 rounded-md ${
              level === lvl ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold' : ''
            }`}
          >
            {lvl === 'ALL' ? 'Hammasi' : lvl}
          </button>
        ))}
      </div>

      {/* Word List */}
      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400">Yuklanmoqda...</div>
      ) : words.length === 0 ? (
        <div className="glass-card p-8 rounded-2xl text-center space-y-2">
          <BookMarked className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-xs font-bold">Mos keluvchi so‘z topilmadi</h4>
          <p className="text-[11px] text-slate-500">Filtrlarni o‘zgartirib ko‘ring.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {words.map((w) => (
            <div
              key={w.id}
              className="glass-card p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 space-y-2 hover:border-indigo-400 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      {w.word}
                    </h3>
                    {w.phonetic && (
                      <span className="text-[11px] font-mono text-indigo-500">
                        {w.phonetic}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {w.uzbek_meaning}
                  </p>
                </div>

                <div className="flex items-center space-x-1.5">
                  {/* Status Badge */}
                  {w.status === 'LEARNED' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      Yodlangan
                    </span>
                  )}
                  {w.status === 'REVIEWING' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                      Takrorlanmoqda
                    </span>
                  )}
                  {w.status === 'NEW' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      Yangi
                    </span>
                  )}

                  {/* Audio */}
                  <button
                    onClick={() => playAudio(w.word)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800"
                    title="Talaffuz"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mnemonic Hook */}
              {w.mnemonic_hook && (
                <div className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50/60 dark:bg-amber-950/30 p-2 rounded-lg flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Eslash siri: <b>{w.mnemonic_hook}</b></span>
                </div>
              )}

              {/* Example sentence */}
              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                <p>"{w.example_sentence}"</p>
                <p className="italic text-slate-500 mt-0.5">— {w.example_translation}</p>
              </div>

              {/* Re-learn button */}
              <div className="pt-1 flex justify-end">
                <button
                  onClick={() => handleReset(w.id)}
                  className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Qayta o‘rganish</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
