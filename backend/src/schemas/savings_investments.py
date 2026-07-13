from decimal import Decimal
from typing import Annotated

from pydantic import Field

from src.schemas.core import RequestBase, ResponseBase


class SavingsInvestmentsResponse(ResponseBase):
    id: int
    year: int
    month: int
    available_amount: Decimal
    savings_amount: Decimal
    investment_amount: Decimal
    family_id: int


class SavingsInvestmentsRequest(RequestBase):
    year: Annotated[int, Field(strict=True, ge=1)]
    month: Annotated[int, Field(strict=True, ge=1, le=12)]
    available_amount: Annotated[Decimal, Field(ge=0)]
    savings_amount: Annotated[Decimal, Field(ge=0)]
    investment_amount: Annotated[Decimal, Field(ge=0)]
