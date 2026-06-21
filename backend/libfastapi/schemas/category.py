from .base import ResponseBase


class CategoryResponse(ResponseBase):
    id: int
    category: str
