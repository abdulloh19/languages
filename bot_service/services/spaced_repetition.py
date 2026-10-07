from datetime import datetime, timedelta, timezone

def calculate_sm2(repetitions: int, interval_days: int, ease_factor: float, quality: int):
    """
    SuperMemo-2 (SM-2) Spaced Repetition Algorithm.
    quality: 0-5
      0: Total blackout
      1: Incorrect / "Takrorlash kerak"
      2: Difficult
      3: Good with effort
      4: Good / "Bilaman"
      5: Perfect recall
    """
    now = datetime.now(timezone.utc)
    
    # If the user answered incorrectly (quality < 3)
    if quality < 3:
        new_repetitions = 0
        new_interval = 1
        new_status = "REVIEWING"
    else:
        new_repetitions = repetitions + 1
        if new_repetitions == 1:
            new_interval = 1
        elif new_repetitions == 2:
            new_interval = 3
        else:
            new_interval = max(1, round(interval_days * ease_factor))
        
        new_status = "LEARNED" if new_repetitions >= 2 else "REVIEWING"
        
    # Calculate new ease factor
    # EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    new_ef = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    if new_ef < 1.3:
        new_ef = 1.3
        
    next_review = now + timedelta(days=new_interval)
    
    return {
        "repetitions": new_repetitions,
        "interval_days": new_interval,
        "ease_factor": round(new_ef, 2),
        "status": new_status,
        "next_review_at": next_review,
        "last_reviewed_at": now
    }
