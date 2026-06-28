from __future__ import annotations

from typing import List, Optional, TYPE_CHECKING

from services.core import ServiceBase
from models import RecordType

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class RecordTypeService(ServiceBase):

    @classmethod
    def get_all_record_type(cls, session: "scoped_session") -> List[RecordType]:
        return cls.get_all(session, RecordType)

    @classmethod
    def get_record_type(
        cls,
        session: "scoped_session",
        record_type_id: int,
    ) -> Optional[RecordType]:
        return cls.get(session, record_type_id, RecordType)
