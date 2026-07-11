from typing import List

from src.business.core import Business
from src.schemas import MonthlyTrackingPeriodResponse


class MonthlyTrackingBusiness(Business):

    @classmethod
    def get_periods(
        cls,
        family_id: int,
    ) -> List[MonthlyTrackingPeriodResponse]:
        session = cls.create_session()
        try:
            income_periods = cls.db.get_income_periods(session, family_id)
            expense_periods = cls.db.get_expense_periods(session, family_id)

            periods = {
                (int(year), int(month))
                for year, month in [*income_periods, *expense_periods]
            }

            return [
                MonthlyTrackingPeriodResponse(year=year, month=month)
                for year, month in sorted(periods, reverse=True)
            ]
        finally:
            session.close()
