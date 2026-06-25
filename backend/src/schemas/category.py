from pydantic import Field, StrictStr, field_validator
from typing import Annotated

from .base import ResponseBase, RequestBase


class CategoryResponse(ResponseBase):
    id: int
    category: str
    record_type_id: int


class CategoryRequest(RequestBase):
    category: StrictStr
    record_type_id: Annotated[int, Field(strict=True, ge=1)]

    @field_validator("category")
    @classmethod
    def validate_category(cls, value: str) -> str:
        value = value.strip()
        if len(value) < 3:
            raise ValueError("Category must contain at least 3 characters.")
        if len(value) > 25:
            raise ValueError("Category cannot exceed 25 characters.")
        return value
