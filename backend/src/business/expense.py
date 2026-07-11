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
    ) -> Optional[Expense]:
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

            expense = cls.db.update_expense(
                session,
                a_dict,
                items,
                expense_id,
                family_id,
            )

            if expense is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No expense were found associated with ID: {expense_id}",
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
    def delete_expense(cls, expense_id: int, family_id: int) -> None:
        session = cls.create_session()
        try:
            deleted = cls.db.delete_expense(
                session,
                expense_id,
                family_id,
            )

            if not deleted:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No expense were found associated with ID: {expense_id}",
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
                detail=f"No category were found associated with ID: {category_id}",
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
                    detail=f"No category were found associated with ID: {category_id}",
                )
