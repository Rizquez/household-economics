from __future__ import annotations

from typing import TYPE_CHECKING, List
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy import Column, String, DateTime, Integer
from sqlalchemy.sql import func

from models.core import ModelBase

if TYPE_CHECKING:
    from .family_members import FamilyMembers
    from .family_invitation import FamilyInvitation
    from .income import Income
    from .expense import Expense
    from .savings_investments import SavingsInvestments


class Family(ModelBase):
    __tablename__ = "family"

    name = Column(String, nullable=False)

    max_members = Column(Integer, nullable=False, default=1, server_default="1")

    created_at = Column(
        DateTime(timezone=False), nullable=False, server_default=func.now()
    )

    members: Mapped[List["FamilyMembers"]] = relationship(back_populates="family")

    invitations: Mapped[List["FamilyInvitation"]] = relationship(
        back_populates="family",
        cascade="all, delete-orphan",
    )

    incomes: Mapped[List["Income"]] = relationship(back_populates="family")

    expenses: Mapped[List["Expense"]] = relationship(back_populates="family")

    savings_investments: Mapped[List["SavingsInvestments"]] = relationship(
        back_populates="family"
    )
