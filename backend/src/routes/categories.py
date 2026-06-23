from typing import List
from fastapi import APIRouter

from src.business import CategoriesBusiness
from src.schemas import CategoryResponse

router = APIRouter()


@router.get("")
def all_categories() -> List[CategoryResponse]:
    return CategoriesBusiness.get_all_categories()
