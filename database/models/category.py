from sqlalchemy import Column, String, BigInteger, ForeignKey
from sqlalchemy.orm import relationship

from models.core import ModelBase


class Category(ModelBase):
    __tablename__ = "category"

    name = Column(String, nullable=False)

    record_type_id = Column(
        BigInteger,
        ForeignKey("record_type.id", name="fk_category_record_type_id"),
        nullable=False,
    )

    record_type = relationship("RecordType", back_populates="category")
