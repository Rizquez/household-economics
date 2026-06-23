from pydantic import Field

from .base import ResponseBase, RequestBase


class CategoryResponse(ResponseBase):
    id: int
    category: str

class CategoryRequest(RequestBase):
    category: str = Field(min_length=1, max_length=25)
