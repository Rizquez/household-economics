from __future__ import annotations

from typing import TYPE_CHECKING, List
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship, Mapped

from models.core import ModelBase

if TYPE_CHECKING:
    from .family_members import FamilyMembers


class Role(ModelBase):
    __tablename__ = "role"

    name = Column(String, nullable=False, unique=True)

    family_members: Mapped[List["FamilyMembers"]] = relationship(back_populates="role")
