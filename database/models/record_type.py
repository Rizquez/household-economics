from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from models.core import ModelBase


class RecordType(ModelBase):
    __tablename__ = "record_type"

    name = Column(String, nullable=False)

    category = relationship("Category", back_populates="record_type")
