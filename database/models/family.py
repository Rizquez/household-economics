from __future__ import annotations

from typing import TYPE_CHECKING
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy import Column, String, DateTime
from sqlalchemy.sql import func

from models.core import ModelBase

if TYPE_CHECKING:
    from .family_members import FamilyMembers


class Family(ModelBase):
    __tablename__ = "family"

    name = Column(String, nullable=False)

    created_at = Column(
        DateTime(timezone=False), nullable=False, server_default=func.now()
    )

    members: Mapped[list["FamilyMembers"]] = relationship(back_populates="family")
