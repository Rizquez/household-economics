from typing import Optional, Dict

from models import Role
from .core import ServiceBase


class RoleService(ServiceBase):

    @classmethod
    def get_role_by_name(cls, session, name: str) -> Optional[Role]:
        return cls.find(session, Role.name == name, model=Role)
