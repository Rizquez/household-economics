from decimal import Decimal
from datetime import datetime
from typing import Annotated, List, Optional

from pydantic import Field, StrictStr

from src.schemas.category import CategoryResponse
from src.schemas.core import RequestBase, ResponseBase


class ExpenseItemResponse(ResponseBase):
    id: int
    product: str
    amount: Decimal
    category_id: Optional[int]
    expense_id: int
    category: Optional[CategoryResponse]


class ExpenseResponse(ResponseBase):
    id: int
    name: str
    created_at: datetime
    amount: Decimal
    notes: Optional[str]
    category_id: Optional[int]
    family_id: int
    category: Optional[CategoryResponse]
    items: List[ExpenseItemResponse]


class ExpenseItemRequest(RequestBase):
    product: StrictStr
    amount: Annotated[Decimal, Field(gt=0)]
    category_id: Annotated[int, Field(strict=True, ge=1)]


class ExpenseRequest(RequestBase):
    name: StrictStr
    created_at: datetime
    amount: Annotated[Decimal, Field(gt=0)]
    notes: Optional[StrictStr] = None
    category_id: Optional[Annotated[int, Field(strict=True, ge=1)]] = None
    items: Optional[List[ExpenseItemRequest]] = None
