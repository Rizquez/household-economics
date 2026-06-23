from typing import List
from fastapi import APIRouter, status

from src.business import CategoriesBusiness
from src.schemas import CategoryResponse, CategoryRequest
from src.helpers import validate_non_negative_num

router = APIRouter()


@router.get("")
def route_all_categories() -> List[CategoryResponse]:
    return CategoriesBusiness.get_all_categories()

@router.post("", status_code=status.HTTP_204_NO_CONTENT)
def route_create_category(request: CategoryRequest) -> None:
    CategoriesBusiness.create_category(request.model_dump())

@router.delete("/{ident}", status_code=status.HTTP_204_NO_CONTENT)
def route_delete_category(ident: str) -> None:
    CategoriesBusiness.delete_category(validate_non_negative_num(ident))
