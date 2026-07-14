from __future__ import annotations

from typing import TYPE_CHECKING
from fastapi import APIRouter, Depends

from src.auth import get_allowed_user
from src.business import DashboardBusiness
from src.routes.helpers import validate_non_negative_num
from src.schemas import DashboardResponse

if TYPE_CHECKING:
    from src.schemas import CurrentUser


router = APIRouter()


@router.get("/{month}/{year}")
def route_get_dashboard(
    month: str,
    year: str,
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> DashboardResponse:
    return DashboardBusiness.get_dashboard(
        validate_non_negative_num(month),
        validate_non_negative_num(year),
        current_user.family_id,
    )
