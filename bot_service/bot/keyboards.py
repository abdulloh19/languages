from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from core.config import settings

def get_main_start_keyboard() -> InlineKeyboardMarkup:
    """
    Inline keyboard according to user requirements:
    1. Super ilovani ochish (web_app)
    2. Kunlik dars
    3. Jonli dialoglar
    4. Mening natijam
    5. Yordam
    """
    webapp_url = settings.WEBAPP_URL or "https://example.com"
    kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🚀 Super ilovani ochish",
                    web_app=WebAppInfo(url=webapp_url)
                )
            ],
            [
                InlineKeyboardButton(text="📚 Kunlik dars", callback_data="btn_daily_lesson"),
                InlineKeyboardButton(text="💬 Jonli dialoglar", callback_data="btn_dialogues")
            ],
            [
                InlineKeyboardButton(text="🏆 Mening natijam", callback_data="btn_my_stats"),
                InlineKeyboardButton(text="❓ Yordam", callback_data="btn_help")
            ]
        ]
    )
    return kb

def get_back_to_menu_keyboard() -> InlineKeyboardMarkup:
    webapp_url = settings.WEBAPP_URL or "https://example.com"
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🚀 Ilovaga o'tish",
                    web_app=WebAppInfo(url=webapp_url)
                )
            ],
            [
                InlineKeyboardButton(text="◀️ Asosiy menyu", callback_data="btn_main_menu")
            ]
        ]
    )
