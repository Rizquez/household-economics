from sqlalchemy import Column, BigInteger
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class ModelBase(Base):
    __abstract__ = True

    id = Column(BigInteger, autoincrement=True, primary_key=True, nullable=False)
