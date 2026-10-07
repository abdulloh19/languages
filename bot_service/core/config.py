import os
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    BOT_TOKEN: str = "8808898451:AAEvTPKnGwNhJcatziSJ0YPIaEOVRYdXTFg"
    WEBAPP_URL: str = "https://transmission-span-museums-zoning.trycloudflare.com"
    DATABASE_URL: str = "sqlite:///./tilsevar.db"
    JWT_SECRET: str = "supersecret_tilsevar_jwt_key_2026_antigravity"
    HOST: str = "0.0.0.0"
    PORT: int = 8085
    AUDIO_CACHE_DIR: str = "./audio_cache"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"

settings = Settings()
