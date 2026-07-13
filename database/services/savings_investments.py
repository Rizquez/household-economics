from __future__ import annotations

from decimal import Decimal
from typing import Dict, List, Optional, TYPE_CHECKING
from sqlalchemy import and_, extract

from services.core import ServiceBase
from services.expense import ExpenseService
from services.income import IncomeService
from models import SavingsInvestments

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


class SavingsInvestmentsService(ServiceBase):

    @classmethod
    def create_savings_investment(
        cls,
        session: "scoped_session",
        a_dict: Dict,
    ) -> SavingsInvestments:
        return cls.create(
            session,
            a_dict,
            SavingsInvestments,
        )

    @classmethod
    def update_savings_investment(
        cls,
        session: "scoped_session",
        a_dict: Dict,
        savings_investment_id: int,
        family_id: int,
    ) -> Optional[SavingsInvestments]:
        savings_investment = cls.find(
            session,
            and_(
                SavingsInvestments.id == savings_investment_id,
                SavingsInvestments.family_id == family_id,
            ),
            model=SavingsInvestments,
        )

        if savings_investment is None:
            return None

        return cls.update(
            savings_investment,
            a_dict,
        )

    @classmethod
    def get_savings_investment_by_month_and_year(
        cls,
        session: "scoped_session",
        month: int,
        year: int,
        family_id: int,
    ) -> Optional[SavingsInvestments]:
        return cls.find(
            session,
            and_(
                SavingsInvestments.family_id == family_id,
                SavingsInvestments.month == month,
                SavingsInvestments.year == year,
            ),
            model=SavingsInvestments,
        )

    @classmethod
    def get_savings_investments_by_year(
        cls,
        session: "scoped_session",
        year: int,
        family_id: int,
    ) -> List[SavingsInvestments]:
        return cls.find_all(
            session,
            and_(
                SavingsInvestments.family_id == family_id,
                SavingsInvestments.year == year,
            ),
            model=SavingsInvestments,
            order_by=SavingsInvestments.month,
        )

    @staticmethod
    def get_available_amount_by_month_and_year(
        session: "scoped_session",
        month: int,
        year: int,
        family_id: int,
    ) -> Decimal:
        incomes = IncomeService.get_incomes_by_month_and_year(
            session,
            month,
            year,
            family_id,
        )

        expenses = ExpenseService.get_expenses_by_month_and_year(
            session,
            month,
            year,
            family_id,
        )

        total_incomes = sum(
            (income.amount for income in incomes),
            Decimal("0"),
        )

        total_expenses = sum(
            (expense.amount for expense in expenses),
            Decimal("0"),
        )

        return total_incomes - total_expenses

    @classmethod
    def synchronize_savings_investment(
        cls,
        session: "scoped_session",
        month: int,
        year: int,
        family_id: int,
    ) -> None:
        savings_investment = cls.get_savings_investment_by_month_and_year(
            session,
            month,
            year,
            family_id,
        )

        if savings_investment is None:
            return

        has_incomes = IncomeService.has_incomes_by_month_and_year(
            session,
            month,
            year,
            family_id,
        )

        has_expenses = ExpenseService.has_expenses_by_month_and_year(
            session,
            month,
            year,
            family_id,
        )

        if not has_incomes and not has_expenses:
            session.delete(savings_investment)
            return

        current_available_amount = cls.get_available_amount_by_month_and_year(
            session,
            month,
            year,
            family_id,
        )

        stored_available_amount = savings_investment.available_amount
        
        if current_available_amount == stored_available_amount:
            return

        update_data = {
            "available_amount": current_available_amount,
        }

        if current_available_amount < stored_available_amount:
            update_data.update(
                {
                    "savings_amount": Decimal("0"),
                    "investment_amount": Decimal("0"),
                }
            )

        cls.update(
            savings_investment,
            update_data,
        )
