from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from models.base import ModelBase


class RecordTypes(ModelBase):
    __tablename__ = "record_types"

    record_type = Column(String, nullable=False)

    categories = relationship("Categories", back_populates="record_type")
