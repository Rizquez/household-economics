from __future__ import annotations

from typing import TYPE_CHECKING
from sqlalchemy import Column, String, BigInteger, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from models.core import ModelBase

if TYPE_CHECKING:
    from .record_type import RecordType
    from .budget_group import BudgetGroup


class Category(ModelBase):
    __tablename__ = "category"

    name = Column(String, nullable=False)

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

    budget_groups: Mapped[list["BudgetGroup"]] = relationship(
        back_populates="category",
        cascade="all, delete-orphan",
    )
