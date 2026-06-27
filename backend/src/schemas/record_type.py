from .core import ResponseBase


class RecordTypeResponse(ResponseBase):
    id: int
    record_type: str
