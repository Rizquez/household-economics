from typing import List
from fastapi import APIRouter, status

from src.business import CategoriesBusiness
from src.schemas import CategoryResponse, CategoryRequest
from .helpers.validate import validate_non_negative_num

router = APIRouter()


@router.get("/{record_type_id}")
def route_all_categories(record_type_id: str) -> List[CategoryResponse]:
    return CategoriesBusiness.get_categories_by_record_type(
        validate_non_negative_num(record_type_id)
    )


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
def route_create_category(request: CategoryRequest) -> None:
    CategoriesBusiness.create_category(request.model_dump())


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def route_delete_category(category_id: str) -> None:
    CategoriesBusiness.delete_category(validate_non_negative_num(category_id))
