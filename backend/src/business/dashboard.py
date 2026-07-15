from decimal import Decimal
from typing import Dict, List, Optional

from database import Income, Expense, BudgetGroup
from src.business.core import Business
from src.schemas import (
    DashboardAllocationResponse,
    DashboardAnnualAllocationResponse,
    DashboardBudgetStatusResponse,
    DashboardOverviewResponse,
    DashboardPreviousMonthTransferResponse,
    DashboardResponse,
    DashboardTopExpenseCategoryResponse,
)


class DashboardBusiness(Business):

    @classmethod
    def get_dashboard(
        cls,
        month: int,
        year: int,
        family_id: int,
    ) -> DashboardResponse:
        session = cls.create_session()
        try:
            incomes = cls.db.get_incomes_by_month_and_year(
                session,
                month,
                year,
                family_id,
            )

            expenses = cls.db.get_expenses_by_month_and_year(
                session,
                month,
                year,
                family_id,
            )

            budget_groups = cls.db.get_budget_group(
                session,
                year,
                family_id,
            )

            savings_investment = cls.db.get_savings_investment_by_month_and_year(
                session,
                month,
                year,
                family_id,
            )

            annual_savings_investments = cls.db.get_savings_investments_by_year(
                session,
                year,
                family_id,
            )

            total_income = sum((income.amount for income in incomes), Decimal("0"))
            total_expenses = sum((expense.amount for expense in expenses), Decimal("0"))
            available = total_income - total_expenses
            savings = (
                savings_investment.savings_amount
                if savings_investment is not None
                else Decimal("0")
            )
            investments = (
                savings_investment.investment_amount
                if savings_investment is not None
                else Decimal("0")
            )
            remaining = available - savings - investments

            budget_status = cls.__build_budget_status(
                budget_groups,
                incomes,
                expenses,
                month,
            )

            top_expense_categories = cls.__build_top_expense_categories(expenses)

            annual_savings = sum(
                (item.savings_amount for item in annual_savings_investments),
                Decimal("0"),
            )
            annual_investments = sum(
                (item.investment_amount for item in annual_savings_investments),
                Decimal("0"),
            )

            previous_month_transfer = cls.__get_previous_month_transfer(
                incomes, expenses
            )

            return DashboardResponse(
                month=month,
                year=year,
                overview=DashboardOverviewResponse(
                    income=total_income,
                    expenses=total_expenses,
                    available=available,
                    remaining=remaining,
                ),
                allocation=DashboardAllocationResponse(
                    savings=savings,
                    investments=investments,
                    remaining=remaining,
                    has_allocation=savings_investment is not None,
                ),
                budget_status=budget_status,
                top_expense_categories=top_expense_categories,
                annual_allocation=DashboardAnnualAllocationResponse(
                    savings=annual_savings,
                    investments=annual_investments,
                    total=annual_savings + annual_investments,
                ),
                previous_month_transfer=previous_month_transfer,
            )
        finally:
            session.close()

    @staticmethod
    def __build_budget_status(
        budget_groups: List[BudgetGroup],
        incomes: List[Income],
        expenses: List[Expense],
        month: int,
    ) -> List[DashboardBudgetStatusResponse]:
        expense_totals: Dict[str, Decimal] = {}
        income_totals: Dict[str, Decimal] = {}

        for expense in expenses:
            if expense.items:
                for item in expense.items:
                    if item.category is None:
                        continue

                    normalized_name = item.category.normalized_name
                    expense_totals[normalized_name] = (
                        expense_totals.get(normalized_name, Decimal("0")) + item.amount
                    )

                continue

            if expense.category is None:
                continue

            normalized_name = expense.category.normalized_name
            expense_totals[normalized_name] = (
                expense_totals.get(normalized_name, Decimal("0")) + expense.amount
            )

        for income in incomes:
            if income.category is None:
                continue

            normalized_name = income.category.normalized_name
            income_totals[normalized_name] = (
                income_totals.get(normalized_name, Decimal("0")) + income.amount
            )

        rows: List[DashboardBudgetStatusResponse] = []
        for budget_group in budget_groups:
            normalized_name = budget_group.category.normalized_name

            monthly_budget = next(
                (
                    budget.amount
                    for budget in budget_group.budgets
                    if budget.month == month
                ),
                Decimal("0"),
            )
            expenses_amount = expense_totals.get(normalized_name, Decimal("0"))
            income_amount = income_totals.get(normalized_name, Decimal("0"))

            rows.append(
                DashboardBudgetStatusResponse(
                    category_id=budget_group.category_id,
                    category_name=budget_group.name,
                    budget=monthly_budget,
                    expenses=expenses_amount,
                    income=income_amount,
                    available=monthly_budget - expenses_amount + income_amount,
                )
            )

        return rows

    @staticmethod
    def __build_top_expense_categories(
        expenses: List[Expense],
    ) -> List[DashboardTopExpenseCategoryResponse]:
        categories: Dict[int, Dict[str, object]] = {}
        for expense in expenses:
            if expense.items:
                for item in expense.items:
                    if item.category is None:
                        continue

                    category_id = item.category.id
                    current = categories.get(category_id)

                    categories[category_id] = {
                        "category_name": item.category.name,
                        "amount": (current["amount"] if current else Decimal("0"))
                        + item.amount,
                    }

                continue

            if expense.category is None:
                continue

            category_id = expense.category.id
            current = categories.get(category_id)

            categories[category_id] = {
                "category_name": expense.category.name,
                "amount": (current["amount"] if current else Decimal("0"))
                + expense.amount,
            }

        sorted_categories = sorted(
            categories.items(),
            key=lambda item: item[1]["amount"],
            reverse=True,
        )

        return [
            DashboardTopExpenseCategoryResponse(
                category_id=category_id,
                category_name=str(data["category_name"]),
                amount=data["amount"],
            )
            for category_id, data in sorted_categories[:5]
        ]

    @staticmethod
    def __get_previous_month_transfer(
        incomes: List[Income],
        expenses: List[Expense],
    ) -> Optional[DashboardPreviousMonthTransferResponse]:
        system_income = next(
            (income for income in incomes if income.savings_investment_id is not None),
            None,
        )
        if system_income is not None:
            return DashboardPreviousMonthTransferResponse(
                type="Income",
                amount=system_income.amount,
            )

        system_expense = next(
            (
                expense
                for expense in expenses
                if expense.savings_investment_id is not None
            ),
            None,
        )
        if system_expense is not None:
            return DashboardPreviousMonthTransferResponse(
                type="Expenses",
                amount=system_expense.amount,
            )

        return None
