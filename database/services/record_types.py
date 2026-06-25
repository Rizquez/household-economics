from __future__ import annotations

from typing import List, Optional, TYPE_CHECKING

from services.base import ServiceBase
from models import RecordTypes

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class RecordTypesService(ServiceBase):

    @classmethod
    def get_all_record_types(cls, session: "scoped_session") -> List[RecordTypes]:
        return cls.get_all(session, RecordTypes)

    @classmethod
    def get_record_type(
        cls,
        session: "scoped_session",
        record_type_id: int,
    ) -> Optional[RecordTypes]:
        return cls.get(session, record_type_id, RecordTypes)
