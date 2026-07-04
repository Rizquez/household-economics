from src.schemas.core import ResponseBase


class RecordTypeResponse(ResponseBase):
    id: int
    name: str
