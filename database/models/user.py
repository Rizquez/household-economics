from __future__ import annotations

from typing import TYPE_CHECKING
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.sql import func

from models.core import ModelBase

if TYPE_CHECKING:
    from .family_members import FamilyMembers


# Internally, the database stores records under the name `user`,
# so for this model, the name will be assigned in the plural form.
class User(ModelBase):
    __tablename__ = "users"

    clerk_id = Column(String, nullable=False, unique=True)

    email = Column(String, nullable=False, unique=True)

    name = Column(String, nullable=False, unique=False)

    created_at = Column(
        DateTime(timezone=False), nullable=False, server_default=func.now()
    )

    access_allowed = Column(Boolean, nullable=False, default=False)

    family_members: Mapped[list["FamilyMembers"]] = relationship(back_populates="user")
