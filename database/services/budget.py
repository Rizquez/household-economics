from __future__ import annotations

from typing import Dict, List, Optional, TYPE_CHECKING
from sqlalchemy import and_, distinct

from services.core import ServiceBase
from models import Budget, BudgetGroup
from services.category import CategoryService

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


DEFAULT_AMOUNT = 0


class BudgetService(ServiceBase):

    @classmethod
    def create_budget_group(
        cls,
        session: "scoped_session",
        year: int,
        category_id: int,
        family_id: int,
    ) -> BudgetGroup:
        category = CategoryService.get_category_by_id_and_family(
            session, category_id, family_id
        )
        budget_group = cls.create(
            session,
            {
                "name": category.name,
                "family_id": family_id,
                "category_id": category.id,
                "year": year,
            },
            BudgetGroup,
        )

        session.flush()

        for month in range(1, 13):
            cls.create(
                session,
                {
                    "month": month,
                    "amount": DEFAULT_AMOUNT,
                    "budget_group_id": budget_group.id,
                },
                Budget,
            )

        return budget_group

    @classmethod
    def get_budget_group_by_category(
        cls,
        session: "scoped_session",
        year: int,
        category_id: int,
        family_id: int,
    ) -> Optional[BudgetGroup]:
        return cls.find(
            session,
            and_(
                BudgetGroup.category_id == category_id,
                BudgetGroup.family_id == family_id,
                BudgetGroup.year == year,
            ),
            model=BudgetGroup,
        )

    @classmethod
    def delete_budget_group(
        cls,
        session: "scoped_session",
        budget_group_id: int,
        family_id: int,
    ) -> bool:
        budget_group = cls.find(
            session,
            and_(
                BudgetGroup.id == budget_group_id,
                BudgetGroup.family_id == family_id,
            ),
            model=BudgetGroup,
        )

        if budget_group is None:
            return False

        session.delete(budget_group)
        return True

    @classmethod
    def get_budget_years(
        cls,
        session: "scoped_session",
        family_id: int,
    ) -> List[int]:
        return [
            year
            for (year,) in (
                session.query(BudgetGroup.year)
                .filter(BudgetGroup.family_id == family_id)
                .distinct()
                .order_by(BudgetGroup.year)
                .all()
            )
        ]

    @staticmethod
    def get_budget_group(
        session: "scoped_session",
        year: int,
        family_id: int,
    ) -> List[BudgetGroup]:
        return (
            session.query(BudgetGroup)
            .filter(
                and_(
                    BudgetGroup.family_id == family_id,
                    BudgetGroup.year == year,
                )
            )
            .order_by(BudgetGroup.name)
            .all()
        )

    @classmethod
    def update_budgets(
        cls,
        session: "scoped_session",
        budgets: List[Dict],
        family_id: int,
    ) -> List[Budget]:
        budget_ids = [budget["id"] for budget in budgets]

        existing_budgets = (
            session.query(Budget)
            .join(BudgetGroup)
            .filter(
                and_(
                    Budget.id.in_(budget_ids),
                    BudgetGroup.family_id == family_id,
                )
            )
            .all()
        )

        if len(existing_budgets) != len(set(budget_ids)):
            return []

        budgets_by_id = {budget.id: budget for budget in existing_budgets}

        updated_budgets = []

        for budget_data in budgets:
            budget = budgets_by_id[budget_data["id"]]

            updated_budgets.append(
                cls.update(
                    budget,
                    {
                        "amount": budget_data["amount"],
                    },
                )
            )

        return updated_budgets
