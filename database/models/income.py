from __future__ import annotations

from typing import TYPE_CHECKING
from sqlalchemy import Column, BigInteger, ForeignKey, String, DateTime, Numeric
from sqlalchemy.orm import relationship, Mapped

from models.core import ModelBase

if TYPE_CHECKING:
    from .category import Category
    from .family import Family


class Income(ModelBase):
    __tablename__ = "income"

    name = Column(String, nullable=False)

    created_at = Column(DateTime(timezone=False), nullable=False)

    amount = Column(Numeric(12, 2), nullable=False)

    notes = Column(String, nullable=True)

    category_id = Column(
        BigInteger,
        ForeignKey("category.id", name="fk_income_category_id", ondelete="SET NULL"),
        nullable=True,
    )

    family_id = Column(
        BigInteger,
        ForeignKey("family.id", name="fk_income_family_id"),
        nullable=False,
    )

    category: Mapped["Category"] = relationship(back_populates="incomes")
    family: Mapped["Family"] = relationship(back_populates="incomes")
