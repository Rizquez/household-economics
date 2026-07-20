from __future__ import annotations

from typing import TypeVar, List, Type, Optional, Dict, Any, TYPE_CHECKING

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session
    from models import ModelBase

TModel = TypeVar("TModel", bound="ModelBase")


class ServiceBase(object):

    @staticmethod
    def get(
        session: "scoped_session", ident: int, model: Type[TModel]
    ) -> Optional[TModel]:
        return session.get(model, ident)

    @classmethod
    def get_all(cls, session: "scoped_session", model: Type[TModel]) -> List[TModel]:
        return cls.find_all(session, model=model)

    @classmethod
    def create(
        cls, session: "scoped_session", a_dict: Dict, model: Type[TModel]
    ) -> TModel:
        instance = cls.create_model(a_dict, model)
        session.add(instance)
        return instance

    @classmethod
    def update(cls, instance: TModel, a_dict: Dict) -> TModel:
        valid_dict = instance.valid_dict(a_dict)
        for key, value in valid_dict.items():
            setattr(instance, key, value)
        return instance

    @classmethod
    def delete(cls, session: "scoped_session", ident: int, model: Type[TModel]) -> bool:
        instance = cls.get(session, ident, model)
        if instance is None:
            return False
        session.delete(instance)
        return True

    @classmethod
    def create_model(
        cls, a_dict: Dict, model: Type[TModel], ident: Optional[int] = None
    ) -> TModel:
        valid_dict = model.valid_dict(a_dict)
        if ident:
            valid_dict["id"] = ident
        return model(**valid_dict)

    @staticmethod
    def find(
        session: "scoped_session",
        *filters: Any,
        model: Type[TModel],
        order_by: Optional[Any] = None,
    ) -> Optional[TModel]:
        query = session.query(model)

        if filters:
            query = query.filter(*filters)

        if order_by is not None:
            query = query.order_by(order_by)

        return query.first()

    @staticmethod
    def find_all(
        session: "scoped_session",
        *filters: Any,
        model: Type[TModel],
        order_by: Optional[Any] = None,
    ) -> List[TModel]:
        query = session.query(model)

        if filters:
            query = query.filter(*filters)

        if order_by is not None:
            query = query.order_by(order_by)

        return query.all()

    @staticmethod
    def count(
        session: "scoped_session",
        *filters: Any,
        model: Type[TModel],
    ) -> int:
        query = session.query(model)

        if filters:
            query = query.filter(*filters)

        return query.count()
