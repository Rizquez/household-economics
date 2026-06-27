from __future__ import annotations

from typing import TYPE_CHECKING
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy import Column, String, DateTime
from sqlalchemy.sql import func

from models.core import ModelBase

if TYPE_CHECKING:
    from .family_members import FamilyMembers


class User(ModelBase):
    __tablename__ = "users"
    # Internally, the database stores records under the name `user`,
    # so for this model, the name will be assigned in the plural form.

    auth0_id = Column(String, nullable=False, unique=True)

    email = Column(String, nullable=False, unique=True)

    name = Column(String, nullable=False, unique=False)

    created_at = Column(
        DateTime(timezone=False), nullable=False, server_default=func.now()
    )

    family_members: Mapped[list["FamilyMembers"]] = relationship(back_populates="user")
