from datetime import datetime, timezone
from sqlalchemy import (
    Column, Integer, BigInteger, String, Text, Boolean, Float, DateTime, ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import relationship
from core.database import Base

def utc_now():
    return datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(BigInteger, unique=True, index=True, nullable=True)
    username = Column(String(100), nullable=True)
    first_name = Column(String(150), nullable=True)
    target_lang = Column(String(10), default="en") # "en" or "ru"
    current_level = Column(String(20), default="BEGINNER") # "BEGINNER", "INTERMEDIATE", "ADVANCED"
    xp = Column(Integer, default=0)
    streak_days = Column(Integer, default=1)
    longest_streak = Column(Integer, default=1)
    last_active_at = Column(DateTime, default=utc_now, onupdate=utc_now)
    created_at = Column(DateTime, default=utc_now)

    word_progresses = relationship("UserWordProgress", back_populates="user", cascade="all, delete-orphan")
    dialogue_progresses = relationship("UserDialogueProgress", back_populates="user", cascade="all, delete-orphan")
    exercise_results = relationship("ExerciseResult", back_populates="user", cascade="all, delete-orphan")


class Word(Base):
    __tablename__ = "words"

    id = Column(Integer, primary_key=True, index=True)
    word = Column(String(150), nullable=False, index=True)
    phonetic = Column(String(150), nullable=True)
    uzbek_meaning = Column(String(250), nullable=False)
    mnemonic_hook = Column(String(250), nullable=True)
    mnemonic_story = Column(Text, nullable=True)
    example_sentence = Column(Text, nullable=False)
    example_translation = Column(Text, nullable=False)
    lang = Column(String(10), nullable=False, index=True) # "en" or "ru"
    level = Column(String(20), nullable=False, index=True) # "BEGINNER", "INTERMEDIATE", "ADVANCED"

    progresses = relationship("UserWordProgress", back_populates="word", cascade="all, delete-orphan")


class UserWordProgress(Base):
    __tablename__ = "user_word_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    word_id = Column(Integer, ForeignKey("words.id", ondelete="CASCADE"), nullable=False, index=True)
    status = Column(String(20), default="NEW") # "NEW", "REVIEWING", "LEARNED"
    interval_days = Column(Integer, default=1)
    ease_factor = Column(Float, default=2.5)
    repetitions = Column(Integer, default=0)
    next_review_at = Column(DateTime, default=utc_now, index=True)
    last_reviewed_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="word_progresses")
    word = relationship("Word", back_populates="progresses")

    __table_args__ = (
        UniqueConstraint("user_id", "word_id", name="uq_user_word"),
    )


class Dialogue(Base):
    __tablename__ = "dialogues"

    id = Column(Integer, primary_key=True, index=True)
    theme = Column(String(50), nullable=False, index=True) # TAXI, HOTEL, RESTAURANT, AIRPORT, SHOPPING, DOCTOR, BANK, MIXED
    theme_title_uz = Column(String(100), nullable=False)
    scenario_title = Column(String(200), nullable=False)
    description_uz = Column(Text, nullable=False)
    participants = Column(String(150), nullable=False)
    lang = Column(String(10), default="en", index=True)
    level = Column(String(20), default="BEGINNER", index=True)

    lines = relationship("DialogueLine", back_populates="dialogue", order_by="DialogueLine.order_index", cascade="all, delete-orphan")
    progresses = relationship("UserDialogueProgress", back_populates="dialogue", cascade="all, delete-orphan")


class DialogueLine(Base):
    __tablename__ = "dialogue_lines"

    id = Column(Integer, primary_key=True, index=True)
    dialogue_id = Column(Integer, ForeignKey("dialogues.id", ondelete="CASCADE"), nullable=False, index=True)
    order_index = Column(Integer, nullable=False)
    speaker = Column(String(100), nullable=False)
    target_line = Column(Text, nullable=False)
    uzbek_translation = Column(Text, nullable=False)
    key_vocab_json = Column(Text, nullable=True) # JSON of key words and translations

    dialogue = relationship("Dialogue", back_populates="lines")


class UserDialogueProgress(Base):
    __tablename__ = "user_dialogue_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    dialogue_id = Column(Integer, ForeignKey("dialogues.id", ondelete="CASCADE"), nullable=False, index=True)
    current_line_index = Column(Integer, default=0)
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="dialogue_progresses")
    dialogue = relationship("Dialogue", back_populates="progresses")

    __table_args__ = (
        UniqueConstraint("user_id", "dialogue_id", name="uq_user_dialogue"),
    )


class ExerciseResult(Base):
    __tablename__ = "exercise_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    exercise_type = Column(String(50), nullable=False) # FLASHCARD, CHOICE, BUILDER, MATCH, QUIZ, GRAMMAR
    idempotency_key = Column(String(150), unique=True, index=True, nullable=False)
    score = Column(Integer, default=100)
    xp_earned = Column(Integer, default=10)
    mistakes_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="exercise_results")


class GrammarLesson(Base):
    __tablename__ = "grammar_lessons"

    id = Column(Integer, primary_key=True, index=True)
    level = Column(String(20), nullable=False, index=True)
    lang = Column(String(10), default="en", index=True)
    order_index = Column(Integer, default=1)
    title = Column(String(150), nullable=False)
    title_uz = Column(String(150), nullable=False)
    explanation_uz = Column(Text, nullable=False)
    formula = Column(String(200), nullable=True)
    examples_json = Column(Text, nullable=True)
    sort_exercise_json = Column(Text, nullable=True)
