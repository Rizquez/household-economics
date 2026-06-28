from fastapi import APIRouter, Depends

from src.auth.depends import get_current_user
from src.schemas import CurrentUser

router = APIRouter()


@router.get("/me")
def route_me(
    current_user: CurrentUser = Depends(get_current_user),
) -> CurrentUser:
    return current_user
