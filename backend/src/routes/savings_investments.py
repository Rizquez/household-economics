from __future__ import annotations

from decimal import Decimal
from typing import List, Optional, TYPE_CHECKING
from fastapi import APIRouter, Depends, status

from src.auth import get_allowed_user
from src.business import SavingsInvestmentsBusiness
from src.routes.helpers import validate_non_negative_num
from src.schemas import SavingsInvestmentsRequest, SavingsInvestmentsResponse

if TYPE_CHECKING:
    from src.schemas import CurrentUser


router = APIRouter()


@router.get("/available/{month}/{year}")
def route_get_available_amount_by_month_and_year(
    month: str,
    year: str,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> Decimal:
    return SavingsInvestmentsBusiness.get_available_amount_by_month_and_year(
        validate_non_negative_num(month),
        validate_non_negative_num(year),
        current_user.family_id,
    )


@router.get("/history/{year}")
def route_get_savings_investments_by_year(
    year: str,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> List[SavingsInvestmentsResponse]:
    return SavingsInvestmentsBusiness.get_savings_investments_by_year(
        validate_non_negative_num(year),
        current_user.family_id,
    )


@router.post("", status_code=status.HTTP_201_CREATED)
def route_create_savings_investment(
    request: SavingsInvestmentsRequest,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> SavingsInvestmentsResponse:
    return SavingsInvestmentsBusiness.create_savings_investment(
        request.model_dump(),
        current_user.family_id,
    )


@router.put("/{savings_investment_id}")
def route_update_savings_investment(
    savings_investment_id: str,
    request: SavingsInvestmentsRequest,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> SavingsInvestmentsResponse:
    return SavingsInvestmentsBusiness.update_savings_investment(
        request.model_dump(),
        validate_non_negative_num(savings_investment_id),
        current_user.family_id,
    )


@router.get("/{month}/{year}")
def route_get_savings_investment_by_month_and_year(
    month: str,
    year: str,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> Optional[SavingsInvestmentsResponse]:
    return SavingsInvestmentsBusiness.get_savings_investment_by_month_and_year(
        validate_non_negative_num(month),
        validate_non_negative_num(year),
        current_user.family_id,
    )
