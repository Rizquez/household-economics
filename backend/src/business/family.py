from typing import Optional
from fastapi import status, HTTPException

from database import Family
from src.business.core import Business


class FamilyBusiness(Business):

    @classmethod
    def get_family_by_user_id(cls, user_id: int) -> Family:
        session = cls.create_session()
        try:
            family = cls.db.get_family_by_user_id(session, user_id)
            if family is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No family associated with the user with ID was found: {user_id}.",
                )
            return family
        finally:
            session.close()

    @classmethod
    def update_family(
        cls,
        name: str,
        family_id: int,
    ) -> Family:
        session = cls.create_session()
        try:
            normalized_name = name.strip()

            if not normalized_name:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Family name cannot be empty.",
                )

            family = cls.db.update_family(
                session,
                {
                    "name": normalized_name,
                },
                family_id,
            )

            if family is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No family were found associated with ID: {family_id}.",
                )

            session.commit()
            session.refresh(family)
            return family
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()
