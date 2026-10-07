import os
import hashlib
from pathlib import Path
from gtts import gTTS

AUDIO_CACHE_DIR = Path(__file__).resolve().parent.parent / "audio_cache"
AUDIO_CACHE_DIR.mkdir(parents=True, exist_ok=True)

def get_audio_path_for_text(text: str, lang: str = "en") -> Path:
    """
    Returns path to an MP3 file containing the TTS pronunciation for given text.
    If cached, returns the cached file path immediately.
    """
    clean_text = text.strip()
    # Cache key based on text and lang
    cache_key = hashlib.md5(f"{lang}:{clean_text.lower()}".encode("utf-8")).hexdigest()
    file_path = AUDIO_CACHE_DIR / f"{cache_key}.mp3"
    
    if not file_path.exists():
        try:
            # gTTS supports 'en' and 'ru'
            tts_lang = "ru" if lang == "ru" else "en"
            tts = gTTS(text=clean_text, lang=tts_lang, slow=False)
            tts.save(str(file_path))
        except Exception as e:
            # If network error or gTTS failure, we handle gracefully
            print(f"TTS generation error for '{clean_text}': {e}")
            return None
            
    return file_path
