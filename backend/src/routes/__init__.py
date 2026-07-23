from __future__ import annotations

from typing import TYPE_CHECKING

from .budget import router as budget_router
from .category import router as category_router
from .currency_type import router as currency_type_router
from .dashboard import router as dashboard_router
from .expense import router as expense_router
from .family import router as family_router
from .income import router as income_router
from .monthly_tracking import router as monthly_tracking_router
from .record_type import router as record_type_router
from .savings_investments import router as savings_investments_router
from .user import router as router_user

if TYPE_CHECKING:
    from fastapi import FastAPI


map_routers = {
    "/annual-budget": (budget_router, "Annual Budget"),
    "/category": (category_router, "Category"),
    "/currency-type": (currency_type_router, "Currency Type"),
    "/dashboard": (dashboard_router, "Dashboard"),
    "/expense": (expense_router, "Expense"),
    "/family": (family_router, "Family"),
    "/income": (income_router, "Income"),
    "/monthly-tracking": (monthly_tracking_router, "Monthly Tracking"),
    "/record-type": (record_type_router, "Record Type"),
    "/savings-investments": (savings_investments_router, "Savings Investments"),
    "/user": (router_user, "User"),
}


def setup_routers(app: "FastAPI") -> None:
    for prefix, (router, tag) in map_routers.items():
        app.include_router(
            router=router,
            prefix=prefix,
            tags=[tag],
        )
