from __future__ import annotations

from typing import List, TYPE_CHECKING
from fastapi import APIRouter, Depends

from src.auth import get_valid_user
from src.business import CurrencyTypeBusiness
from src.schemas import CurrencyTypeResponse

if TYPE_CHECKING:
    from src.schemas import CurrentUser

router = APIRouter()


@router.get("")
def route_get_all_currency_types(
    _: "CurrentUser" = Depends(get_valid_user),
) -> List[CurrencyTypeResponse]:
    return CurrencyTypeBusiness.get_all_currency_types()
