from __future__ import annotations

from typing import TYPE_CHECKING, List
from sqlalchemy import (
    Column,
    BigInteger,
    ForeignKey,
    String,
    DateTime,
    Numeric,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship, Mapped

from models.core import ModelBase

if TYPE_CHECKING:
    from .category import Category
    from .family import Family
    from .expense_item import ExpenseItem


class Expense(ModelBase):
    __tablename__ = "expense"

    __table_args__ = (
        UniqueConstraint(
            "savings_investment_id",
            name="uq_expense_savings_investment",
        ),
    )

    name = Column(String, nullable=False)

    created_at = Column(DateTime(timezone=False), nullable=False)

    amount = Column(Numeric(12, 2), nullable=False)

    notes = Column(String, nullable=True)

    category_id = Column(
        BigInteger,
        ForeignKey("category.id", name="fk_expense_category_id", ondelete="SET NULL"),
        nullable=True,
    )

    family_id = Column(
        BigInteger,
        ForeignKey("family.id", name="fk_expense_family_id"),
        nullable=False,
    )

    savings_investment_id = Column(
        BigInteger,
        ForeignKey(
            "savings_investment.id",
            name="fk_expense_savings_investment_id",
            ondelete="CASCADE",
        ),
        nullable=True,
    )

    category: Mapped["Category"] = relationship(back_populates="expenses")

    family: Mapped["Family"] = relationship(back_populates="expenses")

    items: Mapped[List["ExpenseItem"]] = relationship(
        back_populates="expense",
        cascade="all, delete-orphan",
    )
