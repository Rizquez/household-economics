from __future__ import annotations

from typing import Optional, TYPE_CHECKING

from models import Role
from .core import ServiceBase

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class RoleService(ServiceBase):

    @classmethod
    def get_role_by_name(cls, session: "scoped_session", name: str) -> Optional[Role]:
        return cls.find(session, Role.name == name, model=Role)
