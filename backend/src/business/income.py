from typing import Dict, List
from fastapi import HTTPException, status

from database import Income
from src.business.core import Business


class IncomeBusiness(Business):

    @classmethod
    def get_incomes_by_month_and_year(
        cls,
        month: int,
        year: int,
        family_id: int,
    ) -> List[Income]:
        session = cls.create_session()
        try:
            return cls.db.get_incomes_by_month_and_year(
                session,
                month,
                year,
                family_id,
            )
        finally:
            session.close()

    @classmethod
    def create_income(cls, a_dict: Dict, family_id: int) -> Income:
        session = cls.create_session()
        try:
            category_id = a_dict.get("category_id")
            if category_id is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Income category is required.",
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

            a_dict["family_id"] = family_id
            income = cls.db.create_income(session, a_dict)
            session.flush()

            cls.db.synchronize_savings_investment(
                session,
                income.created_at.month,
                income.created_at.year,
                family_id,
            )
            
            session.commit()
            session.refresh(income)
            income.category
            return income
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def update_income(
        cls,
        a_dict: Dict,
        income_id: int,
        family_id: int,
    ) -> Income:
        session = cls.create_session()
        try:
            category_id = a_dict.get("category_id")
            if category_id is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Income category is required.",
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
            
            existing = cls.db.get_income_by_id_and_family(
                session,
                income_id,
                family_id,
            )

            if existing is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No income were found associated with ID: {income_id}."
                )
            
            if existing.savings_investment_id is not None:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="System-generated income records cannot be updated."
                )
            
            previous_month = existing.created_at.month
            previous_year = existing.created_at.year

            updated = cls.db.update_income(
                session,
                a_dict,
                income_id,
                family_id,
            )

            if updated is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"The income associated with ID: {income_id} could not be updated.",
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
            return updated
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def delete_income(cls, income_id: int, family_id: int) -> None:
        session = cls.create_session()
        try:
            existing = cls.db.get_income_by_id_and_family(
                session,
                income_id,
                family_id,
            )

            if not existing:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No income were found associated with ID: {income_id}.",
                )
            
            if existing.savings_investment_id is not None:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="System-generated income records cannot be deleted."
                )

            
            month = existing.created_at.month
            year = existing.created_at.year

            deleted = cls.db.delete_income(
                session,
                income_id,
                family_id,
            )

            if not deleted:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"The income associated with ID: {income_id} could not be deleted.",
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
