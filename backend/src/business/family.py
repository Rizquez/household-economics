from __future__ import annotations

from typing import List, Dict, TYPE_CHECKING
from fastapi import status, HTTPException

from database import Family, FamilyMembers
from src.business.core import Business
from src.schemas.enums import Role
from src.business.services import send_family_invitation

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


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
        currency_type_id: int,
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
            
            currency_type = cls.db.get_currency_type_by_id(session, currency_type_id)
            if currency_type is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No currency type was found associated with ID: {currency_type_id}."
                )

            family = cls.db.update_family(
                session,
                {
                    "name": normalized_name,
                    "currency_type_id": currency_type.id,
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

    @classmethod
    def create_invitation(
        cls,
        email: str,
        invited_by_user_id: int,
        invited_by_user_name: str,
        invited_by_user_email: str,
        family_id: int,
    ) -> None:
        session = cls.create_session()
        try:
            member = cls.__get_family_member(session, invited_by_user_id)
            if member.role.name != Role.OWNER:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Only the family owner can invite new members.",
                )

            family = cls.db.get_family_by_id(session, family_id)

            if family is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No family was found associated with ID: {family_id}.",
                )

            normalized_email = email.strip().lower()

            cls.db.create_invitation(
                session,
                {
                    "email": normalized_email,
                    "family_id": family_id,
                    "invited_by_user_id": invited_by_user_id,
                },
            )

            session.flush()

            send_family_invitation(
                invited_by_user_name, family.name, email, invited_by_user_email
            )

            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def get_family_members(cls, user_id: int) -> List[Dict]:
        session = cls.create_session()
        try:
            member = cls.__get_family_member(session, user_id)
            family_members = cls.db.get_family_members_by_family_id(
                session, member.family_id
            )
            return [
                {
                    "id": family_member.id,
                    "user_id": family_member.user_id,
                    "name": family_member.user.name,
                    "email": family_member.user.email,
                    "role": family_member.role.name,
                }
                for family_member in family_members
            ]
        finally:
            session.close()

    @classmethod
    def remove_family_member(cls, user_id: int, member_id: int) -> None:
        session = cls.create_session()
        try:
            member = cls.__get_family_member(session, user_id)
            if member.role.name != Role.OWNER:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Only the family owner can remove members.",
                )

            if user_id == member_id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="The family owner cannot remove themselves.",
                )

            family_member = cls.db.get_family_member_by_user_id(session, member_id)
            if family_member is None or family_member.family_id != member.family_id:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No family member was found associated with ID: {member_id}.",
                )

            family_member.user.access_allowed = False

            cls.db.delete(session, family_member.id, FamilyMembers)
            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def __get_family_member(
        cls, session: "scoped_session", user_id: int
    ) -> FamilyMembers:
        family_member = cls.db.get_family_member_by_user_id(
            session,
            user_id,
        )

        if family_member is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="The user does not belong to a family.",
            )

        return family_member
