from typing import Annotated
from pydantic import Field, StrictStr

from src.schemas.core import ResponseBase, RequestBase


class FamilyResponse(ResponseBase):
    id: int
    name: str

class FamilyUpdateRequest(RequestBase):
    name: Annotated[
        StrictStr,
        Field(min_length=5, max_length=15),
    ]
