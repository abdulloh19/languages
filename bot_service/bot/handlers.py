from datetime import datetime, timezone
from aiogram import Router, F
from aiogram.filters import CommandStart, Command
from aiogram.types import Message, CallbackQuery
from sqlalchemy.orm import Session

from core.database import SessionLocal
from models.models import User, Word, UserWordProgress
from bot.keyboards import get_main_start_keyboard, get_back_to_menu_keyboard

router = Router()

def get_or_create_user(session: Session, telegram_id: int, username: str = None, first_name: str = None) -> User:
    user = session.query(User).filter(User.telegram_id == telegram_id).first()
    now = datetime.now(timezone.utc)
    if not user:
        user = User(
            telegram_id=telegram_id,
            username=username,
            first_name=first_name or "Foydalanuvchi",
            target_lang="en",
            current_level="BEGINNER",
            xp=0,
            streak_days=1,
            longest_streak=1,
            last_active_at=now,
            created_at=now
        )
        session.add(user)
    else:
        user.username = username
        user.first_name = first_name or user.first_name
        user.last_active_at = now
    session.commit()
    session.refresh(user)
    return user

@router.message(CommandStart())
async def handle_start(message: Message):
    with SessionLocal() as session:
        user = get_or_create_user(
            session,
            telegram_id=message.from_user.id,
            username=message.from_user.username,
            first_name=message.from_user.first_name
        )

    greeting_text = (
        f"Assalomu alaykum, <b>{user.first_name}</b>! 👋\n\n"
        f"<b>«Tilsevar»</b> – xorijiy tillarni (English & Русский) mnemotexnika, "
        f"jonli dialoglar va qiziqarli o'yinlar orqali o'rganish bo'yicha shaxsiy yordamchingizga xush kelibsiz! 🌟\n\n"
        f"🎯 <b>Sizning tanlovingiz:</b> {user.target_lang.upper()} ({user.current_level})\n"
        f"⚡ <b>Tajriba (XP):</b> {user.xp} ball\n"
        f"🔥 <b>Ketma-ketlik (Streak):</b> {user.streak_days} kun\n\n"
        f"Interaktiv mashqlar, so'zlar audio talaffuzi va jonli dialoglarni boshlash uchun "
        f"quyidagi <b>«🚀 Super ilovani ochish»</b> tugmasini bosing!"
    )

    await message.answer(
        text=greeting_text,
        reply_markup=get_main_start_keyboard(),
        parse_mode="HTML"
    )

@router.callback_query(F.data == "btn_daily_lesson")
async def handle_daily_lesson_callback(query: CallbackQuery):
    await query.answer()
    with SessionLocal() as session:
        user = session.query(User).filter(User.telegram_id == query.from_user.id).first()
        if not user:
            user = get_or_create_user(session, query.from_user.id, query.from_user.username, query.from_user.first_name)

        words = session.query(Word).filter(
            Word.lang == user.target_lang,
            Word.level == user.current_level
        ).limit(12).all()

        text = f"📚 <b>Bugungi 12 ta kalit so'z ({user.target_lang.upper()}):</b>\n\n"
        for i, w in enumerate(words, 1):
            text += f"<b>{i}. {w.word}</b> [{w.phonetic or ''}] — <i>{w.uzbek_meaning}</i>\n"
            if w.mnemonic_hook:
                text += f"💡 Eslab qolish siri: <code>{w.mnemonic_hook}</code>\n"
            text += f"💬 Misol: <i>\"{w.example_sentence}\"</i>\n\n"

        text += "⚡ Barcha so'zlarni audio talaffuz va testlar bilan mashq qilish uchun Mini App'ni oching!"

    await query.message.edit_text(
        text=text,
        reply_markup=get_back_to_menu_keyboard(),
        parse_mode="HTML"
    )

@router.callback_query(F.data == "btn_dialogues")
async def handle_dialogues_callback(query: CallbackQuery):
    await query.answer()
    dialogues_text = (
        "💬 <b>Jonli va real hayotiy dialoglar:</b>\n\n"
        "Quyidagi 8 ta hayotiy vaziyatda erkin muloqot qilishni o'rganing:\n"
        "🚕 <b>Taksi</b> — Haydovchi bilan manzil va narxni kelishish\n"
        "🏨 <b>Mehmonxona</b> — Check-in, xona xizmati va qulayliklar\n"
        "🍽 <b>Restoran</b> — Stol band qilish, taom buyurtma qilish va hisob\n"
        "✈️ <b>Aeroport</b> — Ro'yxatdan o'tish, yuk topshirish, reyslar\n"
        "🛍 <b>Xarid (Shopping)</b> — O'lcham tanlash, kiyib ko'rish, chegirmalar\n"
        "🩺 <b>Shifokor</b> — Simptomlarni tushuntirish, dorixona va qabul\n"
        "🏦 <b>Bank</b> — Hisob ochish, valyuta ayirboshlash, xavfsizlik\n"
        "🏙 <b>Aralash vaziyat</b> — Ko'chada yo'l so'rash, qahvaxona va kutubxona\n\n"
        "Har bir vaziyatda interaktiv qadam-baqadam muloqot qilish uchun <b>«🚀 Ilovaga o'tish»</b> tugmasini bosing!"
    )
    await query.message.edit_text(
        text=dialogues_text,
        reply_markup=get_back_to_menu_keyboard(),
        parse_mode="HTML"
    )

