from __future__ import annotations

from typing import TYPE_CHECKING
from sqlalchemy import Column, BigInteger, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy.sql import func

from models.core import ModelBase

if TYPE_CHECKING:
    from .family import Family
    from .user import User
    from .role import Role


class FamilyMembers(ModelBase):
    __tablename__ = "family_members"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            name="uq_family_members_user_id",
        ),
    )

    family_id = Column(
        BigInteger,
        ForeignKey("family.id", name="fk_family_members_family_id"),
        nullable=False,
    )

    user_id = Column(
        BigInteger,
        ForeignKey("users.id", name="fk_family_members_user_id"),
        nullable=False,
    )

    role_id = Column(
        BigInteger,
        ForeignKey("role.id", name="fk_family_members_role_id"),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=False),
        nullable=False,
        server_default=func.now(),
    )

    family: Mapped["Family"] = relationship(back_populates="members")
    user: Mapped["User"] = relationship(back_populates="family_members")
    role: Mapped["Role"] = relationship(back_populates="family_members")
