from __future__ import annotations

from typing import List

from database import CurrencyType
from src.business.core import Business


class CurrencyTypeBusiness(Business):

    @classmethod
    def get_all_currency_types(cls) -> List[CurrencyType]:
        session = cls.create_session()
        try:
            return cls.db.get_all_currency_types(session)
        finally:
            session.close()
