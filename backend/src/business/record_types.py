from typing import List

from database import RecordTypes
from .core import Business


class RecordTypesBusiness(Business):

    @classmethod
    def get_all_record_types(cls) -> List[RecordTypes]:
        session = cls.create_session()
        return cls.db.get_all_record_types(session)
