from sqlalchemy import Column, String

from models.base import ModelBase


class Categories(ModelBase):
    __tablename__ = "categories"

    category = Column(String, nullable=False)
