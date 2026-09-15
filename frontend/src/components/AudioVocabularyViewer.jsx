import React, { useState, useEffect } from 'react';
import { Volume2, BookOpen, Sparkles } from 'lucide-react';

export default function AudioVocabularyViewer({ topics }) {
  const [selectedTopicId, setSelectedTopicId] = useState(1);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    // Generate/fetch 20 words for current topic
    setLoading(true);
    // Fetch state for topic or sample words
    fetch(`/api/session/state?userId=1`)
      .then(r => r.json())
      .then(async () => {
        // Load words by sequentially querying or using topic data
        const list = [];
        for (let i = 1; i <= 20; i++) {
          // We can use the word getter
          list.push({
            id: i,
            wordOrder: i,
            topicId: selectedTopicId,
          });
        }
        setWords(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedTopicId]);

  const playWordAudio = (text, lang, id) => {
    setPlayingId(id);
    const audio = new Audio(`/api/tts/synthesize?text=${encodeURIComponent(text)}&lang=${lang}`);
    audio.play()
      .then(() => {
        audio.onended = () => setPlayingId(null);
      })
      .catch(() => setPlayingId(null));
  };

  const sampleVocab = {
    1: [
      { order: 1, en: "Family", ru: "Семья", uz: "Oila", phonetic: "[ˈfæm.əl.i]", ex: "This is my family" },
      { order: 2, en: "Parents", ru: "Родители", uz: "Ota-ona", phonetic: "[ˈpeə.rənts]", ex: "My parents are at home" },
      { order: 3, en: "Father", ru: "Отец", uz: "Ota", phonetic: "[ˈfɑː.ðər]", ex: "My father is a doctor" },
      { order: 4, en: "Mother", ru: "Мать", uz: "Ona", phonetic: "[ˈmʌð.ər]", ex: "Mother is cooking lunch" },
      { order: 5, en: "Brother", ru: "Брат", uz: "Aka / Uka", phonetic: "[ˈbrʌð.ər]", ex: "I have a brother" },
      { order: 6, en: "Sister", ru: "Сестра", uz: "Opa / Singil", phonetic: "[ˈsɪs.tər]", ex: "Sister is reading a book" },
      { order: 7, en: "Friend", ru: "Друг", uz: "Do'st", phonetic: "[frend]", ex: "He is my best friend" },
      { order: 8, en: "Grandfather", ru: "Дедушка", uz: "Bobo", phonetic: "[ˈɡræn.fɑː.ðər]", ex: "Grandfather tells stories" },
      { order: 9, en: "Grandmother", ru: "Бабушка", uz: "Buvi", phonetic: "[ˈɡræn.mʌð.ər]", ex: "Grandmother bakes a pie" },
      { order: 10, en: "Child", ru: "Ребёнок", uz: "Bola", phonetic: "[tʃaɪld]", ex: "The child plays outside" },
      { order: 11, en: "Son", ru: "Сын", uz: "O'g'il", phonetic: "[sʌn]", ex: "Their son goes to school" },
      { order: 12, en: "Daughter", ru: "Дочь", uz: "Qiz farzand", phonetic: "[ˈdɔː.tər]", ex: "The daughter learns English" },
      { order: 13, en: "Uncle", ru: "Дядя", uz: "Tog'a / Amaki", phonetic: "[ˈʌŋ.kəl]", ex: "Uncle came to visit" },
      { order: 14, en: "Aunt", ru: "Тётя", uz: "Xola / Amma", phonetic: "[ɑːnt]", ex: "Aunt lives in Tashkent" },
      { order: 15, en: "Cousin", ru: "Кузен", uz: "Amakivachcha", phonetic: "[ˈkʌz.ən]", ex: "My cousin and I are peers" },
      { order: 16, en: "Happiness", ru: "Счастье", uz: "Baxt", phonetic: "[ˈhæp.i.nəs]", ex: "Family is true happiness" },
      { order: 17, en: "Home", ru: "Дом", uz: "Uy", phonetic: "[həʊm]", ex: "Welcome to our home" },
      { order: 18, en: "Love", ru: "Любовь", uz: "Sevgi", phonetic: "[lʌv]", ex: "Love unites every family" },
      { order: 19, en: "Respect", ru: "Уважение", uz: "Hurmat", phonetic: "[rɪˈspekt]", ex: "Respect for your elders" },
      { order: 20, en: "Tradition", ru: "Традиция", uz: "An'ana", phonetic: "[trəˈdɪʃ.ən]", ex: "This is our family tradition" }
    ],
    2: [
      { order: 1, en: "Job", ru: "Работа", uz: "Ish", phonetic: "[dʒɒb]", ex: "I enjoy my job" },
      { order: 2, en: "Career", ru: "Карьера", uz: "Karyera", phonetic: "[kəˈrɪər]", ex: "Successful career" },
      { order: 3, en: "Office", ru: "Офис", uz: "Ofis", phonetic: "[ˈɒf.ɪs]", ex: "Downtown office" },
      { order: 4, en: "Colleague", ru: "Коллега", uz: "Hamkasb", phonetic: "[ˈkɒl.iːɡ]", ex: "Supportive colleague" },
      { order: 5, en: "Manager", ru: "Менеджер", uz: "Menejer", phonetic: "[ˈmæn.ɪ.dʒər]", ex: "The project manager" }
    ],
    3: [
      { order: 1, en: "Travel", ru: "Путешествие", uz: "Sayohat", phonetic: "[ˈtræv.əl]", ex: "I love to travel" },
      { order: 2, en: "Airport", ru: "Аэропорт", uz: "Aeroport", phonetic: "[ˈeə.pɔːt]", ex: "We are at the airport" },
      { order: 3, en: "Airplane", ru: "Самолёт", uz: "Samolyot", phonetic: "[ˈeə.pleɪn]", ex: "Airplane takes off" },
      { order: 4, en: "Passport", ru: "Паспорт", uz: "Pasport", phonetic: "[ˈpɑːs.pɔːt]", ex: "Have your passport ready" },
      { order: 5, en: "Hotel", ru: "Отель", uz: "Mehmonxona", phonetic: "[həʊˈtel]", ex: "Book a hotel room" }
    ],
    4: [
      { order: 1, en: "Food", ru: "Еда", uz: "Ovqat", phonetic: "[fuːd]", ex: "Delicious meal" },
      { order: 2, en: "Restaurant", ru: "Ресторан", uz: "Restoran", phonetic: "[ˈres.trɒnt]", ex: "Dinner at a restaurant" },
      { order: 3, en: "Menu", ru: "Меню", uz: "Menyu", phonetic: "[ˈmen.juː]", ex: "Look at the menu" },
      { order: 4, en: "Order", ru: "Заказ", uz: "Buyurtma", phonetic: "[ˈɔː.dər]", ex: "Place your order" },
      { order: 5, en: "Water", ru: "Вода", uz: "Suv", phonetic: "[ˈwɔː.tər]", ex: "Glass of fresh water" }
    ],
    5: [
      { order: 1, en: "Health", ru: "Здоровье", uz: "Salomatlik", phonetic: "[helθ]", ex: "Take care of your health" },
      { order: 2, en: "Doctor", ru: "Врач", uz: "Shifokor", phonetic: "[ˈdɒk.tər]", ex: "Visit the doctor" },
      { order: 3, en: "Hospital", ru: "Больница", uz: "Shifoxona", phonetic: "[ˈhɒs.pɪ.təl]", ex: "Modern city hospital" },
      { order: 4, en: "Medicine", ru: "Лекарство", uz: "Dori", phonetic: "[ˈmed.sən]", ex: "Take prescribed medicine" },
      { order: 5, en: "Sport", ru: "Спорт", uz: "Sport", phonetic: "[spɔːt]", ex: "Play morning sports" }
    ]
  };

  const currentTopicWords = sampleVocab[selectedTopicId] || sampleVocab[1];

  return (
    <div className="rounded-2xl glass-panel border border-slate-800 shadow-xl p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-sky-400" />
            Audio Vocabulary & Pronunciation Hub
          </h2>
          <p className="text-xs text-slate-400">
            Native-quality TTS pronunciation for all 20 daily words per thematic module.
          </p>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {topics?.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTopicId(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                selectedTopicId === t.id
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.titleEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Words Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentTopicWords.map((item) => (
          <div
            key={item.order}
            className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-sky-500/40 transition group relative space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Word #{item.order}
              </span>
              <button
                onClick={() => playWordAudio(item.en, 'EN', item.order)}
                className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 transition flex items-center gap-1 text-[11px] font-semibold"
                title="Pronounce Word"
              >
                <Volume2 className="w-3.5 h-3.5" />
                {playingId === item.order ? 'Playing...' : 'Audio'}
              </button>
            </div>

            <div>
              <div className="text-lg font-bold text-white group-hover:text-sky-300 transition">
                {item.en}
              </div>
              <div className="text-xs font-mono text-sky-400/90">{item.phonetic}</div>
            </div>

            <div className="text-xs space-y-0.5 pt-1 border-t border-slate-800/60">
              <div className="text-slate-300">🇷🇺 {item.ru}</div>
              <div className="text-slate-400">🇺🇿 {item.uz}</div>
            </div>

            <div className="text-[11px] text-slate-500 italic pt-1">
              "{item.ex}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
