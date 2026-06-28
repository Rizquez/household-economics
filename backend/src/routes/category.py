from __future__ import annotations

from typing import List, TYPE_CHECKING
from fastapi import APIRouter, status, Depends

from src.auth.depends import get_current_user
from src.business import CategoryBusiness
from src.schemas import CategoryResponse, CategoryRequest
from .helpers.validate import validate_non_negative_num

if TYPE_CHECKING:
    from src.schemas import CurrentUser


router = APIRouter()


@router.get("/{record_type_id}")
def route_all_categories(
    record_type_id: str,
    current_user: "CurrentUser" = Depends(get_current_user),
) -> List[CategoryResponse]:
    return CategoryBusiness.get_category_by_record_type(
        validate_non_negative_num(record_type_id)
    )


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
def route_create_category(
    request: CategoryRequest,
    current_user: "CurrentUser" = Depends(get_current_user),
) -> None:
    CategoryBusiness.create_category(request.model_dump())


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def route_delete_category(
    category_id: str,
    current_user: "CurrentUser" = Depends(get_current_user),
) -> None:
    CategoryBusiness.delete_category(validate_non_negative_num(category_id))
