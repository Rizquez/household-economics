from __future__ import annotations

from typing import List, Optional, Dict, TYPE_CHECKING

from services.core import ServiceBase
from models import Categories

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class CategoriesService(ServiceBase):

    @classmethod
    def get_categories_by_record_type(
        cls, session: "scoped_session", record_type_id: int
    ) -> List[Categories]:
        return cls.filter_by(
            session,
            Categories.record_type_id == record_type_id,
            model=Categories,
            all=True,
            order_by=Categories.category,
        )

    @classmethod
    def get_category(
        cls, session: "scoped_session", category_id: int
    ) -> Optional[Categories]:
        return cls.get(session, category_id, Categories)

    @classmethod
    def create_category(cls, session: "scoped_session", a_dict: Dict) -> Categories:
        return cls.create(session, a_dict, Categories)

    @classmethod
    def delete_category(cls, session: "scoped_session", category_id: int) -> bool:
        return cls.delete(session, category_id, Categories)
