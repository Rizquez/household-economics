from typing import List
from fastapi import APIRouter

from src.business import RecordTypeBusiness
from src.schemas import RecordTypeResponse

router = APIRouter()


@router.get("")
def route_all_record_types() -> List[RecordTypeResponse]:
    return RecordTypeBusiness.get_all_record_types()
