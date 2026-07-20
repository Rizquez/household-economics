from __future__ import annotations

from typing import Dict, List, Optional, TYPE_CHECKING

from models import FamilyMembers
from .core import ServiceBase

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class FamilyMembersService(ServiceBase):

    @classmethod
    def get_family_member_by_user_id(
        cls, session: "scoped_session", user_id: int
    ) -> Optional[FamilyMembers]:
        return cls.find(session, FamilyMembers.user_id == user_id, model=FamilyMembers)

    @classmethod
    def get_family_members_by_family_id(
        cls, session: "scoped_session", family_id: int
    ) -> List[FamilyMembers]:
        return cls.find_all(session, FamilyMembers.family_id == family_id, model=FamilyMembers)

    @classmethod
    def create_family_member(
        cls, session: "scoped_session", a_dict: Dict
    ) -> FamilyMembers:
        return cls.create(session, a_dict, FamilyMembers)

    @classmethod
    def count_family_members(
        cls,
        session: "scoped_session",
        family_id: int,
    ) -> int:
        return cls.count(
            session, FamilyMembers.family_id == family_id, model=FamilyMembers
        )
