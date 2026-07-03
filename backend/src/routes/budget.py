from __future__ import annotations

from typing import List, TYPE_CHECKING

from fastapi import APIRouter, Depends, status

from src.auth import get_allowed_user
from src.business import BudgetBusiness
from src.schemas import BudgetGroupResponse, BudgetResponse, BudgetUpdateRequest
from src.routes.helpers import validate_non_negative_num

if TYPE_CHECKING:
    from src.schemas import CurrentUser


router = APIRouter()


@router.post("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def route_create_budget_group(
    category_id: str,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> None:
    BudgetBusiness.create_budget_group(
        validate_non_negative_num(category_id),
        current_user.family_id,
    )


@router.get("/years")
def route_budget_years(
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> List[int]:
    return BudgetBusiness.get_budget_years(current_user.family_id)


@router.get("/{year}")
def route_get_budget_group(
    year: str,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> List[BudgetGroupResponse]:
    return BudgetBusiness.get_budget_group(
        validate_non_negative_num(year),
        current_user.family_id,
    )


@router.put("")
def route_update_budgets(
    request: List[BudgetUpdateRequest],
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> List[BudgetResponse]:
    return BudgetBusiness.update_budgets(
        [budget.model_dump() for budget in request],
        current_user.family_id,
    )
