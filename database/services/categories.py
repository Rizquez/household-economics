from __future__ import annotations

from typing import List, Optional, Dict, TYPE_CHECKING

from services.base import ServiceBase
from models import Categories

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class CategoriesService(ServiceBase):

    @classmethod
    def get_all_categories(cls, session: "scoped_session") -> List[Categories]:
        return cls.get_all(session, Categories)

    @classmethod
    def get_category(cls, session: "scoped_session", ident: int) -> Optional[Categories]:
        return cls.get(session, ident, Categories)
    
    @classmethod
    def create_category(cls, session: "scoped_session", a_dict: Dict) -> Categories:
        return cls.create(session, a_dict, Categories)

    @classmethod
    def delete_category(
        cls,
        session: "scoped_session",
        ident: int
    ) -> bool:
        return cls.delete(session, ident, Categories)
