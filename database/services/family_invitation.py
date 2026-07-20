from __future__ import annotations

from typing import Optional, TYPE_CHECKING
from models import FamilyInvitation

from .core import ServiceBase

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class FamilyInvitationService(ServiceBase):

    @classmethod
    def get_pending_family_invitation_by_email(
        cls,
        session: "scoped_session",
        email: str,
    ) -> Optional[FamilyInvitation]:
        return cls.find(
            session,
            FamilyInvitation.email == email,
            FamilyInvitation.accepted.is_(None),
            model=FamilyInvitation,
        )
