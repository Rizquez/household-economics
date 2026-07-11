from __future__ import annotations

from typing import TYPE_CHECKING
from fastapi import APIRouter, Depends

from src.auth import get_allowed_user
from src.business import FamilyBusiness
from src.schemas import FamilyResponse

if TYPE_CHECKING:
    from src.schemas import CurrentUser


router = APIRouter()


@router.get("")
def route_get_family_by_user_id(
    current_user: "CurrentUser" = Depends(get_allowed_user),
) -> FamilyResponse:
    return FamilyBusiness.get_family_by_user_id(current_user.id)
