from typing import List

from database import RecordType
from src.business.core import Business


class RecordTypeBusiness(Business):

    @classmethod
    def get_all_record_types(cls) -> List[RecordType]:
        session = cls.create_session()
        try:
            return cls.db.get_all_record_type(session)
        finally:
            session.close()
