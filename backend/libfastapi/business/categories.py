from typing import List

from database_package import Categories
from .business import Business


class CategoriesBusiness(Business):

    @classmethod
    def get_all_categories(cls) -> List[Categories]:
        session = cls.create_session()
        return cls.db.get_all_categories(session)
