from __future__ import annotations

from typing import Dict, TYPE_CHECKING

from models import Family
from .core import ServiceBase

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class FamilyService(ServiceBase):

    @classmethod
    def create_family(cls, session: "scoped_session", a_dict: Dict) -> Family:
        return cls.create(session, a_dict, Family)
