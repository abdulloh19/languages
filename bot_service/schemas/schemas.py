from typing import Optional, List, Any
from pydantic import BaseModel, Field

class UserResponse(BaseModel):
    id: int
    telegram_id: Optional[int] = None
    username: Optional[str] = None
    first_name: Optional[str] = None
    target_lang: str
    current_level: str
    xp: int
    streak_days: int
    is_demo: bool = False

    class Config:
        from_attributes = True

class UpdatePreferencesRequest(BaseModel):
    target_lang: Optional[str] = None # "en" or "ru"
    current_level: Optional[str] = None # "BEGINNER", "INTERMEDIATE", "ADVANCED"

class WordResponse(BaseModel):
    id: int
    word: str
    phonetic: Optional[str] = None
    uzbek_meaning: str
    mnemonic_hook: Optional[str] = None
    mnemonic_story: Optional[str] = None
    example_sentence: str
    example_translation: str
    lang: str
    level: str
    status: str = "NEW" # "NEW", "REVIEWING", "LEARNED"

    class Config:
        from_attributes = True

class DailyLessonResponse(BaseModel):
    words: List[WordResponse]
    total_in_batch: int
    target_lang: str
    current_level: str

class WordReviewRequest(BaseModel):
    word_id: int
    quality: int = Field(..., ge=0, le=5) # 1 = Takrorlash kerak, 4 = Bilaman

class WordReviewResponse(BaseModel):
    word_id: int
    status: str
    interval_days: int
    repetitions: int
    xp_added: int
    total_xp: int

class ExerciseSubmission(BaseModel):
    exercise_type: str # FLASHCARD, CHOICE, BUILDER, MATCH, QUIZ, GRAMMAR
    idempotency_key: str
    score: int
    xp_earned: int
    mistakes: Optional[List[dict]] = None

class ExerciseSubmissionResponse(BaseModel):
    success: bool
    xp_awarded: int
    total_xp: int
    streak_days: int
    message: str

class DialogueLineResponse(BaseModel):
    id: int
    order_index: int
    speaker: str
    target_line: str
    uzbek_translation: str
    key_vocab: Optional[List[dict]] = None

class DialogueResponse(BaseModel):
    id: int
    theme: str
    theme_title_uz: str
    scenario_title: str
    description_uz: str
    participants: str
    lang: str
    level: str
    is_completed: bool = False
    current_line_index: int = 0
    lines: List[DialogueLineResponse]

class DialogueStepRequest(BaseModel):
    dialogue_id: int
    current_line_index: int

class DialogueCompleteRequest(BaseModel):
    dialogue_id: int
    idempotency_key: str

class GrammarLessonResponse(BaseModel):
    id: int
    level: str
    lang: str
    order_index: int
    title: str
    title_uz: str
    explanation_uz: str
    formula: Optional[str] = None
    examples: List[dict] = []
    sort_exercise: Optional[dict] = None

class ProfileStatsResponse(BaseModel):
    id: int
    telegram_id: Optional[int]
    username: Optional[str]
    first_name: Optional[str]
    target_lang: str
    current_level: str
    xp: int
    streak_days: int
    longest_streak: int
    total_words_learned: int
    total_words_reviewing: int
    total_words_new: int
    en_learned: int
    ru_learned: int
    completed_dialogues_count: int
    is_demo: bool = False
