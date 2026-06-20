from __future__ import annotations

from typing import List, TYPE_CHECKING

from services.base import ServiceBase
from models import Categories

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class CategoriesService(ServiceBase):

    @classmethod
    def get_all_categories(cls, session: "scoped_session") -> List[Categories]:
        return cls.get_all(session, Categories)

    @classmethod
    def get_category(cls, session: "scoped_session", ident: int) -> Categories:
        return cls.get(session, ident, Categories)
