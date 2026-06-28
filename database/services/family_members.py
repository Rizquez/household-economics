from typing import Dict, Optional

from models import FamilyMembers
from .core import ServiceBase


class FamilyMembersService(ServiceBase):

    @classmethod
    def get_family_member_by_user_id(
        cls, session, user_id: int
    ) -> Optional[FamilyMembers]:
        return cls.filter_by(
            session, FamilyMembers.user_id == user_id, model=FamilyMembers
        )

    @classmethod
    def create_family_member(
        cls, session, a_dict: Dict
    ) -> FamilyMembers:  # TODO: Is it necessary?
        return cls.create(session, a_dict, FamilyMembers)
