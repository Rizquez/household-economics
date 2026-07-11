from src.schemas.core import ResponseBase


class MonthlyTrackingPeriodResponse(ResponseBase):
    month: int
    year: int
