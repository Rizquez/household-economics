from sqlalchemy import Column, BigInteger
from sqlalchemy.orm import declarative_base
from typing import Dict

Base = declarative_base()


class ModelBase(Base):
    __abstract__ = True

    id = Column(BigInteger, autoincrement=True, primary_key=True, nullable=False)

    @classmethod
    def valid_dict(cls, a_dict: Dict) -> Dict:
        return {
            key: value 
            for key, value in a_dict.items() 
            if key in cls.__table__.columns
        }
