from __future__ import annotations

from typing import List, TYPE_CHECKING
from fastapi import APIRouter, Depends

from src.auth import get_allowed_user
from src.business import MonthlyTrackingBusiness
from src.schemas import MonthlyTrackingPeriodResponse

if TYPE_CHECKING:
    from src.schemas import CurrentUser


router = APIRouter()


@router.get("/periods")
def route_get_monthly_tracking_periods(
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> List[MonthlyTrackingPeriodResponse]:
    return MonthlyTrackingBusiness.get_periods(current_user.family_id)
