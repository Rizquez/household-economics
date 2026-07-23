from src.schemas.core import ResponseBase


class CurrencyTypeResponse(ResponseBase):
    id: int
    code: str
    symbol: str
    name: str
