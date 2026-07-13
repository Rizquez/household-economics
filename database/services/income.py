from __future__ import annotations

from typing import Dict, Optional, List, Tuple, TYPE_CHECKING
from sqlalchemy import and_, extract
from sqlalchemy.orm import joinedload

from services.core import ServiceBase
from models import Income

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class IncomeService(ServiceBase):

    @staticmethod
    def get_incomes_by_month_and_year(
        session: "scoped_session",
        month: int,
        year: int,
        family_id: int,
    ) -> List[Income]:
        return (
            session.query(Income)
            .options(joinedload(Income.category))
            .filter(
                and_(
                    Income.family_id == family_id,
                    extract("month", Income.created_at) == month,
                    extract("year", Income.created_at) == year,
                )
            )
            .order_by(Income.created_at.desc(), Income.id.desc())
            .all()
        )

    @staticmethod
    def get_income_periods(
        session: "scoped_session",
        family_id: int,
    ) -> List[Tuple[int, int]]:
        return (
            session.query(
                extract("year", Income.created_at).label("year"),
                extract("month", Income.created_at).label("month"),
            )
            .filter(Income.family_id == family_id)
            .distinct()
            .all()
        )

    @classmethod
    def create_income(
        cls,
        session: "scoped_session",
        a_dict: Dict,
    ) -> Income:
        return cls.create(session, a_dict, Income)

    @classmethod
    def update_income(
        cls,
        session: "scoped_session",
        a_dict: Dict,
        income_id: int,
        family_id: int,
    ) -> Optional[Income]:
        income = cls.get_income_by_id_and_family(
            session,
            income_id,
            family_id,
        )

        if income is None:
            return None

        return cls.update(income, a_dict)

    @classmethod
    def delete_income(
        cls,
        session: "scoped_session",
        income_id: int,
        family_id: int,
    ) -> bool:
        income = cls.get_income_by_id_and_family(
            session,
            income_id,
            family_id,
        )

        if income is None:
            return False

        session.delete(income)
        return True

    @classmethod
    def get_income_by_id_and_family(
        cls,
        session: "scoped_session",
        income_id: int,
        family_id: int,
    ) -> Optional[Income]:
        return cls.find(
            session,
            and_(
                Income.id == income_id,
                Income.family_id == family_id,
            ),
            model=Income,
        )
    
    @classmethod
    def has_incomes_by_month_and_year(
        cls,
        session: "scoped_session",
        month: int,
        year: int,
        family_id: int,
    ) -> bool:
        return (
            cls.find(
                session,
                and_(
                    Income.family_id == family_id,
                    extract("month", Income.created_at) == month,
                    extract("year", Income.created_at) == year,
                ),
                model=Income,
            )
            is not None
        )

    @classmethod
    def get_income_by_savings_investment(
        cls,
        session: "scoped_session",
        savings_investment_id: int,
    ) -> Optional[Income]:
        return cls.find(
            session,
            Income.savings_investment_id == savings_investment_id,
            model=Income,
        )
