from __future__ import annotations

from typing import List, TYPE_CHECKING
from fastapi import APIRouter, Depends

from src.auth.depends import get_allowed_user
from src.business import RecordTypeBusiness
from src.schemas import RecordTypeResponse

if TYPE_CHECKING:
    from src.schemas import CurrentUser

router = APIRouter()


@router.get("")
def route_all_record_types(
    _: "CurrentUser" = Depends(get_allowed_user),
) -> List[RecordTypeResponse]:
    return RecordTypeBusiness.get_all_record_types()
