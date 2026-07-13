from typing import List, Dict
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
            record_type_id = a_dict["record_type_id"]

            record_type = cls.db.get_record_type(session, record_type_id)
            if record_type is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No record types were found associated with ID: {record_type_id}.",
                )
            
            normalized_name = a_dict["name"].lower()

            existing = cls.db.get_category_by_normalized_name(
                session,
                normalized_name,
                record_type_id,
                family_id,
            )

            if existing is not None:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="A category with the same name already exists for this record type."
                )

            a_dict["normalized_name"] = normalized_name
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
    ) -> Category:
        session = cls.create_session()
        try:
            existing = cls.db.get_category_by_id_and_family(
                session,
                category_id,
                family_id,
            )

            if not existing:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No category were found associated with ID: {category_id}.",
                )
            
            record_type_id = a_dict["record_type_id"]

            record_type = cls.db.get_record_type(session, record_type_id)
            if record_type is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No record types were found associated with ID: {record_type_id}."
                )
            
            normalized_name = a_dict["name"].lower()
            existing_normalized = cls.db.get_category_by_normalized_name(
                session,
                normalized_name,
                record_type_id,
                family_id,
            )

            if existing_normalized is not None and existing_normalized.id != category_id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="A category with the same name already exists for this record type."
                )

            a_dict["normalized_name"] = normalized_name
            
            updated = cls.db.update_category(session, a_dict, category_id, family_id)
            if not updated:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"The category associated with ID: {category_id} could not be updated.",
                )

            for budget_group in updated.budget_groups:
                cls.db.update(budget_group, {"name": updated.name})

            session.commit()
            return updated
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def delete_category(cls, category_id: int, family_id: int) -> None:
        session = cls.create_session()
        try:
            category = cls.db.get(session, category_id, Category)
            if not category:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No category were found associated with ID: {category_id}.",
                )
            
            deleted = cls.db.delete_category(session, category_id, family_id)
            if not deleted:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"The category associated with ID: {category_id} could not be deleted.",
                )
            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()
