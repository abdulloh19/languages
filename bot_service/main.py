import asyncio
import json
import logging
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from aiogram import Bot, Dispatcher

from core.config import settings
from core.database import engine, Base, SessionLocal
from models.models import Word, Dialogue, DialogueLine, GrammarLesson
from data.words_seed import WORDS_SEED as WORDS_DATA
from data.dialogues_seed import DIALOGUES_DATA
from data.grammar_seed import GRAMMAR_LESSONS_DATA
from api.routes import router as api_router
from bot.handlers import router as bot_router

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(name)s - %(message)s")
logger = logging.getLogger("Tilsevar")

def seed_database_if_needed():
    """Seeds initial 150 words, 48 dialogues, and grammar lessons if empty."""
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        word_count = db.query(Word).count()
        if word_count == 0:
            logger.info("Seeding 150 words into database...")
            for w in WORDS_DATA:
                db_word = Word(
                    word=w["word"],
                    phonetic=w.get("phonetic"),
                    uzbek_meaning=w["uzbek_meaning"],
                    mnemonic_hook=w.get("mnemonic_hook"),
                    mnemonic_story=w.get("mnemonic_story"),
                    example_sentence=w["example_sentence"],
                    example_translation=w["example_translation"],
                    lang=w["lang"],
                    level=w["level"]
                )
                db.add(db_word)
            db.commit()
            logger.info("Words seeded successfully.")

        dialogue_count = db.query(Dialogue).count()
        if dialogue_count == 0:
            logger.info("Seeding dialogues into database...")
            for d in DIALOGUES_DATA:
                db_dialogue = Dialogue(
                    theme=d["theme"],
                    theme_title_uz=d["theme_title_uz"],
                    scenario_title=d["scenario_title"],
                    description_uz=d["description_uz"],
                    participants=d["participants"],
                    lang=d.get("lang", "en"),
                    level=d.get("level", "BEGINNER")
                )
                db.add(db_dialogue)
                db.flush()

                for line in d.get("lines", []):
                    db_line = DialogueLine(
                        dialogue_id=db_dialogue.id,
                        order_index=line["order_index"],
                        speaker=line["speaker"],
                        target_line=line["target_line"],
                        uzbek_translation=line["uzbek_translation"],
                        key_vocab_json=json.dumps(line.get("key_vocab", []))
                    )
                    db.add(db_line)
            db.commit()
            logger.info("Dialogues seeded successfully.")

        grammar_count = db.query(GrammarLesson).count()
        if grammar_count == 0:
            logger.info("Seeding grammar lessons...")
            for gl in GRAMMAR_LESSONS_DATA:
                db_gl = GrammarLesson(
                    level=gl["level"],
                    lang=gl["lang"],
                    order_index=gl["order_index"],
                    title=gl["title"],
                    title_uz=gl["title_uz"],
                    explanation_uz=gl["explanation_uz"],
                    formula=gl.get("formula"),
                    examples_json=gl.get("examples_json"),
                    sort_exercise_json=gl.get("sort_exercise_json")
                )
                db.add(db_gl)
            db.commit()
            logger.info("Grammar lessons seeded successfully.")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Initialize & Seed DB
    seed_database_if_needed()

    # 2. Start Bot Polling if token provided
    bot_task = None
    bot = None
    if settings.BOT_TOKEN and "dummy" not in settings.BOT_TOKEN.lower():
        try:
            bot = Bot(token=settings.BOT_TOKEN)
            dp = Dispatcher()
            dp.include_router(bot_router)

            # Drop pending updates and start polling in background
            await bot.delete_webhook(drop_pending_updates=True)
            bot_task = asyncio.create_task(dp.start_polling(bot))
            logger.info("Telegram Bot polling started successfully.")
        except Exception as e:
            logger.error(f"Failed to start Telegram Bot: {e}")

    yield

    # Teardown
    if bot_task:
        bot_task.cancel()
    if bot:
        await bot.session.close()

app = FastAPI(
    title="Tilsevar API",
    description="Backend API and Telegram Bot for Tilsevar language learning platform",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for Telegram WebApp and local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
def root_index():
    return {
        "app": "Tilsevar",
        "status": "online",
        "webapp_url": settings.WEBAPP_URL
    }

@app.api_route("/api/tunnel/update", methods=["GET", "POST"])
def update_tunnel_url(url: str):
    settings.WEBAPP_URL = url
    logger.info(f"Dynamically updated settings.WEBAPP_URL to: {url}")
    return {"status": "ok", "url": url}

@app.get("/health")
def health_check():
    return {"status": "ok", "app": "Tilsevar", "version": "1.0.0"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=False)
