from __future__ import annotations

from typing import TYPE_CHECKING, List
from sqlalchemy import (
    Column,
    String,
    BigInteger,
    ForeignKey,
    DateTime,
    UniqueConstraint,
    Integer,
)
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy.sql import func

from models.core import ModelBase

if TYPE_CHECKING:
    from .budget import Budget
    from .category import Category


class BudgetGroup(ModelBase):
    __tablename__ = "budget_group"

    __table_args__ = (
        UniqueConstraint(
            "category_id",
            "year",
            name="uq_budget_group_category_year",
        ),
    )

    name = Column(String, nullable=False)

    year = Column(Integer, nullable=False)

    family_id = Column(
        BigInteger,
        ForeignKey("family.id", name="fk_budget_group_family_id"),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=False),
        nullable=False,
        server_default=func.now(),
    )

    category_id = Column(
        BigInteger,
        ForeignKey(
            "category.id",
            name="fk_budget_group_category_id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    budgets: Mapped[List["Budget"]] = relationship(
        back_populates="budget_group",
        cascade="all, delete-orphan",
    )

    category: Mapped["Category"] = relationship(
        back_populates="budget_groups",
    )
