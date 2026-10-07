export type Language = 'en' | 'ru';
export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type Tab = 'home' | 'lesson' | 'grammar' | 'games' | 'dialogues' | 'dictionary' | 'profile';

export interface User {
  id: number;
  telegram_id?: number | null;
  username?: string | null;
  first_name?: string | null;
  target_lang: Language;
  current_level: Level;
  xp: number;
  streak_days: number;
  longest_streak?: number;
  is_demo: boolean;
}

export interface Word {
  id: number;
  word: string;
  phonetic?: string;
  uzbek_meaning: string;
  mnemonic_hook?: string;
  mnemonic_story?: string;
  example_sentence: string;
  example_translation: string;
  lang: Language;
  level: Level;
  status: 'NEW' | 'REVIEWING' | 'LEARNED';
}

export interface KeyVocab {
  word: string;
  meaning: string;
}

export interface DialogueLine {
  id: number;
  order_index: number;
  speaker: string;
  target_line: string;
  uzbek_translation: string;
  key_vocab?: KeyVocab[];
}

export interface Dialogue {
  id: number;
  theme: string;
  theme_title_uz: string;
  scenario_title: string;
  description_uz: string;
  participants: string;
  lang: Language;
  level: Level;
  is_completed: boolean;
  current_line_index: number;
  lines: DialogueLine[];
}

export interface GrammarLesson {
  id: number;
  level: Level;
  lang: Language;
  order_index: number;
  title: string;
  title_uz: string;
  explanation_uz: string;
  formula?: string;
  examples: { [key: string]: string }[];
  sort_exercise?: {
    target_sentence: string;
    uzbek_translation: string;
    tokens: string[];
  };
}

export interface ProfileStats {
  id: number;
  telegram_id?: number | null;
  username?: string | null;
  first_name?: string | null;
  target_lang: Language;
  current_level: Level;
  xp: number;
  streak_days: number;
  longest_streak: number;
  total_words_learned: number;
  total_words_reviewing: number;
  total_words_new: number;
  en_learned: number;
  ru_learned: number;
  completed_dialogues_count: number;
  is_demo: boolean;
}
