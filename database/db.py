from __future__ import annotations

import os
from typing import TYPE_CHECKING
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker, scoped_session
from dotenv import load_dotenv

if TYPE_CHECKING:
    from sqlalchemy.engine import Engine

from services import (
    CategoryService,
    RecordTypeService,
    UserService,
    FamilyMembersService,
    FamilyService,
    RoleService,
)
from models import Base

load_dotenv(override=True)


class Database(
    CategoryService,
    RecordTypeService,
    UserService,
    FamilyMembersService,
    FamilyService,
    RoleService,
):
    __instance = None

    def __new__(cls, engine: "Engine"):
        if Database.__instance is None:
            Database.__instance = super(Database, cls).__new__(cls)
            Database.__instance.__init__(engine)
        return Database.__instance

    def __init__(self, engine: "Engine") -> None:
        self.engine = engine

    def create_session(self) -> scoped_session:
        session = scoped_session(sessionmaker(bind=self.engine, expire_on_commit=False))
        Base.metadata.bind = self.engine
        return session

    @staticmethod
    def health_check(session: scoped_session) -> bool:
        try:
            session.execute(text("SELECT 1"))
            return True
        except Exception:
            return False


def get_database_uri() -> str:
    url = os.getenv("POSTGRES_URI")
    if not url:
        raise RuntimeError("POSTGRES_URI is missing from the .env file")
    return url
