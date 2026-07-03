from typing import List, Dict, Optional
from fastapi import HTTPException, status

from database import Category
from src.business.core import Business


class CategoryBusiness(Business):

    @classmethod
    def get_category_by_record_type(
        cls, record_type_id: int, family_id: int
    ) -> List[Category]:
        session = cls.create_session()
        try:
            return cls.db.get_category_by_record_type(
                session, record_type_id, family_id
            )
        finally:
            session.close()

    @classmethod
    def create_category(cls, a_dict: Dict, family_id: int) -> None:
        session = cls.create_session()
        try:
            record_type = cls.db.get_record_type(session, a_dict.get("record_type_id"))
            if record_type is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No record types were found associated with ID: {a_dict.get("record_type_id")}",
                )

            a_dict["family_id"] = family_id
            cls.db.create_category(session, a_dict)
            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def update_category(
        cls,
        a_dict: Dict,
        category_id: int,
        family_id: int,
    ) -> Optional[Category]:
        session = cls.create_session()
        try:
            category = cls.db.update_category(session, a_dict, category_id, family_id)
            if not category:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No category were found associated with ID: {category_id}",
                )

            budget_group = cls.db.get_budget_group_by_category(
                session, category_id, family_id
            )
            if budget_group is not None:
                cls.db.update(budget_group, {"name": category.name})

            session.commit()
            return category
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def delete_category(cls, category_id: int, family_id: int) -> None:
        session = cls.create_session()
        try:
            budget_group = cls.db.get_budget_group_by_category(
                session, category_id, family_id
            )
            if budget_group is not None:
                deleted = cls.db.delete_budget_group(
                    session, budget_group.id, family_id
                )

            deleted = cls.db.delete_category(session, category_id, family_id)
            if not deleted:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No category were found associated with ID: {category_id}",
                )
            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()
