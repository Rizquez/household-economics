from sqlalchemy import Column, String, BigInteger, ForeignKey
from sqlalchemy.orm import relationship

from models.base import ModelBase


class Categories(ModelBase):
    __tablename__ = "categories"

    category = Column(String, nullable=False)

    record_type_id = Column(BigInteger, ForeignKey("record_types.id", name="fk_categories_record_type_id"), nullable=False)

    record_type = relationship("RecordTypes", back_populates="categories")
