from src.schemas.core import ResponseBase


class FamilyResponse(ResponseBase):
    id: int
    name: str
