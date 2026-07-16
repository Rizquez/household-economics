from __future__ import annotations

from decimal import Decimal
from typing import Tuple, Union, TYPE_CHECKING
from sqlalchemy.engine import make_url

from db import Database
from models import (
    Budget,
    BudgetGroup,
    Category,
    Expense,
    Family,
    FamilyMembers,
    Income,
    RecordType,
    SavingsInvestments,
    User,
)
from .constants import YEAR, APRIL, MAY, MONEY_ZERO, LOCAL_HOSTS, EXPECTED_DATABASE_NAME

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


def money(value: Union[str, int, float, Decimal]) -> Decimal:
    return Decimal(str(value)).quantize(Decimal("0.01"))


def assert_local_database(database_uri: str) -> None:
    url = make_url(database_uri)
    if url.host not in LOCAL_HOSTS:
        raise RuntimeError(
            "Seed aborted: POSTGRES_URI does not point to localhost. "
            f"Received host: {url.host!r}"
        )
    if url.database != EXPECTED_DATABASE_NAME:
        raise RuntimeError(
            "Seed aborted: unexpected local database name. "
            f"Expected {EXPECTED_DATABASE_NAME!r}, received {url.database!r}."
        )


def get_single_developer_context(session: "scoped_session") -> Tuple[User, Family]:
    users = session.query(User).all()
    if len(users) != 1:
        raise RuntimeError(
            "Seed aborted: exactly one registered local user is required. "
            f"Found {len(users)} users. Register through the application first."
        )

    user = users[0]
    memberships = (
        session.query(FamilyMembers).filter(FamilyMembers.user_id == user.id).all()
    )
    if len(memberships) != 1:
        raise RuntimeError(
            "Seed aborted: the local user must have exactly one family membership. "
            f"Found {len(memberships)} memberships for user ID {user.id}."
        )

    family = session.get(Family, memberships[0].family_id)
    if family is None:
        raise RuntimeError(
            "Seed aborted: the family associated with the local user does not exist."
        )
    return user, family


def assert_family_is_empty(session: "scoped_session", family_id: int) -> None:
    checks = {
        "categories": session.query(Category)
        .filter(Category.family_id == family_id)
        .count(),
        "budget groups": session.query(BudgetGroup)
        .filter(BudgetGroup.family_id == family_id)
        .count(),
        "incomes": session.query(Income).filter(Income.family_id == family_id).count(),
        "expenses": session.query(Expense)
        .filter(Expense.family_id == family_id)
        .count(),
        "savings and investments": session.query(SavingsInvestments)
        .filter(SavingsInvestments.family_id == family_id)
        .count(),
    }

    populated = {name: count for name, count in checks.items() if count > 0}
    if populated:
        details = ", ".join(f"{name}: {count}" for name, count in populated.items())
        raise RuntimeError(
            "Seed aborted: the developer family already contains application data "
            f"({details}). Recreate the Docker database before running the seed again."
        )


def get_required_record_type(
    session: "scoped_session",
    name: str,
) -> RecordType:
    record_type = (
        session.query(RecordType).filter(RecordType.name == name).one_or_none()
    )
    if record_type is None:
        raise RuntimeError(
            f"Seed aborted: required record type {name!r} was not found. "
            "Apply all Alembic migrations before running the seed."
        )
    return record_type


def print_summary(session: "scoped_session", db: Database, family_id: int) -> None:
    print("\nLocal seed completed successfully.")
    print(f"Family ID: {family_id}")
    print(
        f"Categories: {session.query(Category).filter(Category.family_id == family_id).count()}"
    )
    print(
        f"Budget groups: {session.query(BudgetGroup).filter(BudgetGroup.family_id == family_id).count()}"
    )
    print(
        f"Budgets: {session.query(Budget).join(BudgetGroup).filter(BudgetGroup.family_id == family_id).count()}"
    )
    print(
        f"Incomes: {session.query(Income).filter(Income.family_id == family_id).count()}"
    )
    print(
        f"Expenses: {session.query(Expense).filter(Expense.family_id == family_id).count()}"
    )
    print(
        f"Savings and investments: {session.query(SavingsInvestments).filter(SavingsInvestments.family_id == family_id).count()}"
    )
    for month in (APRIL, MAY):
        available = db.get_available_amount_by_month_and_year(
            session, month, YEAR, family_id
        )
        allocation = db.get_savings_investment_by_month_and_year(
            session, month, YEAR, family_id
        )
        print(
            f"{YEAR}-{month:02d}: available={available}, savings={allocation.savings_amount if allocation else MONEY_ZERO}, "
            f"investments={allocation.investment_amount if allocation else MONEY_ZERO}"
        )
