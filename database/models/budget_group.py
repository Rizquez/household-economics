from __future__ import annotations

from typing import TYPE_CHECKING
from sqlalchemy import Column, String, BigInteger, ForeignKey, DateTime
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy.sql import func

from models.core import ModelBase

if TYPE_CHECKING:
    from .budget import Budget
    from .category import Category


class BudgetGroup(ModelBase):
    __tablename__ = "budget_group"

    name = Column(String, nullable=False)

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
        unique=True,
    )

    budgets: Mapped[list["Budget"]] = relationship(
        back_populates="budget_group",
        cascade="all, delete-orphan",
    )

    category: Mapped["Category"] = relationship(
        back_populates="budget_group",
    )
