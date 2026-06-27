from __future__ import annotations

from typing import List, Optional, Dict, TYPE_CHECKING

from services.core import ServiceBase
from models import Category

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class CategoryService(ServiceBase):

    @classmethod
    def get_category_by_record_type(
        cls, session: "scoped_session", record_type_id: int
    ) -> List[Category]:
        return cls.filter_by(
            session,
            Category.record_type_id == record_type_id,
            model=Category,
            all=True,
            order_by=Category.name,
        )

    @classmethod
    def get_category(
        cls, session: "scoped_session", category_id: int
    ) -> Optional[Category]:
        return cls.get(session, category_id, Category)

    @classmethod
    def create_category(cls, session: "scoped_session", a_dict: Dict) -> Category:
        return cls.create(session, a_dict, Category)

    @classmethod
    def delete_category(cls, session: "scoped_session", category_id: int) -> bool:
        return cls.delete(session, category_id, Category)
