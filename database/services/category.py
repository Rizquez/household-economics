from __future__ import annotations

from typing import List, Optional, Dict, TYPE_CHECKING
from sqlalchemy import and_

from services.core import ServiceBase
from models import Category

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class CategoryService(ServiceBase):

    @classmethod
    def get_category_by_record_type(
        cls, session: "scoped_session", record_type_id: int, family_id: int
    ) -> List[Category]:
        return cls.filter_by(
            session,
            and_(
                Category.record_type_id == record_type_id,
                Category.family_id == family_id,
            ),
            model=Category,
            all=True,
            order_by=Category.name,
        )

    @classmethod
    def create_category(cls, session: "scoped_session", a_dict: Dict) -> Category:
        return cls.create(session, a_dict, Category)
    
    @classmethod
    def update_category(cls, session: "scoped_session", a_dict: Dict, category_id: int, family_id: int) -> Optional[Category]:
        category = cls._get_category_by_id_and_family(
            session,
            category_id,
            family_id,
        )

        if category is None:
            return None

        return cls.update(category, a_dict)

    @classmethod
    def delete_category(
        cls, session: "scoped_session", category_id: int, family_id: int
    ) -> bool:
        category = cls._get_category_by_id_and_family(
            session,
            category_id,
            family_id,
        )

        if category is None:
            return False

        session.delete(category)
        return True

    @classmethod
    def _get_category_by_id_and_family(
        cls,
        session: "scoped_session",
        category_id: int,
        family_id: int,
    ) -> Optional[Category]:
        return cls.filter_by(
            session,
            and_(
                Category.id == category_id,
                Category.family_id == family_id,
            ),
            model=Category,
        )
