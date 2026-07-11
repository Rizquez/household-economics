from __future__ import annotations

from typing import List, TYPE_CHECKING
from fastapi import APIRouter, Depends, status

from src.auth import get_allowed_user
from src.business import IncomeBusiness
from src.schemas import IncomeRequest, IncomeResponse
from src.routes.helpers import validate_non_negative_num

if TYPE_CHECKING:
    from src.schemas import CurrentUser


router = APIRouter()


@router.get("/{month}/{year}")
def route_get_incomes_by_month_and_year(
    month: str,
    year: str,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> List[IncomeResponse]:
    return IncomeBusiness.get_incomes_by_month_and_year(
        validate_non_negative_num(month),
        validate_non_negative_num(year),
        current_user.family_id,
    )


@router.post("")
def route_create_income(
    request: IncomeRequest,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> IncomeResponse:
    return IncomeBusiness.create_income(
        request.model_dump(),
        current_user.family_id,
    )


@router.put("/{income_id}")
def route_update_income(
    income_id: str,
    request: IncomeRequest,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> IncomeResponse:
    return IncomeBusiness.update_income(
        request.model_dump(),
        validate_non_negative_num(income_id),
        current_user.family_id,
    )


@router.delete("/{income_id}", status_code=status.HTTP_204_NO_CONTENT)
def route_delete_income(
    income_id: str,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> None:
    IncomeBusiness.delete_income(
        validate_non_negative_num(income_id),
        current_user.family_id,
    )
