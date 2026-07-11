from __future__ import annotations

from typing import Dict, Optional, TYPE_CHECKING

from models import Family, FamilyMembers
from .core import ServiceBase

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class FamilyService(ServiceBase):

    @classmethod
    def create_family(cls, session: "scoped_session", a_dict: Dict) -> Family:
        return cls.create(session, a_dict, Family)

    @staticmethod
    def get_family_by_user_id(
        session: "scoped_session",
        user_id: int,
    ) -> Optional[Family]:
        return (
            session.query(Family)
            .join(Family.members)
            .filter(FamilyMembers.user_id == user_id)
            .one_or_none()
        )
