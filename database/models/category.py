from sqlalchemy import Column, String

class Category:
    __tablename__ = "categories"

    category=Column(String, nullable=False)
    