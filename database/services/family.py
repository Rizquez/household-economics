from typing import Dict

from models import Family
from .core import ServiceBase


class FamilyService(ServiceBase):

    @classmethod
    def create_family(cls, session, a_dict: Dict) -> Family:
        return cls.create(session, a_dict, Family)
