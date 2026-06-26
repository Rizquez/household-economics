from typing import List, Dict
from fastapi import HTTPException, status

from database import Categories
from .core import Business


class CategoriesBusiness(Business):

    @classmethod
    def get_categories_by_record_type(cls, record_type_id: int) -> List[Categories]:
        session = cls.create_session()
        try:
            return cls.db.get_categories_by_record_type(session, record_type_id)
        finally:
            session.close()
        
    @classmethod
    def create_category(cls, a_dict: Dict) -> None:
        session = cls.create_session()
        try:
            record_type = cls.db.get_record_type(session, a_dict.get("record_type_id"))
            if record_type is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No record types were found associated with ID: {a_dict.get("record_type_id")}",
                )
        
            cls.db.create_category(session, a_dict)
            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def delete_category(cls, category_id: int) -> None:
        session = cls.create_session()
        try:
            deleted = cls.db.delete_category(session, category_id)
            if not deleted:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No categories were found associated with ID: {category_id}",
                )
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()
