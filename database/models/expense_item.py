from __future__ import annotations

from typing import TYPE_CHECKING
from sqlalchemy import Column, BigInteger, ForeignKey, String, Numeric
from sqlalchemy.orm import relationship, Mapped

from models.core import ModelBase

if TYPE_CHECKING:
    from .category import Category
    from .expense import Expense


class ExpenseItem(ModelBase):
    __tablename__ = "expense_item"

    product = Column(String, nullable=False)

    amount = Column(Numeric(12, 2), nullable=False)

    expense_id = Column(
        BigInteger,
        ForeignKey("expense.id", name="fk_expense_item_expense_id"),
        nullable=False,
    )

    category_id = Column(
        BigInteger,
        ForeignKey(
            "category.id", name="fk_expense_item_category_id", ondelete="SET NULL"
        ),
        nullable=True,
    )

    expense: Mapped["Expense"] = relationship(back_populates="items")
    category: Mapped["Category"] = relationship(back_populates="expense_items")
