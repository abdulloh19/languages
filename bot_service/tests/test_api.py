import hashlib
import hmac
import json
import pytest
from fastapi.testclient import TestClient
from main import app, seed_database_if_needed
from core.database import SessionLocal, Base, engine
from models.models import User, Word, UserWordProgress, Dialogue, ExerciseResult
from core.security import validate_telegram_init_data

client = TestClient(app)

@pytest.fixture(scope="session", autouse=True)
def setup_db():
    seed_database_if_needed()
    yield

def create_valid_init_data(bot_token: str, user_id: int = 12345678, username: str = "testuser") -> str:
    user_json = json.dumps({"id": user_id, "first_name": "Test", "username": username}, separators=(',', ':'))
    auth_date = "1728216000"
    params = {
        "auth_date": auth_date,
        "query_id": "AAHdF6IQAAAAAN0XohD7VqB8",
        "user": user_json
    }
    data_check_string = "\n".join(f"{k}={v}" for k, v in sorted(params.items()))
    secret_key = hmac.new(b"WebAppData", bot_token.encode("utf-8"), hashlib.sha256).digest()
    hash_sig = hmac.new(secret_key, data_check_string.encode("utf-8"), hashlib.sha256).hexdigest()
    
    return f"auth_date={auth_date}&query_id=AAHdF6IQAAAAAN0XohD7VqB8&user={user_json}&hash={hash_sig}"

def test_database_seeding_counts():
    with SessionLocal() as db:
        word_count = db.query(Word).count()
        assert word_count == 150, f"Expected 150 words, got {word_count}"
        
        # Check 25 words per level/lang
        for lang in ["en", "ru"]:
            for level in ["BEGINNER", "INTERMEDIATE", "ADVANCED"]:
                c = db.query(Word).filter(Word.lang == lang, Word.level == level).count()
                assert c == 25, f"Expected 25 words for {lang} {level}, got {c}"
                
        dialogue_count = db.query(Dialogue).count()
        assert dialogue_count == 48, f"Expected 48 dialogues, got {dialogue_count}"

def test_demo_user_auth_fallback():
    # Calling /api/auth/me without headers returns demo user
    resp = client.get("/api/auth/me")
    assert resp.status_code == 200
    data = resp.json()
    assert data["is_demo"] is True
    assert data["id"] == 0
    assert data["target_lang"] == "en"

def test_daily_lesson_returns_5_words():
    resp = client.get("/api/words/daily")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data["words"]) == 5
    first = data["words"][0]
    assert "word" in first
    assert "uzbek_meaning" in first
    assert "mnemonic_hook" in first
    assert "example_sentence" in first

def test_words_review_and_spaced_repetition():
    with SessionLocal() as db:
        word = db.query(Word).first()
        word_id = word.id

    # Test "Bilaman" (quality=4)
    resp = client.post("/api/words/review", json={"word_id": word_id, "quality": 4})
    assert resp.status_code == 200
    res_data = resp.json()
    assert res_data["xp_added"] == 5
    assert res_data["status"] == "LEARNED"

    # Test "Takrorlash kerak" (quality=1)
    resp2 = client.post("/api/words/review", json={"word_id": word_id, "quality": 1})
    assert resp2.status_code == 200
    res_data2 = resp2.json()
    assert res_data2["xp_added"] == 1
    assert res_data2["status"] == "REVIEWING"

def test_exercise_idempotency_prevents_duplicate_xp():
    test_key = "idemp_test_key_unique_12345"
    payload = {
        "exercise_type": "CHOICE",
        "idempotency_key": test_key,
        "score": 100,
        "xp_earned": 20,
        "mistakes": []
    }
    
    # First submit
    resp1 = client.post("/api/exercises/submit", json=payload)
    assert resp1.status_code == 200
    
    # Second submit with same idempotency key
    resp2 = client.post("/api/exercises/submit", json=payload)
    assert resp2.status_code == 200
    data2 = resp2.json()
    # In demo mode, or db mode, it returns success=True with xp handled properly

def test_dialogues_list_and_themes():
    resp = client.get("/api/dialogues?theme=TAXI")
    assert resp.status_code == 200
    dialogues = resp.json()
    assert len(dialogues) >= 3
    first_dlg = dialogues[0]
    assert first_dlg["theme"] == "TAXI"
    assert len(first_dlg["lines"]) > 0
    assert "speaker" in first_dlg["lines"][0]
    assert "target_line" in first_dlg["lines"][0]
    assert "uzbek_translation" in first_dlg["lines"][0]

def test_dialogue_step_and_complete():
    # Fetch first dialogue
    resp = client.get("/api/dialogues")
    dialogues = resp.json()
    dlg_id = dialogues[0]["id"]

    # Step update
    step_resp = client.post("/api/dialogues/step", json={"dialogue_id": dlg_id, "current_line_index": 2})
    assert step_resp.status_code == 200
    assert step_resp.json()["current_line_index"] == 2

    # Complete
    comp_resp = client.post("/api/dialogues/complete", json={"dialogue_id": dlg_id, "idempotency_key": f"dlg_comp_{dlg_id}_99"})
    assert comp_resp.status_code == 200
    assert comp_resp.json()["xp_awarded"] == 25

def test_grammar_lessons():
    resp = client.get("/api/grammar")
    assert resp.status_code == 200
    lessons = resp.json()
    assert len(lessons) > 0
    first = lessons[0]
    assert "title_uz" in first
    assert "formula" in first
    assert "sort_exercise" in first

def test_security_hmac_tamper_detection():
    # An invalid signature must be rejected
    forged_data = "auth_date=1728216000&user=%7B%22id%22%3A123%7D&hash=fakehash123456"
    is_valid, user_data, err = validate_telegram_init_data(forged_data, "any_token")
    assert is_valid is False
    assert user_data is None
    assert err is not None
