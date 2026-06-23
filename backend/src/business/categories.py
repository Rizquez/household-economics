from typing import List, Dict
from fastapi import HTTPException, status

from database import Categories
from .business import Business


class CategoriesBusiness(Business):

    @classmethod
    def get_all_categories(cls) -> List[Categories]:
        session = cls.create_session()
        return cls.db.get_all_categories(session)

    @classmethod
    def create_category(cls, a_dict: Dict) -> None:
        session = cls.create_session()
        try:
            cls.db.create_category(session, a_dict)
            session.commit()
        except Exception as e:
            session.rollback()
            raise Exception(f"Error creating category: {e}")
        
    @classmethod
    def delete_category(cls, ident: int) -> None:
        session = cls.create_session()
        try:
            deleted = cls.db.delete_category(session, ident)
            if not deleted:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No categories were found associated with ID: {ident}"
                )
            session.commit()
        except:
            session.rollback()
            raise
        