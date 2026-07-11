from decimal import Decimal
from datetime import datetime
from typing import Annotated, Optional

from pydantic import Field, StrictStr

from src.schemas.category import CategoryResponse
from src.schemas.core import RequestBase, ResponseBase


class IncomeResponse(ResponseBase):
    id: int
    name: str
    created_at: datetime
    amount: Decimal
    notes: Optional[str]
    category_id: Optional[int]
    family_id: int
    category: Optional[CategoryResponse]


class IncomeRequest(RequestBase):
    name: StrictStr
    created_at: datetime
    amount: Annotated[Decimal, Field(gt=0)]
    notes: Optional[StrictStr] = None
    category_id: Annotated[int, Field(strict=True, ge=1)]
