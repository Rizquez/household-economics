from __future__ import annotations

from typing import Dict, List, Optional, Tuple, TYPE_CHECKING
from sqlalchemy import and_, extract
from sqlalchemy.orm import joinedload, selectinload

from services.core import ServiceBase
from models import Expense, ExpenseItem

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class ExpenseService(ServiceBase):

    @staticmethod
    def get_expenses_by_month_and_year(
        session: "scoped_session",
        month: int,
        year: int,
        family_id: int,
    ) -> List[Expense]:
        return (
            session.query(Expense)
            .options(
                joinedload(Expense.category),
                selectinload(Expense.items).joinedload(ExpenseItem.category),
            )
            .filter(
                and_(
                    Expense.family_id == family_id,
                    extract("month", Expense.created_at) == month,
                    extract("year", Expense.created_at) == year,
                )
            )
            .order_by(Expense.created_at.desc(), Expense.id.desc())
            .all()
        )

    @staticmethod
    def get_expense_periods(
        session: "scoped_session",
        family_id: int,
    ) -> List[Tuple[int, int]]:
        return (
            session.query(
                extract("year", Expense.created_at).label("year"),
                extract("month", Expense.created_at).label("month"),
            )
            .filter(Expense.family_id == family_id)
            .distinct()
            .all()
        )

    @classmethod
    def create_expense(
        cls,
        session: "scoped_session",
        a_dict: Dict,
        items: Optional[List[Dict]],
    ) -> Expense:
        expense = cls.create(session, a_dict, Expense)
        session.flush()

        if items is not None:
            for item in items:
                cls.create(
                    session,
                    {
                        **item,
                        "expense_id": expense.id,
                    },
                    ExpenseItem,
                )

        return expense

    @classmethod
    def update_expense(
        cls,
        session: "scoped_session",
        a_dict: Dict,
        items: Optional[List[Dict]],
        expense_id: int,
        family_id: int,
    ) -> Optional[Expense]:
        expense = cls.get_expense_by_id_and_family(
            session,
            expense_id,
            family_id,
        )

        if expense is None:
            return None

        updated_expense = cls.update(expense, a_dict)

        if items is not None:
            for item in list(expense.items):
                session.delete(item)

            session.flush()

            for item in items:
                cls.create(
                    session,
                    {
                        **item,
                        "expense_id": expense.id,
                    },
                    ExpenseItem,
                )

        return updated_expense

    @classmethod
    def delete_expense(
        cls,
        session: "scoped_session",
        expense_id: int,
        family_id: int,
    ) -> bool:
        expense = cls.get_expense_by_id_and_family(
            session,
            expense_id,
            family_id,
        )

        if expense is None:
            return False

        session.delete(expense)
        return True

    @classmethod
    def get_expense_by_id_and_family(
        cls,
        session: "scoped_session",
        expense_id: int,
        family_id: int,
    ) -> Optional[Expense]:
        return cls.find(
            session,
            and_(
                Expense.id == expense_id,
                Expense.family_id == family_id,
            ),
            model=Expense,
        )
    
    @classmethod
    def has_expenses_by_month_and_year(
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
                    Expense.family_id == family_id,
                    extract("month", Expense.created_at) == month,
                    extract("year", Expense.created_at) == year,
                ),
                model=Expense,
            )
            is not None
        )
