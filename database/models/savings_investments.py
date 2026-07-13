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
    from .family import Family


class SavingsInvestments(ModelBase):
    __tablename__ = "savings_investment"

    __table_args__ = (
        UniqueConstraint(
            "family_id",
            "year",
            "month",
            name="uq_savings_investment_family_year_month",
        ),
    )

    year = Column(Integer, nullable=False)

    month = Column(Integer, nullable=False)

    available_amount = Column(Numeric(12, 2), nullable=False)

    savings_amount = Column(Numeric(12, 2), nullable=False)

    investment_amount = Column(Numeric(12, 2), nullable=False)

    family_id = Column(
        BigInteger,
        ForeignKey(
            "family.id",
            name="fk_savings_investment_family_id",
        ),
        nullable=False,
    )

    family: Mapped["Family"] = relationship(back_populates="savings_investments")
