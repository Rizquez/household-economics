from datetime import datetime
from typing import Dict, List

from fastapi import HTTPException, status

from database import Budget, BudgetGroup
from src.business.core import Business


class BudgetBusiness(Business):

    @classmethod
    def create_budget_group(
        cls,
        category_id: int,
        family_id: int,
    ) -> BudgetGroup:
        session = cls.create_session()
        try:
            current_year = datetime.now().year

            existing_budget_group = cls.db.get_budget_group_by_category(
                session,
                current_year,
                category_id,
                family_id,
            )

            if existing_budget_group is not None:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="This category has already been exported to annual budget for the current year.",
                )

            budget_group = cls.db.create_budget_group(
                session,
                current_year,
                category_id,
                family_id,
            )

            session.commit()
            session.refresh(budget_group)
            budget_group.budgets
            budget_group.category
            return budget_group
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def get_budget_years(cls, family_id: int) -> List[int]:
        session = cls.create_session()
        try:
            return cls.db.get_budget_years(session, family_id)
        finally:
            session.close()

    @classmethod
    def get_budget_group(
        cls,
        year: int,
        family_id: int,
    ) -> List[BudgetGroup]:
        session = cls.create_session()
        try:
            budget_groups = cls.db.get_budget_group(session, year, family_id)
            for budget_group in budget_groups:
                budget_group.budgets
                budget_group.category
            return budget_groups
        finally:
            session.close()

    @classmethod
    def update_budgets(
        cls,
        budgets: List[Dict],
        family_id: int,
    ) -> List[Budget]:
        session = cls.create_session()
        try:
            updated_budgets = cls.db.update_budgets(
                session,
                budgets,
                family_id,
            )

            if not updated_budgets and budgets:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="One or more budgets were not found.",
                )

            session.commit()
            return updated_budgets
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()
