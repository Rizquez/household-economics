from sqlalchemy import Column, String

from .base import HouseholdEconomics


class Categories(HouseholdEconomics):
    __tablename__ = "categories"

    category = Column(String, nullable=False)
