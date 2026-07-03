from __future__ import annotations

from typing import TYPE_CHECKING
from sqlalchemy import (
    Column,
    BigInteger,
    ForeignKey,
    Integer,
    Numeric,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship, Mapped

from models.core import ModelBase

if TYPE_CHECKING:
    from .budget_group import BudgetGroup


class Budget(ModelBase):
    __tablename__ = "budget"

    __table_args__ = (
        UniqueConstraint(
            "budget_group_id",
            "year",
            "month",
            name="uq_budget_group_year_month",
        ),
    )

    year = Column(Integer, nullable=False)

    month = Column(Integer, nullable=False)

    amount = Column(Numeric(12, 2), nullable=False)

    budget_group_id = Column(
        BigInteger,
        ForeignKey("budget_group.id", name="fk_budget_budget_group_id"),
        nullable=False,
    )

    budget_group: Mapped["BudgetGroup"] = relationship(back_populates="budgets")