@router.callback_query(F.data == "btn_my_stats")
async def handle_stats_callback(query: CallbackQuery):
    await query.answer()
    with SessionLocal() as session:
        user = session.query(User).filter(User.telegram_id == query.from_user.id).first()
        if not user:
            user = get_or_create_user(session, query.from_user.id, query.from_user.username, query.from_user.first_name)

        total_learned = session.query(UserWordProgress).filter(
            UserWordProgress.user_id == user.id,
            UserWordProgress.status == "LEARNED"
        ).count()

        total_reviewing = session.query(UserWordProgress).filter(
            UserWordProgress.user_id == user.id,
            UserWordProgress.status == "REVIEWING"
        ).count()

    stats_text = (
        f"🏆 <b>Sizning shaxsiy natijangiz:</b>\n\n"
        f"👤 <b>Foydalanuvchi:</b> {user.first_name}\n"
        f"🌐 <b>O'rganilayotgan til:</b> {user.target_lang.upper()} ({user.current_level})\n"
        f"⭐ <b>Jami tajriba (XP):</b> {user.xp} ball\n"
        f"🔥 <b>Ketma-ket kunlar (Streak):</b> {user.streak_days} kun\n"
        f"✅ <b>O'rganilgan so'zlar:</b> {total_learned} ta\n"
        f"🔄 <b>Takrorlanayotgan so'zlar:</b> {total_reviewing} ta\n\n"
        f"Har kuni 10 daqiqa shug'ullanish orqali natijangizni yanada oshiring!"
    )
    await query.message.edit_text(
        text=stats_text,
        reply_markup=get_back_to_menu_keyboard(),
        parse_mode="HTML"
    )

@router.callback_query(F.data == "btn_help")
async def handle_help_callback(query: CallbackQuery):
    await query.answer()
    help_text = (
        "❓ <b>«Tilsevar» ilovasidan foydalanish bo'yicha qo'llanma:</b>\n\n"
        "1. <b>Super ilova (Mini App)</b> — Barcha funksiyalar: 5 so'zli dars, mnemotexnika, 6 xil mini-o'yinlar, "
        "grammatika va 24 ta jonli dialoglar to'liq mujassamlashgan.\n\n"
        "2. <b>Mnemotexnika usuli</b> — Har bir so'z o'zbek tilidagi qiziqarli assotsiatsiya va hayotiy qisqa hikoya "
        "bilan ta'minlangan, bu so'zlarni umrbod esda saqlab qolishga yordam beradi.\n\n"
        "3. <b>Spaced Repetition (Interval takrorlash)</b> — O'zingiz qiyin deb belgilagan so'zlar tez-tez qaytib chiqadi, "
        "yaxshi bilganlaringiz esa uzoqroq interval bilan takrorlanadi.\n\n"
        "4. <b>Audio talaffuz</b> — Har bir so'z va iboraning to'g'ri native talaffuzini eshitish imkoni mavjud.\n\n"
        "Muammo yoki takliflar bo'lsa, @Tilsevar_admin ga murojaat qilishingiz mumkin."
    )
    await query.message.edit_text(
        text=help_text,
        reply_markup=get_back_to_menu_keyboard(),
        parse_mode="HTML"
    )

@router.callback_query(F.data == "btn_main_menu")
async def handle_main_menu_callback(query: CallbackQuery):
    await query.answer()
    with SessionLocal() as session:
        user = session.query(User).filter(User.telegram_id == query.from_user.id).first()
        first_name = user.first_name if user else "Foydalanuvchi"
        target_lang = user.target_lang if user else "en"
        current_level = user.current_level if user else "BEGINNER"
        xp = user.xp if user else 0
        streak = user.streak_days if user else 1

    greeting_text = (
        f"Assalomu alaykum, <b>{first_name}</b>! 👋\n\n"
        f"<b>«Tilsevar»</b> – til o'rganish markazingizga xush kelibsiz! 🌟\n\n"
        f"🎯 <b>Holat:</b> {target_lang.upper()} ({current_level})\n"
        f"⚡ <b>Tajriba:</b> {xp} XP | 🔥 <b>Streak:</b> {streak} kun\n\n"
        f"Ilovani ochish uchun quyidagi tugmani bosing:"
    )

    await query.message.edit_text(
        text=greeting_text,
        reply_markup=get_main_start_keyboard(),
        parse_mode="HTML"
    )
