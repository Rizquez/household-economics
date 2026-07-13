from decimal import Decimal
from typing import Dict, List, Optional
from fastapi import HTTPException, status

from database import SavingsInvestments
from src.business.core import Business


class SavingsInvestmentsBusiness(Business):

    @classmethod
    def create_savings_investment(
        cls,
        a_dict: Dict,
        family_id: int,
    ) -> SavingsInvestments:
        session = cls.create_session()
        try:
            month = a_dict["month"]
            year = a_dict["year"]

            existing = cls.db.get_savings_investment_by_month_and_year(
                session, month, year, family_id
            )
            if existing is not None:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Savings and investments have already been assigned for the current month and year.",
                )

            cls.__validate_assigned_amount(
                a_dict["available_amount"],
                a_dict["savings_amount"],
                a_dict["investment_amount"],
            )

            a_dict["family_id"] = family_id
            savings_investment = cls.db.create_savings_investment(session, a_dict)

            session.flush()

            cls.db.synchronize_remaining_record(session, savings_investment)

            session.commit()
            session.refresh(savings_investment)
            return savings_investment
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def update_savings_investment(
        cls,
        a_dict: Dict,
        savings_investment_id: int,
        family_id: int,
    ) -> SavingsInvestments:
        session = cls.create_session()
        try:
            month = a_dict["month"]
            year = a_dict["year"]

            existing = cls.db.get_savings_investment_by_month_and_year(
                session, month, year, family_id
            )
            if existing is not None and existing.id != savings_investment_id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Savings and investments have already been assigned for the current month and year.",
                )

            cls.__validate_assigned_amount(
                a_dict["available_amount"],
                a_dict["savings_amount"],
                a_dict["investment_amount"],
            )

            savings_investment = cls.db.update_savings_investment(
                session,
                a_dict,
                savings_investment_id,
                family_id,
            )

            if savings_investment is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No savings and investments were found associated with ID: {savings_investment_id}.",
                )

            session.flush()

            cls.db.synchronize_remaining_record(session, savings_investment)

            session.commit()
            session.refresh(savings_investment)
            return savings_investment
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    @classmethod
    def get_savings_investment_by_month_and_year(
        cls,
        month: int,
        year: int,
        family_id: int,
    ) -> Optional[SavingsInvestments]:
        session = cls.create_session()
        try:
            return cls.db.get_savings_investment_by_month_and_year(
                session, month, year, family_id
            )
        finally:
            session.close()

    @classmethod
    def get_savings_investments_by_year(
        cls,
        year: int,
        family_id: int,
    ) -> List[SavingsInvestments]:
        session = cls.create_session()
        try:
            return cls.db.get_savings_investments_by_year(
                session,
                year,
                family_id,
            )
        finally:
            session.close()

    @classmethod
    def get_available_amount_by_month_and_year(
        cls,
        month: int,
        year: int,
        family_id: int,
    ) -> Decimal:
        session = cls.create_session()
        try:
            return cls.db.get_available_amount_by_month_and_year(
                session,
                month,
                year,
                family_id,
            )
        finally:
            session.close()

    @staticmethod
    def __validate_assigned_amount(
        available_amount: Decimal,
        savings_amount: Decimal,
        investment_amount: Decimal,
    ) -> None:
        assigned_amount = savings_amount + investment_amount

        if available_amount < Decimal("0") and assigned_amount != Decimal("0"):
            raise HTTPException(
                status_code=status.HTTP_406_NOT_ACCEPTABLE,
                detail="Savings and investments must be zero when the available amount is negative.",
            )

        if available_amount >= Decimal("0") and assigned_amount > available_amount:
            raise HTTPException(
                status_code=status.HTTP_406_NOT_ACCEPTABLE,
                detail="The assigned amount cannot exceed the available amount.",
            )
