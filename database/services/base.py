from __future__ import annotations

from typing import TypeVar, List, Type, Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session
    from models import ModelBase

TModel = TypeVar("TModel", bound="ModelBase")


class ServiceBase(object):

    @staticmethod
    def get(
        session: "scoped_session", ident: int, model: Type[TModel]
    ) -> Optional[Type[TModel]]:
        return session.get(model, ident)

    @staticmethod
    def get_all(session: "scoped_session", model: Type[TModel]) -> List[TModel]:
        return session.query(model).all()
