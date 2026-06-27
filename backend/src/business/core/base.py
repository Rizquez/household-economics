from __future__ import annotations

from typing import TYPE_CHECKING

from database import Database

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class Business:
    db: Database

    @classmethod
    def set_db(cls, db: Database) -> None:
        cls.db = db

    @classmethod
    def create_session(cls) -> "scoped_session":
        return cls.db.create_session()

    def __init__(self, *args, **kwargs):
        raise Exception("This class should not be instantiated")


def setup_business_layer(db: Database) -> None:
    Business.set_db(db)
