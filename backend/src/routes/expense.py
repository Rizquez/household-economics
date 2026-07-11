from __future__ import annotations

from typing import List, TYPE_CHECKING
from fastapi import APIRouter, Depends, status

from src.auth import get_allowed_user
from src.business import ExpenseBusiness
from src.schemas import ExpenseRequest, ExpenseResponse
from src.routes.helpers import validate_non_negative_num

if TYPE_CHECKING:
    from src.schemas import CurrentUser


router = APIRouter()


@router.get("/{month}/{year}")
def route_get_expenses_by_month_and_year(
    month: str,
    year: str,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> List[ExpenseResponse]:
    return ExpenseBusiness.get_expenses_by_month_and_year(
        validate_non_negative_num(month),
        validate_non_negative_num(year),
        current_user.family_id,
    )


@router.post("")
def route_create_expense(
    request: ExpenseRequest,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> ExpenseResponse:
    a_dict = request.model_dump()
    items = a_dict.pop("items", None)
    return ExpenseBusiness.create_expense(
        a_dict,
        items,
        current_user.family_id,
    )


@router.put("/{expense_id}")
def route_update_expense(
    expense_id: str,
    request: ExpenseRequest,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> ExpenseResponse:
    a_dict = request.model_dump()
    items = a_dict.pop("items", None)
    return ExpenseBusiness.update_expense(
        a_dict,
        items,
        validate_non_negative_num(expense_id),
        current_user.family_id,
    )


@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
def route_delete_expense(
    expense_id: str,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> None:
    ExpenseBusiness.delete_expense(
        validate_non_negative_num(expense_id),
        current_user.family_id,
    )
