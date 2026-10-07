import { User, Word, Dialogue, GrammarLesson, ProfileStats, Language, Level } from '../types';

const API_BASE_URL = typeof window !== 'undefined' ? '/api' : (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8085/api');

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (typeof window !== 'undefined') {
    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.initData && tg.initData.length > 0) {
      headers['X-Telegram-Init-Data'] = tg.initData;
    } else {
      headers['X-Demo-Mode'] = 'true';
    }
  }

  return headers;
}

export async function fetchCurrentUser(): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Foydalanuvchi maʼlumotlarini yuklab boʻlmadi');
  return res.json();
}

export async function updateUserPreferences(target_lang?: Language, current_level?: Level): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/user/preferences`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ target_lang, current_level }),
  });
  if (!res.ok) throw new Error('Sozlamalarni saqlab boʻlmadi');
  return res.json();
}

export async function fetchProfileStats(): Promise<ProfileStats> {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Profil statistikasini yuklab boʻlmadi');
  return res.json();
}

export async function fetchDailyLesson(): Promise<{ words: Word[]; target_lang: Language; current_level: Level }> {
  const res = await fetch(`${API_BASE_URL}/words/daily`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Kunlik darsni yuklab boʻlmadi');
  return res.json();
}

export async function reviewWord(word_id: number, quality: number): Promise<{ status: string; xp_added: number; total_xp: number }> {
  const res = await fetch(`${API_BASE_URL}/words/review`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ word_id, quality }),
  });
  if (!res.ok) throw new Error('Soʻz takrorini saqlab boʻlmadi');
  return res.json();
}

export async function resetWord(word_id: number): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE_URL}/words/reset`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ word_id, quality: 1 }),
  });
  if (!res.ok) throw new Error('Soʻzni qayta oʻrganishga oʻtkazib boʻlmadi');
  return res.json();
}

export async function fetchAllWords(params: {
  lang?: Language;
  level?: string;
  search?: string;
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<{ words: Word[]; total: number }> {
  const query = new URLSearchParams();
  if (params.lang) query.set('lang', params.lang);
  if (params.level && params.level !== 'ALL') query.set('level', params.level);
  if (params.search) query.set('search', params.search);
  if (params.status && params.status !== 'ALL') query.set('status', params.status);
  if (params.limit) query.set('limit', String(params.limit));
  if (params.offset) query.set('offset', String(params.offset));

  const res = await fetch(`${API_BASE_URL}/words/all?${query.toString()}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Lugʻatni yuklab boʻlmadi');
  return res.json();
}

export async function fetchDialogues(theme?: string): Promise<Dialogue[]> {
  const url = theme && theme !== 'ALL' ? `${API_BASE_URL}/dialogues?theme=${theme}` : `${API_BASE_URL}/dialogues`;
  const res = await fetch(url, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Dialoglarni yuklab boʻlmadi');
  return res.json();
}

export async function updateDialogueStep(dialogue_id: number, current_line_index: number): Promise<void> {
  await fetch(`${API_BASE_URL}/dialogues/step`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ dialogue_id, current_line_index }),
  });
}

export async function completeDialogue(dialogue_id: number, idempotency_key: string): Promise<{ xp_awarded: number; message: string }> {
  const res = await fetch(`${API_BASE_URL}/dialogues/complete`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ dialogue_id, idempotency_key }),
  });
  if (!res.ok) throw new Error('Dialogni yakunlab boʻlmadi');
  return res.json();
}

export async function fetchGrammarLessons(level?: Level): Promise<GrammarLesson[]> {
  const url = level ? `${API_BASE_URL}/grammar?level=${level}` : `${API_BASE_URL}/grammar`;
  const res = await fetch(url, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Grammatika darslarini yuklab boʻlmadi');
  return res.json();
}

export async function fetchExerciseContent(type: string): Promise<any> {
  const res = await fetch(`${API_BASE_URL}/exercises/content?exercise_type=${type}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Mashq savollarini yuklab boʻlmadi');
  return res.json();
}

export async function submitExercise(data: {
  exercise_type: string;
  idempotency_key: string;
  score: number;
  xp_earned: number;
  mistakes?: any[];
}): Promise<{ xp_awarded: number; total_xp: number; message: string }> {
  const res = await fetch(`${API_BASE_URL}/exercises/submit`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Mashq natijasini saqlab boʻlmadi');
  return res.json();
}

export function getTTSAudioUrl(text: string, lang: Language = 'en'): string {
  return `${API_BASE_URL}/tts?text=${encodeURIComponent(text)}&lang=${lang}`;
}
