from .base import ResponseBase

class RecordTypesResponse(ResponseBase):
    id: int
    record_type: str