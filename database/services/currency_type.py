from __future__ import annotations

from typing import List, Optional, TYPE_CHECKING

from models import CurrencyType
from .core import ServiceBase

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class CurrencyTypeService(ServiceBase):

    @classmethod
    def get_currency_type_by_name(
        cls, session: "scoped_session", name: str
    ) -> Optional[CurrencyType]:
        return cls.find(session, CurrencyType.name == name, model=CurrencyType)

    @classmethod
    def get_currency_type_by_id(
        cls, session: "scoped_session", currency_type_id: int
    ) -> Optional[CurrencyType]:
        return cls.get(session, currency_type_id, CurrencyType)

    @classmethod
    def get_all_currency_types(cls, session: "scoped_session") -> List[CurrencyType]:
        return cls.find_all(session, model=CurrencyType, order_by=CurrencyType.name)
