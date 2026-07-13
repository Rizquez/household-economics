from typing import Dict, List, Optional
from fastapi import HTTPException, status

from database import Expense
from src.business.core import Business


class ExpenseBusiness(Business):

    @classmethod
    def get_expenses_by_month_and_year(
        cls,
        month: int,
        year: int,
        family_id: int,
    ) -> List[Expense]:
        session = cls.create_session()
        try:
            return cls.db.get_expenses_by_month_and_year(
                session,
                month,
                year,
                family_id,
            )
        finally:
            session.close()

    @classmethod
    def create_expense(
        cls,
        a_dict: Dict,
        items: Optional[List[Dict]],
        family_id: int,
    ) -> Expense:
        session = cls.create_session()
        try:
            cls.__validate_expense_category(
                session,
                a_dict,
                items,
                family_id,
            )

            cls.__validate_items_categories(
                session,
                items,
                family_id,
            )

            a_dict["family_id"] = family_id

            expense = cls.db.create_expense(
                session,
                a_dict,
                items,
            )
            session.flush()

            cls.db.synchronize_savings_investment(
                session,
                expense.created_at.month,
                expense.created_at.year,
                family_id,
            )

            session.commit()
            session.refresh(expense)
            expense.category
            for item in expense.items:
                item.category
            return expense
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def update_expense(
        cls,
        a_dict: Dict,
        items: Optional[List[Dict]],
        expense_id: int,
        family_id: int,
    ) -> Expense:
        session = cls.create_session()
        try:
            cls.__validate_expense_category(
                session,
                a_dict,
                items,
                family_id,
            )

            cls.__validate_items_categories(
                session,
                items,
                family_id,
            )

            existing = cls.db.get_expense_by_id_and_family(
                session,
                expense_id,
                family_id,
            )

            if existing is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No expense were found associated with ID: {expense_id}.",
                )

            if existing.savings_investment_id is not None:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="System-generated expense records cannot be updated.",
                )

            previous_month = existing.created_at.month
            previous_year = existing.created_at.year

            updated = cls.db.update_expense(
                session,
                a_dict,
                items,
                expense_id,
                family_id,
            )

            if updated is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"The expense associated with ID: {expense_id} could not be updated.",
                )

            session.flush()

            current_month = updated.created_at.month
            current_year = updated.created_at.year

            cls.db.synchronize_savings_investment(
                session,
                previous_month,
                previous_year,
                family_id,
            )

            if previous_month != current_month or previous_year != current_year:
                cls.db.synchronize_savings_investment(
                    session,
                    current_month,
                    current_year,
                    family_id,
                )

            session.commit()
            session.refresh(updated)
            updated.category
            for item in updated.items:
                item.category
            return updated
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def delete_expense(cls, expense_id: int, family_id: int) -> None:
        session = cls.create_session()
        try:
            existing = cls.db.get_expense_by_id_and_family(
                session,
                expense_id,
                family_id,
            )

            if not existing:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No expense were found associated with ID: {expense_id}.",
                )

            if existing.savings_investment_id is not None:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="System-generated expense records cannot be deleted.",
                )

            month = existing.created_at.month
            year = existing.created_at.year

            deleted = cls.db.delete_expense(
                session,
                expense_id,
                family_id,
            )

            if not deleted:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"The expense associated with ID: {expense_id} could not be deleted.",
                )

            session.flush()

            cls.db.synchronize_savings_investment(
                session,
                month,
                year,
                family_id,
            )

            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def __validate_expense_category(
        cls,
        session,
        a_dict: Dict,
        items: Optional[List[Dict]],
        family_id: int,
    ) -> None:
        category_id = a_dict.get("category_id")

        if items:
            if category_id is not None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Expense category must not be defined when expense has items.",
                )
            return

        if category_id is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Expense category is required when expense does not have items.",
            )

        category = cls.db.get_category_by_id_and_family(
            session,
            category_id,
            family_id,
        )

        if category is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No category were found associated with ID: {category_id}.",
            )

    @classmethod
    def __validate_items_categories(
        cls,
        session,
        items: Optional[List[Dict]],
        family_id: int,
    ) -> None:
        if not items:
            return

        for item in items:
            category_id = item.get("category_id")

            if category_id is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Expense item category is required.",
                )

            category = cls.db.get_category_by_id_and_family(
                session,
                category_id,
                family_id,
            )

            if category is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No category were found associated with ID: {category_id}.",
                )
