from typing import List
from fastapi import APIRouter

from libfastapi.business import CategoriesBusiness
from libfastapi.schemas import CategoryResponse

router = APIRouter()


@router.get("")
def all_categories() -> List[CategoryResponse]:
    return CategoriesBusiness.get_all_categories()
