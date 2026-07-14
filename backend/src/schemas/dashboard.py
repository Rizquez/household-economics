from decimal import Decimal
from typing import List, Optional

from src.schemas.core import ResponseBase


class DashboardOverviewResponse(ResponseBase):
    income: Decimal
    expenses: Decimal
    available: Decimal
    remaining: Decimal


class DashboardAllocationResponse(ResponseBase):
    savings: Decimal
    investments: Decimal
    remaining: Decimal
    has_allocation: bool


class DashboardBudgetStatusResponse(ResponseBase):
    category_id: int
    category_name: str
    budget: Decimal
    expenses: Decimal
    income: Decimal
    available: Decimal


class DashboardTopExpenseCategoryResponse(ResponseBase):
    category_id: int
    category_name: str
    amount: Decimal


class DashboardAnnualAllocationResponse(ResponseBase):
    savings: Decimal
    investments: Decimal
    total: Decimal


class DashboardPreviousMonthTransferResponse(ResponseBase):
    type: str
    amount: Decimal


class DashboardResponse(ResponseBase):
    month: int
    year: int
    overview: DashboardOverviewResponse
    allocation: DashboardAllocationResponse
    budget_status: List[DashboardBudgetStatusResponse]
    top_expense_categories: List[DashboardTopExpenseCategoryResponse]
    annual_allocation: DashboardAnnualAllocationResponse
    previous_month_transfer: Optional[DashboardPreviousMonthTransferResponse]
