from typing import Annotated
from pydantic import Field, StrictStr, EmailStr

from src.schemas.core import ResponseBase, RequestBase
from src.schemas.enums import Role
from src.schemas.currency_type import CurrencyTypeResponse


class FamilyResponse(ResponseBase):
    id: int
    name: str
    currency_type_id: int
    currency_type: CurrencyTypeResponse


class FamilyUpdateRequest(RequestBase):
    name: Annotated[
        StrictStr,
        Field(min_length=5, max_length=25),
    ]
    currency_type_id: Annotated[int, Field(strict=True, ge=1)]


class FamilyMemberResponse(ResponseBase):
    id: int
    user_id: int
    name: str
    email: str
    role: Role


class FamilyInvitationRequest(RequestBase):
    email: EmailStr
