from typing import List
from fastapi import APIRouter

from src.business import RecordTypesBusiness
from src.schemas import RecordTypesResponse

router = APIRouter()


@router.get("")
def route_all_record_types() -> List[RecordTypesResponse]:
    return RecordTypesBusiness.get_all_record_types()
