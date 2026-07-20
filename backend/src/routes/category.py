from __future__ import annotations

from typing import List, TYPE_CHECKING
from fastapi import APIRouter, status, Depends

from src.auth import get_valid_user
from src.business import CategoryBusiness
from src.schemas import CategoryResponse, CategoryRequest
from src.routes.helpers import validate_non_negative_num

if TYPE_CHECKING:
    from src.schemas import CurrentUser


router = APIRouter()


@router.get("/{record_type_id}")
def route_all_categories(
    record_type_id: str,
    current_user: "CurrentUser" = Depends(get_valid_user),
) -> List[CategoryResponse]:
    return CategoryBusiness.get_category_by_record_type(
        validate_non_negative_num(record_type_id), current_user.family_id
    )


@router.post("")
def route_create_category(
    request: CategoryRequest,
    current_user: "CurrentUser" = Depends(get_valid_user),
) -> CategoryResponse:
    return CategoryBusiness.create_category(
        request.model_dump(), current_user.family_id
    )


@router.put("/{category_id}")
def route_update_category(
    category_id: str,
    request: CategoryRequest,
    current_user: "CurrentUser" = Depends(get_valid_user),
) -> CategoryResponse:
    return CategoryBusiness.update_category(
        request.model_dump(),
        validate_non_negative_num(category_id),
        current_user.family_id,
    )


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def route_delete_category(
    category_id: str,
    current_user: "CurrentUser" = Depends(get_valid_user),
) -> None:
    CategoryBusiness.delete_category(
        validate_non_negative_num(category_id), current_user.family_id
    )
