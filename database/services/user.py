from typing import Optional, Dict

from models import User
from .core import ServiceBase


class UserService(ServiceBase):

    @classmethod
    def get_user_by_clerk_id(cls, session, clerk_id: str) -> Optional[User]:
        return cls.find(session, User.clerk_id == clerk_id, model=User)

    @classmethod
    def create_user(cls, session, a_dict: Dict) -> User:
        return cls.create(session, a_dict, User)

    @classmethod
    def get_user_by_email(cls, session, email: str) -> Optional[User]:
        return cls.find(session, User.email == email, model=User)
