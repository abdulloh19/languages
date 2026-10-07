"""
Tilsevar PostgreSQL Migration & Backup Utility
Allows transferring SQLite data to a production PostgreSQL instance and backing up.
"""

import os
import sys
from sqlalchemy import create_engine
from core.database import Base
from models.models import User, Word, UserWordProgress, Dialogue, DialogueLine, UserDialogueProgress, ExerciseResult, GrammarLesson

def migrate_to_postgresql(postgres_url: str):
    """
    Creates all tables in PostgreSQL and copies data from local SQLite database.
    Example postgres_url: postgresql://username:password@localhost:5432/tilsevar
    """
    print(f"Connecting to target PostgreSQL: {postgres_url}")
    pg_engine = create_engine(postgres_url)
    
    # 1. Create schema
    print("Creating tables in PostgreSQL...")
    Base.metadata.create_all(bind=pg_engine)
    print("PostgreSQL tables successfully created!")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python migrate_to_postgres.py <postgresql_url>")
        print("Example: python migrate_to_postgres.py postgresql://postgres:secret@localhost:5432/tilsevar")
        sys.exit(1)
        
    pg_conn = sys.argv[1]
    migrate_to_postgresql(pg_conn)
