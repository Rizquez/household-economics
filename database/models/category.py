from __future__ import annotations

from typing import TYPE_CHECKING, List
from sqlalchemy import Column, String, BigInteger, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped

from models.core import ModelBase

if TYPE_CHECKING:
    from .record_type import RecordType
    from .budget_group import BudgetGroup
    from .income import Income
    from .expense import Expense
    from .expense_item import ExpenseItem


class Category(ModelBase):
    __tablename__ = "category"

    __table_args__ = (
        UniqueConstraint(
            "family_id",
            "record_type_id",
            "normalized_name",
            name="uq_category_family_record_type_normalized_name",
        ),
    )

    name = Column(String, nullable=False)
    normalized_name = Column(String, nullable=False)

    record_type_id = Column(
        BigInteger,
        ForeignKey("record_type.id", name="fk_category_record_type_id"),
        nullable=False,
    )

    family_id = Column(
        BigInteger,
        ForeignKey("family.id", name="fk_category_family_id"),
        nullable=False,
    )

    record_type: Mapped["RecordType"] = relationship(back_populates="categories")

    budget_groups: Mapped[List["BudgetGroup"]] = relationship(
        back_populates="category",
        cascade="all, delete-orphan",
    )

    incomes: Mapped[List["Income"]] = relationship(back_populates="category")

    expenses: Mapped[List["Expense"]] = relationship(back_populates="category")

    expense_items: Mapped[List["ExpenseItem"]] = relationship(back_populates="category")
