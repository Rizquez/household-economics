from decimal import Decimal
from typing import Annotated, List
from pydantic import Field

from src.schemas.core import RequestBase, ResponseBase


class BudgetResponse(ResponseBase):
    id: int
    month: int
    amount: Decimal
    budget_group_id: int


class BudgetGroupResponse(ResponseBase):
    id: int
    name: str
    year: int
    category_id: int
    budgets: List[BudgetResponse]


class BudgetUpdateRequest(RequestBase):
    id: Annotated[int, Field(strict=True, ge=1)]
    amount: Annotated[Decimal, Field(ge=0)]
