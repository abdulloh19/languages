import hmac
import hashlib
import json
import time
from urllib.parse import parse_qsl
from typing import Optional, Dict, Any, Tuple
from fastapi import Header, HTTPException, status, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from .config import settings
from .database import get_db
from models.models import User

def validate_telegram_init_data(init_data_raw: str, bot_token: str) -> Tuple[bool, Optional[Dict[str, Any]], Optional[str]]:
    """
    Validates Telegram WebApp initData string using HMAC-SHA256.
    Never trust user_id passed directly from frontend payload!
    Returns (is_valid, user_data_dict, error_reason).
    """
    if not init_data_raw:
        return False, None, "initData is empty"

    try:
        parsed_data = dict(parse_qsl(init_data_raw, keep_blank_values=True))
        received_hash = parsed_data.pop("hash", None)
        if not received_hash:
            return False, None, "Hash missing in initData"

        # Check auth_date for expiration (optional / 3 days window)
        auth_date = int(parsed_data.get("auth_date", 0))
        current_time = int(time.time())
        if auth_date > 0 and (current_time - auth_date) > 86400 * 3:
            return False, None, "initData session expired"

        # Build data-check-string: sorted alphabetically key=value separated by \n
        data_check_arr = [f"{k}={v}" for k, v in sorted(parsed_data.items())]
        data_check_string = "\n".join(data_check_arr)

        # secret_key = HMAC_SHA256(bot_token, "WebAppData")
        secret_key = hmac.new(b"WebAppData", bot_token.encode("utf-8"), hashlib.sha256).digest()
        computed_hash = hmac.new(secret_key, data_check_string.encode("utf-8"), hashlib.sha256).hexdigest()

        if not hmac.compare_digest(computed_hash, received_hash):
            return False, None, "Invalid HMAC hash signature"

        user_str = parsed_data.get("user")
        if not user_str:
            return False, None, "User object missing in initData"

        user_dict = json.loads(user_str)
        return True, user_dict, None
    except Exception as e:
        return False, None, f"Parse error: {str(e)}"

def get_current_user_from_auth(
    x_telegram_init_data: Optional[str] = Header(None, alias="X-Telegram-Init-Data"),
    x_demo_mode: Optional[str] = Header(None, alias="X-Demo-Mode"),
    db: Session = Depends(get_db)
) -> User:
    """
    Dependency to authenticate request:
    - If valid initData: validates HMAC, gets or creates database User, returns User model.
    - If no initData: fallback to demo mode User model (is_demo=True, never saves to Telegram user records).
    """
    if x_telegram_init_data:
        is_valid, user_data, err = validate_telegram_init_data(x_telegram_init_data, settings.BOT_TOKEN)
        if is_valid and user_data:
            tg_id = int(user_data.get("id"))
            user = db.query(User).filter(User.telegram_id == tg_id).first()
            now = datetime.now(timezone.utc)
            if not user:
                user = User(
                    telegram_id=tg_id,
                    username=user_data.get("username"),
                    first_name=user_data.get("first_name", "O'quvchi"),
                    target_lang="en",
                    current_level="BEGINNER",
                    xp=0,
                    streak_days=1,
                    longest_streak=1,
                    last_active_at=now,
                    created_at=now
                )
                db.add(user)
                db.commit()
                db.refresh(user)
            else:
                user.last_active_at = now
                if user_data.get("first_name"):
                    user.first_name = user_data.get("first_name")
                if user_data.get("username"):
                    user.username = user_data.get("username")
                db.commit()
            
            user.is_demo = False
            return user

        # If invalid initData provided and not explicitly demo mode
        if not (x_demo_mode and x_demo_mode.lower() in ("true", "1")):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Telegram initData tekshiruvdan o'tmadi: {err}"
            )

    # Demo user for regular browser testing / preview
    demo_user = User(
        id=0,
        telegram_id=None,
        username="demo_guest",
        first_name="Mehmon (Demo)",
        target_lang="en",
        current_level="BEGINNER",
        xp=50,
        streak_days=1,
        longest_streak=1
    )
    demo_user.is_demo = True
    return demo_user
