import json
from datetime import datetime, timezone, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, Response
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from sqlalchemy import func, or_

from core.database import get_db
from core.security import get_current_user_from_auth
from models.models import (
    User, Word, UserWordProgress, Dialogue, DialogueLine, UserDialogueProgress, ExerciseResult, GrammarLesson
)
from schemas.schemas import (
    UserResponse, UpdatePreferencesRequest, WordResponse, DailyLessonResponse,
    WordReviewRequest, WordReviewResponse, ExerciseSubmission, ExerciseSubmissionResponse,
    DialogueResponse, DialogueLineResponse, DialogueStepRequest, DialogueCompleteRequest,
    GrammarLessonResponse, ProfileStatsResponse
)
from services.spaced_repetition import calculate_sm2
from services.tts_service import get_audio_path_for_text

router = APIRouter()

# ----------------- 1. AUTH & PROFILE -----------------

@router.get("/auth/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user_from_auth)):
    return current_user

@router.post("/user/preferences", response_model=UserResponse)
def update_user_preferences(
    req: UpdatePreferencesRequest,
    current_user: User = Depends(get_current_user_from_auth),
    db: Session = Depends(get_db)
):
    if not getattr(current_user, "is_demo", False):
        if req.target_lang in ["en", "ru"]:
            current_user.target_lang = req.target_lang
        if req.current_level in ["BEGINNER", "INTERMEDIATE", "ADVANCED"]:
            current_user.current_level = req.current_level
        db.commit()
        db.refresh(current_user)
    else:
        if req.target_lang:
            current_user.target_lang = req.target_lang
        if req.current_level:
            current_user.current_level = req.current_level
    return current_user

@router.get("/profile", response_model=ProfileStatsResponse)
def get_profile_stats(
    current_user: User = Depends(get_current_user_from_auth),
    db: Session = Depends(get_db)
):
    if getattr(current_user, "is_demo", False):
        return ProfileStatsResponse(
            id=current_user.id,
            telegram_id=current_user.telegram_id,
            username=current_user.username,
            first_name=current_user.first_name,
            target_lang=current_user.target_lang,
            current_level=current_user.current_level,
            xp=current_user.xp,
            streak_days=current_user.streak_days,
            longest_streak=current_user.longest_streak,
            total_words_learned=3,
            total_words_reviewing=2,
            total_words_new=20,
            en_learned=2,
            ru_learned=1,
            completed_dialogues_count=1,
            is_demo=True
        )

    # Calculate real statistics from database
    total_learned = db.query(UserWordProgress).filter(
        UserWordProgress.user_id == current_user.id,
        UserWordProgress.status == "LEARNED"
    ).count()

    total_reviewing = db.query(UserWordProgress).filter(
        UserWordProgress.user_id == current_user.id,
        UserWordProgress.status == "REVIEWING"
    ).count()

    # Total words in target language and level
    total_lang_words = db.query(Word).filter(
        Word.lang == current_user.target_lang,
        Word.level == current_user.current_level
    ).count()
    total_new = max(0, total_lang_words - (total_learned + total_reviewing))

    en_learned = db.query(UserWordProgress).join(Word).filter(
        UserWordProgress.user_id == current_user.id,
        UserWordProgress.status == "LEARNED",
        Word.lang == "en"
    ).count()

    ru_learned = db.query(UserWordProgress).join(Word).filter(
        UserWordProgress.user_id == current_user.id,
        UserWordProgress.status == "LEARNED",
        Word.lang == "ru"
    ).count()

    completed_dialogues = db.query(UserDialogueProgress).filter(
        UserDialogueProgress.user_id == current_user.id,
        UserDialogueProgress.is_completed == True
    ).count()

    return ProfileStatsResponse(
        id=current_user.id,
        telegram_id=current_user.telegram_id,
        username=current_user.username,
        first_name=current_user.first_name,
        target_lang=current_user.target_lang,
        current_level=current_user.current_level,
        xp=current_user.xp,
        streak_days=current_user.streak_days,
        longest_streak=current_user.longest_streak,
        total_words_learned=total_learned,
        total_words_reviewing=total_reviewing,
        total_words_new=total_new,
        en_learned=en_learned,
        ru_learned=ru_learned,
        completed_dialogues_count=completed_dialogues,
        is_demo=False
    )

# ----------------- 2. WORDS & DAILY LESSON -----------------

@router.get("/words/daily", response_model=DailyLessonResponse)
def get_daily_lesson(
    current_user: User = Depends(get_current_user_from_auth),
    db: Session = Depends(get_db)
):
    lang = current_user.target_lang
    level = current_user.current_level

    # Pick 12 words
    if getattr(current_user, "is_demo", False):
        demo_words = db.query(Word).filter(Word.lang == lang, Word.level == level).limit(12).all()
        res_words = [
            WordResponse(
                id=w.id,
                word=w.word,
                phonetic=w.phonetic,
                uzbek_meaning=w.uzbek_meaning,
                mnemonic_hook=w.mnemonic_hook,
                mnemonic_story=w.mnemonic_story,
                example_sentence=w.example_sentence,
                example_translation=w.example_translation,
                lang=w.lang,
                level=w.level,
                status="NEW"
            ) for w in demo_words
        ]
        return DailyLessonResponse(
            words=res_words,
            total_in_batch=len(res_words),
            target_lang=lang,
            current_level=level
        )

    # For real user: first check words due for review (SM-2)
    now = datetime.now(timezone.utc)
    review_progresses = db.query(UserWordProgress).join(Word).filter(
        UserWordProgress.user_id == current_user.id,
        Word.lang == lang,
        Word.level == level,
        UserWordProgress.next_review_at <= now
    ).limit(12).all()

    selected_words = []
    seen_ids = set()

    for p in review_progresses:
        w = p.word
        selected_words.append(
            WordResponse(
                id=w.id,
                word=w.word,
                phonetic=w.phonetic,
                uzbek_meaning=w.uzbek_meaning,
                mnemonic_hook=w.mnemonic_hook,
                mnemonic_story=w.mnemonic_story,
                example_sentence=w.example_sentence,
                example_translation=w.example_translation,
                lang=w.lang,
                level=w.level,
                status=p.status
            )
        )
        seen_ids.add(w.id)

    # If fewer than 12, fill with new words
    if len(selected_words) < 12:
        existing_word_ids = db.query(UserWordProgress.word_id).filter(
            UserWordProgress.user_id == current_user.id
        ).subquery()

        new_words = db.query(Word).filter(
            Word.lang == lang,
            Word.level == level,
            ~Word.id.in_(existing_word_ids)
        ).limit(12 - len(selected_words)).all()

        for w in new_words:
            if w.id not in seen_ids:
                selected_words.append(
                    WordResponse(
                        id=w.id,
                        word=w.word,
                        phonetic=w.phonetic,
                        uzbek_meaning=w.uzbek_meaning,
                        mnemonic_hook=w.mnemonic_hook,
                        mnemonic_story=w.mnemonic_story,
                        example_sentence=w.example_sentence,
                        example_translation=w.example_translation,
                        lang=w.lang,
                        level=w.level,
                        status="NEW"
                    )
                )
                seen_ids.add(w.id)

    # Fallback if user already studied all words in level
    if len(selected_words) < 12:
        more_words = db.query(Word).filter(Word.lang == lang, Word.level == level).limit(12).all()
        for w in more_words:
            if w.id not in seen_ids and len(selected_words) < 12:
                selected_words.append(
                    WordResponse(
                        id=w.id,
                        word=w.word,
                        phonetic=w.phonetic,
                        uzbek_meaning=w.uzbek_meaning,
                        mnemonic_hook=w.mnemonic_hook,
                        mnemonic_story=w.mnemonic_story,
                        example_sentence=w.example_sentence,
                        example_translation=w.example_translation,
                        lang=w.lang,
                        level=w.level,
                        status="LEARNED"
                    )
                )

    return DailyLessonResponse(
        words=selected_words,
        total_in_batch=len(selected_words),
        target_lang=lang,
        current_level=level
    )

@router.get("/words/all")
def get_all_words(
    lang: Optional[str] = None,
    level: Optional[str] = None,
    search: Optional[str] = None,
    status: Optional[str] = None, # ALL, NEW, REVIEWING, LEARNED
    limit: int = 50,
    offset: int = 0,
    current_user: User = Depends(get_current_user_from_auth),
    db: Session = Depends(get_db)
):
    target_lang = lang or current_user.target_lang
    query = db.query(Word).filter(Word.lang == target_lang)

    if level and level != "ALL":
        query = query.filter(Word.level == level)

    if search:
        s = f"%{search.strip().lower()}%"
        query = query.filter(or_(
            func.lower(Word.word).like(s),
            func.lower(Word.uzbek_meaning).like(s)
        ))

    words = query.offset(offset).limit(limit).all()

    # Fetch user progresses
    progress_map = {}
    if not getattr(current_user, "is_demo", False):
        word_ids = [w.id for w in words]
        progresses = db.query(UserWordProgress).filter(
            UserWordProgress.user_id == current_user.id,
            UserWordProgress.word_id.in_(word_ids)
        ).all()
        progress_map = {p.word_id: p.status for p in progresses}

    results = []
    for w in words:
        st = progress_map.get(w.id, "NEW")
        if status and status != "ALL" and st != status:
            continue
        results.append({
            "id": w.id,
            "word": w.word,
            "phonetic": w.phonetic,
            "uzbek_meaning": w.uzbek_meaning,
            "mnemonic_hook": w.mnemonic_hook,
            "mnemonic_story": w.mnemonic_story,
            "example_sentence": w.example_sentence,
            "example_translation": w.example_translation,
            "lang": w.lang,
            "level": w.level,
            "status": st
        })

    return {
        "words": results,
        "total": len(results),
        "target_lang": target_lang
    }

@router.post("/words/review", response_model=WordReviewResponse)
def review_word(
    req: WordReviewRequest,
    current_user: User = Depends(get_current_user_from_auth),
    db: Session = Depends(get_db)
):
    word = db.query(Word).filter(Word.id == req.word_id).first()
    if not word:
        raise HTTPException(status_code=404, detail="So'z topilmadi")

    xp_gain = 5 if req.quality >= 4 else 1

    if getattr(current_user, "is_demo", False):
        current_user.xp += xp_gain
        return WordReviewResponse(
            word_id=req.word_id,
            status="LEARNED" if req.quality >= 4 else "REVIEWING",
            interval_days=3 if req.quality >= 4 else 1,
            repetitions=1,
            xp_added=xp_gain,
            total_xp=current_user.xp
        )

    # Get or create UserWordProgress
    prog = db.query(UserWordProgress).filter(
        UserWordProgress.user_id == current_user.id,
        UserWordProgress.word_id == req.word_id
    ).first()

    if not prog:
        prog = UserWordProgress(
            user_id=current_user.id,
            word_id=req.word_id,
            status="NEW",
            interval_days=1,
            ease_factor=2.5,
            repetitions=0
        )
        db.add(prog)

    sm2_res = calculate_sm2(
        repetitions=prog.repetitions,
        interval_days=prog.interval_days,
        ease_factor=prog.ease_factor,
        quality=req.quality
    )

    prog.repetitions = sm2_res["repetitions"]
    prog.interval_days = sm2_res["interval_days"]
    prog.ease_factor = sm2_res["ease_factor"]
    prog.status = sm2_res["status"]
    prog.next_review_at = sm2_res["next_review_at"]
    prog.last_reviewed_at = sm2_res["last_reviewed_at"]

    current_user.xp += xp_gain
    db.commit()
    db.refresh(current_user)

    return WordReviewResponse(
        word_id=req.word_id,
        status=prog.status,
        interval_days=prog.interval_days,
        repetitions=prog.repetitions,
        xp_added=xp_gain,
        total_xp=current_user.xp
    )

@router.post("/words/reset")
def reset_word_progress(
    req: WordReviewRequest,
    current_user: User = Depends(get_current_user_from_auth),
    db: Session = Depends(get_db)
):
    if not getattr(current_user, "is_demo", False):
        prog = db.query(UserWordProgress).filter(
            UserWordProgress.user_id == current_user.id,
            UserWordProgress.word_id == req.word_id
        ).first()
        if prog:
            prog.status = "NEW"
            prog.repetitions = 0
            prog.interval_days = 1
            prog.ease_factor = 2.5
            prog.next_review_at = datetime.now(timezone.utc)
            db.commit()
    return {"success": True, "message": "So'z qayta o'rganish uchun belgilandi"}

# ----------------- 3. EXERCISES & GAMES -----------------

@router.get("/exercises/content")
def get_exercises_content(
    exercise_type: str = Query(..., description="FLASHCARD, CHOICE, BUILDER, MATCH, QUIZ"),
    current_user: User = Depends(get_current_user_from_auth),
    db: Session = Depends(get_db)
):
    lang = current_user.target_lang
    level = current_user.current_level

    # Pull 10 words for games
    words = db.query(Word).filter(Word.lang == lang, Word.level == level).limit(15).all()
    if not words:
        words = db.query(Word).filter(Word.lang == lang).limit(15).all()

    import random

    if exercise_type == "FLASHCARD":
        items = [{
            "id": w.id,
            "front": w.word,
            "phonetic": w.phonetic,
            "back": w.uzbek_meaning,
            "example": w.example_sentence,
            "example_translation": w.example_translation,
            "mnemonic": w.mnemonic_story
        } for w in words[:8]]
        return {"type": "FLASHCARD", "items": items}

    elif exercise_type == "CHOICE":
        questions = []
        for w in words[:10]:
            all_meanings = [other.uzbek_meaning for other in words if other.id != w.id]
            wrong_choices = random.sample(all_meanings, min(3, len(all_meanings)))
            choices = wrong_choices + [w.uzbek_meaning]
            random.shuffle(choices)
            questions.append({
                "word_id": w.id,
                "question": f"«{w.word}» so'zining to'g'ri ma'nosi nima?",
                "correct_answer": w.uzbek_meaning,
                "options": choices
            })
        return {"type": "CHOICE", "questions": questions}

    elif exercise_type == "BUILDER":
        items = []
        for w in words[:5]:
            # Use example sentence
            clean_sentence = w.example_sentence.replace(".", "").replace(",", "").replace("!", "").replace("?", "")
            tokens = clean_sentence.split()
            shuffled_tokens = list(tokens)
            random.shuffle(shuffled_tokens)
            items.append({
                "word_id": w.id,
                "target_sentence": clean_sentence,
                "uzbek_translation": w.example_translation,
                "tokens": shuffled_tokens
            })
        return {"type": "BUILDER", "items": items}

    elif exercise_type == "MATCH":
        selected = words[:6]
        left_items = [{"id": w.id, "text": w.word} for w in selected]
        right_items = [{"id": w.id, "text": w.uzbek_meaning} for w in selected]
        random.shuffle(left_items)
        random.shuffle(right_items)
        return {"type": "MATCH", "left_items": left_items, "right_items": right_items}

    elif exercise_type == "QUIZ":
        quiz_items = []
        for w in words[:10]:
            all_words = [other.word for other in words if other.id != w.id]
            wrong_opts = random.sample(all_words, min(3, len(all_words)))
            opts = wrong_opts + [w.word]
            random.shuffle(opts)
            quiz_items.append({
                "word_id": w.id,
                "question": f"O'zbekcha «{w.uzbek_meaning}» so'zining tarjimasi qaysi?",
                "correct_answer": w.word,
                "options": opts
            })
        return {"type": "QUIZ", "questions": quiz_items}

    return {"error": "Noma'lum mashq turi"}

@router.post("/exercises/submit", response_model=ExerciseSubmissionResponse)
def submit_exercise_result(
    sub: ExerciseSubmission,
    current_user: User = Depends(get_current_user_from_auth),
    db: Session = Depends(get_db)
):
    if getattr(current_user, "is_demo", False):
        current_user.xp += sub.xp_earned
        return ExerciseSubmissionResponse(
            success=True,
            xp_awarded=sub.xp_earned,
            total_xp=current_user.xp,
            streak_days=current_user.streak_days,
            message="Mashq demo rejimida muvaffaqiyatli yakunlandi!"
        )

    # Check idempotency to prevent duplicate score awards
    existing = db.query(ExerciseResult).filter(
        ExerciseResult.idempotency_key == sub.idempotency_key
    ).first()

    if existing:
        return ExerciseSubmissionResponse(
            success=True,
            xp_awarded=0,
            total_xp=current_user.xp,
            streak_days=current_user.streak_days,
            message="Ushbu mashq natijasi allaqachon hisoblangan."
        )

    # Save new exercise result
    new_result = ExerciseResult(
        user_id=current_user.id,
        exercise_type=sub.exercise_type,
        idempotency_key=sub.idempotency_key,
        score=sub.score,
        xp_earned=sub.xp_earned,
        mistakes_json=json.dumps(sub.mistakes) if sub.mistakes else None
    )
    db.add(new_result)

    # Check streak update
    now = datetime.now(timezone.utc)
    if current_user.last_active_at:
        days_diff = (now.date() - current_user.last_active_at.date()).days
        if days_diff == 1:
            current_user.streak_days += 1
            if current_user.streak_days > current_user.longest_streak:
                current_user.longest_streak = current_user.streak_days
        elif days_diff > 1:
            current_user.streak_days = 1

    current_user.xp += sub.xp_earned
    current_user.last_active_at = now
    db.commit()
    db.refresh(current_user)

    return ExerciseSubmissionResponse(
        success=True,
        xp_awarded=sub.xp_earned,
        total_xp=current_user.xp,
        streak_days=current_user.streak_days,
        message="Ajoyib natija! Ballar muvaffaqiyatli saqlandi."
    )

# ----------------- 4. DIALOGUES -----------------

@router.get("/dialogues", response_model=List[DialogueResponse])
def get_dialogues_list(
    theme: Optional[str] = None,
    current_user: User = Depends(get_current_user_from_auth),
    db: Session = Depends(get_db)
):
    lang = current_user.target_lang
    query = db.query(Dialogue).filter(Dialogue.lang == lang)
    if theme and theme != "ALL":
        query = query.filter(Dialogue.theme == theme)

    dialogues = query.all()

    # Get user progress map
    prog_map = {}
    if not getattr(current_user, "is_demo", False):
        progs = db.query(UserDialogueProgress).filter(
            UserDialogueProgress.user_id == current_user.id
        ).all()
        prog_map = {p.dialogue_id: p for p in progs}

    res = []
    for d in dialogues:
        prog = prog_map.get(d.id)
        is_completed = prog.is_completed if prog else False
        line_idx = prog.current_line_index if prog else 0

        line_responses = []
        for line in d.lines:
            vocab = json.loads(line.key_vocab_json) if line.key_vocab_json else []
            line_responses.append(DialogueLineResponse(
                id=line.id,
                order_index=line.order_index,
                speaker=line.speaker,
                target_line=line.target_line,
                uzbek_translation=line.uzbek_translation,
                key_vocab=vocab
            ))

        res.append(DialogueResponse(
            id=d.id,
            theme=d.theme,
            theme_title_uz=d.theme_title_uz,
            scenario_title=d.scenario_title,
            description_uz=d.description_uz,
            participants=d.participants,
            lang=d.lang,
            level=d.level,
            is_completed=is_completed,
            current_line_index=line_idx,
            lines=line_responses
        ))

    return res

@router.get("/dialogues/{dialogue_id}", response_model=DialogueResponse)
def get_single_dialogue(
    dialogue_id: int,
    current_user: User = Depends(get_current_user_from_auth),
    db: Session = Depends(get_db)
):
    d = db.query(Dialogue).filter(Dialogue.id == dialogue_id).first()
    if not d:
        raise HTTPException(status_code=404, detail="Dialog topilmadi")

    is_completed = False
    current_line_index = 0

    if not getattr(current_user, "is_demo", False):
        prog = db.query(UserDialogueProgress).filter(
            UserDialogueProgress.user_id == current_user.id,
            UserDialogueProgress.dialogue_id == dialogue_id
        ).first()
        if prog:
            is_completed = prog.is_completed
            current_line_index = prog.current_line_index

    line_responses = []
    for line in d.lines:
        vocab = json.loads(line.key_vocab_json) if line.key_vocab_json else []
        line_responses.append(DialogueLineResponse(
            id=line.id,
            order_index=line.order_index,
            speaker=line.speaker,
            target_line=line.target_line,
            uzbek_translation=line.uzbek_translation,
            key_vocab=vocab
        ))

    return DialogueResponse(
        id=d.id,
        theme=d.theme,
        theme_title_uz=d.theme_title_uz,
        scenario_title=d.scenario_title,
        description_uz=d.description_uz,
        participants=d.participants,
        lang=d.lang,
        level=d.level,
        is_completed=is_completed,
        current_line_index=current_line_index,
        lines=line_responses
    )

@router.post("/dialogues/step")
def update_dialogue_step(
    req: DialogueStepRequest,
    current_user: User = Depends(get_current_user_from_auth),
    db: Session = Depends(get_db)
):
    if getattr(current_user, "is_demo", False):
        return {"success": True, "current_line_index": req.current_line_index}

    prog = db.query(UserDialogueProgress).filter(
        UserDialogueProgress.user_id == current_user.id,
        UserDialogueProgress.dialogue_id == req.dialogue_id
    ).first()

    if not prog:
        prog = UserDialogueProgress(
            user_id=current_user.id,
            dialogue_id=req.dialogue_id,
            current_line_index=req.current_line_index
        )
        db.add(prog)
    else:
        prog.current_line_index = req.current_line_index

    db.commit()
    return {"success": True, "current_line_index": req.current_line_index}

@router.post("/dialogues/complete")
def complete_dialogue(
    req: DialogueCompleteRequest,
    current_user: User = Depends(get_current_user_from_auth),
    db: Session = Depends(get_db)
):
    if getattr(current_user, "is_demo", False):
        current_user.xp += 25
        return {
            "success": True,
            "xp_awarded": 25,
            "total_xp": current_user.xp,
            "message": "Dialog yakunlandi!"
        }

    # Check idempotency for completion reward
    existing_result = db.query(ExerciseResult).filter(
        ExerciseResult.idempotency_key == req.idempotency_key
    ).first()

    if existing_result:
        return {
            "success": True,
            "xp_awarded": 0,
            "total_xp": current_user.xp,
            "message": "Ushbu dialog avval yakunlangan."
        }

    prog = db.query(UserDialogueProgress).filter(
        UserDialogueProgress.user_id == current_user.id,
        UserDialogueProgress.dialogue_id == req.dialogue_id
    ).first()

    if not prog:
        prog = UserDialogueProgress(
            user_id=current_user.id,
            dialogue_id=req.dialogue_id,
            current_line_index=100,
            is_completed=True,
            completed_at=datetime.now(timezone.utc)
        )
        db.add(prog)
    else:
        prog.is_completed = True
        prog.completed_at = datetime.now(timezone.utc)

    # Award 25 XP
    xp_gain = 25
    record = ExerciseResult(
        user_id=current_user.id,
        exercise_type="DIALOGUE",
        idempotency_key=req.idempotency_key,
        score=100,
        xp_earned=xp_gain
    )
    db.add(record)

    current_user.xp += xp_gain
    db.commit()
    db.refresh(current_user)

    return {
        "success": True,
        "xp_awarded": xp_gain,
        "total_xp": current_user.xp,
        "message": "Tabriklaymiz! Dialog muvaffaqiyatli yakunlandi (+25 XP)!"
    }

# ----------------- 5. GRAMMAR -----------------

@router.get("/grammar", response_model=List[GrammarLessonResponse])
def get_grammar_lessons(
    level: Optional[str] = None,
    current_user: User = Depends(get_current_user_from_auth),
    db: Session = Depends(get_db)
):
    lang = current_user.target_lang
    lvl = level or current_user.current_level

    lessons = db.query(GrammarLesson).filter(
        GrammarLesson.lang == lang,
        GrammarLesson.level == lvl
    ).order_by(GrammarLesson.order_index).all()

    # Fallback to all lessons for the language if empty for specific level
    if not lessons:
        lessons = db.query(GrammarLesson).filter(
            GrammarLesson.lang == lang
        ).order_by(GrammarLesson.order_index).all()

    res = []
    for gl in lessons:
        ex = json.loads(gl.examples_json) if gl.examples_json else []
        sort_ex = json.loads(gl.sort_exercise_json) if gl.sort_exercise_json else None
        res.append(GrammarLessonResponse(
            id=gl.id,
            level=gl.level,
            lang=gl.lang,
            order_index=gl.order_index,
            title=gl.title,
            title_uz=gl.title_uz,
            explanation_uz=gl.explanation_uz,
            formula=gl.formula,
            examples=ex,
            sort_exercise=sort_ex
        ))
    return res

# ----------------- 6. TTS AUDIO -----------------

@router.get("/tts")
def stream_tts_audio(
    text: str = Query(..., min_length=1, max_length=200),
    lang: str = Query("en", regex="^(en|ru)$")
):
    audio_path = get_audio_path_for_text(text, lang)
    if not audio_path or not audio_path.exists():
        raise HTTPException(status_code=500, detail="Audio faylni yaratib bo'lmadi")

    return FileResponse(
        path=str(audio_path),
        media_type="audio/mpeg",
        filename=f"{text[:20]}.mp3"
    )
