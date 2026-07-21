from typing import Annotated
from pydantic import Field, StrictStr, EmailStr

from src.schemas.core import ResponseBase, RequestBase
from src.schemas.enums import Role


class FamilyResponse(ResponseBase):
    id: int
    name: str


class FamilyUpdateRequest(RequestBase):
    name: Annotated[
        StrictStr,
        Field(min_length=5, max_length=15),
    ]


class FamilyMemberResponse(ResponseBase):
    id: int
    user_id: int
    name: str
    email: str
    role: Role


class CreateInvitationRequest(RequestBase):
    email: EmailStr
