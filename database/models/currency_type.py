from __future__ import annotations

from typing import List, TYPE_CHECKING
from sqlalchemy import Column, String, UniqueConstraint
from sqlalchemy.orm import Mapped, relationship

from models.core import ModelBase

if TYPE_CHECKING:
    from .family import Family


class CurrencyType(ModelBase):
    __tablename__ = "currency_type"

    __table_args__ = (
        UniqueConstraint(
            "code",
            name="uq_currency_type_code",
        ),
    )

    code = Column(String(3), nullable=False)    # EUR
    symbol = Column(String(5), nullable=False)  # €
    name = Column(String(50), nullable=False)   # Euro

    families: Mapped[List["Family"]] = relationship(back_populates="currency_type")
