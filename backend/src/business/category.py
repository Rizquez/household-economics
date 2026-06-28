from typing import List, Dict
from fastapi import HTTPException, status

from database import Category
from .core import Business


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
    def delete_category(cls, category_id: int, family_id: int) -> None:
        session = cls.create_session()
        try:
            deleted = cls.db.delete_category(session, category_id, family_id)
            if not deleted:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No category were found associated with ID: {category_id}",
                )
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()
