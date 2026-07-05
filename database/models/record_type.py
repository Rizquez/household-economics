from __future__ import annotations

from typing import TYPE_CHECKING, List
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship, Mapped

from models.core import ModelBase

if TYPE_CHECKING:
    from .category import Category


class RecordType(ModelBase):
    __tablename__ = "record_type"

    name = Column(String, nullable=False)

    categories: Mapped[List["Category"]] = relationship(back_populates="record_type")
