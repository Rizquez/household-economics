from __future__ import annotations

from typing import TYPE_CHECKING
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy.sql import func
from sqlalchemy import (
    Column,
    BigInteger,
    ForeignKey,
    String,
    Boolean,
    DateTime,
)

from models.core import ModelBase

if TYPE_CHECKING:
    from .family import Family
    from .user import User


class FamilyInvitation(ModelBase):
    __tablename__ = "family_invitation"

    family_id = Column(
        BigInteger,
        ForeignKey(
            "family.id", name="fk_family_invitation_family_id", ondelete="CASCADE"
        ),
        nullable=False,
    )

    invited_by_user_id = Column(
        BigInteger,
        ForeignKey("users.id", name="fk_family_invitation_invited_by_user_id"),
        nullable=False,
    )

    email = Column(String, nullable=False)

    accepted = Column(Boolean, nullable=True)

    created_at = Column(
        DateTime(timezone=False), nullable=False, server_default=func.now()
    )

    resolved_at = Column(DateTime(timezone=False), nullable=True)

    family: Mapped["Family"] = relationship(back_populates="invitations")

    invited_by: Mapped["User"] = relationship(back_populates="sent_family_invitations")
