from __future__ import annotations

from typing import Optional, Dict, TYPE_CHECKING

from models import User
from .core import ServiceBase

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class UserService(ServiceBase):

    @classmethod
    def get_user_by_clerk_id(
        cls, session: "scoped_session", clerk_id: str
    ) -> Optional[User]:
        return cls.find(session, User.clerk_id == clerk_id, model=User)

    @classmethod
    def create_user(cls, session: "scoped_session", a_dict: Dict) -> User:
        return cls.create(session, a_dict, User)

    @classmethod
    def get_user_by_email(cls, session: "scoped_session", email: str) -> Optional[User]:
        return cls.find(session, User.email == email, model=User)
