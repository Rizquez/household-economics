from typing import Dict, Any

from fastapi import HTTPException, status
import logging

from src.schemas import CurrentUser
from src.schemas.enums import Role
from src.business.core import Business
from src.business.services import send_access_request_email


class AuthBusiness(Business):

    @classmethod
    def get_or_create_current_user(
        cls,
        claims: Dict[str, Any],
        clerk_user: Dict[str, Any],
    ) -> CurrentUser:
        session = cls.create_session()
        try:
            clerk_id = claims["sub"]

            email = cls.__get_email(clerk_user)
            name = cls.__get_name(clerk_user, email)

            user = cls.db.get_user_by_clerk_id(session, clerk_id)
            if user is None:
                user = cls.db.get_user_by_email(session, email)
                if user is None:
                    user = cls.db.create_user(
                        session,
                        {
                            "clerk_id": clerk_id,
                            "email": email,
                            "name": name,
                            "access_allowed": False,
                        },
                    )
                else:
                    user.clerk_id = clerk_id
                    user.name = name
                    user.access_allowed = False
                session.flush()

                try:
                    send_access_request_email(
                        user.name,
                        user.email,
                        user.clerk_id,
                    )
                except Exception as ex:
                    # TODO: improve loggin
                    logging.exception("Unable to send access request email: %s", ex)

            family_member = cls.db.get_family_member_by_user_id(session, user.id)
            if family_member is None:
                role = cls.db.get_role_by_name(session, Role.OWNER)

                family = cls.db.create_family(
                    session,
                    {
                        "name": f"{user.name}'s Family",
                    },
                )
                session.flush()

                family_member = cls.db.create_family_member(
                    session,
                    {
                        "family_id": family.id,
                        "user_id": user.id,
                        "role_id": role.id,
                    },
                )
                session.flush()

            session.commit()

            return CurrentUser(
                id=user.id,
                clerk_id=user.clerk_id,
                email=user.email,
                name=user.name,
                family_id=family_member.family_id,
                access_allowed=user.access_allowed,
            )
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @staticmethod
    def __get_email(clerk_user: Dict[str, Any]) -> str:
        primary_email_id = clerk_user.get("primary_email_address_id")
        email_addresses = clerk_user.get("email_addresses", [])

        for email in email_addresses:
            if email.get("id") == primary_email_id:
                return email["email_address"]

        if email_addresses:
            return email_addresses[0]["email_address"]

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Clerk user does not have an email address.",
        )

    @staticmethod
    def __get_name(clerk_user: Dict[str, Any], fallback_email: str) -> str:
        first_name = clerk_user.get("first_name") or ""
        last_name = clerk_user.get("last_name") or ""
        full_name = f"{first_name} {last_name}".strip()

        return full_name or clerk_user.get("username") or fallback_email
