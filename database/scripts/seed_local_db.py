from __future__ import annotations

from datetime import datetime
from typing import Iterable, Tuple, Dict, Optional, TYPE_CHECKING

from sqlalchemy import create_engine

from .constants import YEAR, APRIL, MAY, MONEY_ZERO
from .helpers import (
    money,
    assert_local_database,
    get_single_developer_context,
    assert_family_is_empty,
    get_required_record_type,
    print_summary,
)

from db import Database, get_database_uri
from models import (
    Category,
    Expense,
    Income,
    RecordType,
    SavingsInvestments,
)

if TYPE_CHECKING:
    from sqlalchemy.orm import scoped_session


def create_categories(
    session: "scoped_session",
    db: Database,
    family_id: int,
    income_record_type: RecordType,
    expense_record_type: RecordType,
) -> Dict[str, Category]:
    definitions = {
        "salary": ("Salary", income_record_type.id),
        "freelance": ("Freelance", income_record_type.id),
        "refunds": ("Refunds", income_record_type.id),
        "housing": ("Housing", expense_record_type.id),
        "groceries": ("Groceries", expense_record_type.id),
        "dining_out": ("Dining Out", expense_record_type.id),
        "transportation": ("Transportation", expense_record_type.id),
        "utilities": ("Utilities", expense_record_type.id),
        "subscriptions": ("Subscriptions", expense_record_type.id),
        "health": ("Health", expense_record_type.id),
        "pet_care": ("Pet Care", expense_record_type.id),
        "home": ("Home", expense_record_type.id),
        "leisure": ("Leisure", expense_record_type.id),
        "clothing": ("Clothing", expense_record_type.id),
        "gifts": ("Gifts", expense_record_type.id),
        "education": ("Education", expense_record_type.id),
    }
    categories: Dict[str, Category] = {}
    for key, (name, record_type_id) in definitions.items():
        categories[key] = db.create_category(
            session,
            {
                "name": name,
                "normalized_name": name.lower(),
                "record_type_id": record_type_id,
                "family_id": family_id,
            },
        )
    session.flush()
    return categories


def create_budgets(
    session: "scoped_session",
    db: Database,
    family_id: int,
    categories: Dict[str, Category],
) -> None:
    monthly_amounts = {
        "housing": ("1050.00", "1050.00"),
        "groceries": ("520.00", "540.00"),
        "dining_out": ("180.00", "200.00"),
        "transportation": ("240.00", "240.00"),
        "utilities": ("260.00", "260.00"),
        "subscriptions": ("85.00", "85.00"),
        "health": ("150.00", "150.00"),
        "pet_care": ("110.00", "110.00"),
        "home": ("180.00", "160.00"),
        "leisure": ("180.00", "200.00"),
        "clothing": ("120.00", "140.00"),
        "gifts": ("90.00", "100.00"),
        "education": ("100.00", "100.00"),
    }
    for key, (april_amount, may_amount) in monthly_amounts.items():
        group = db.create_budget_group(session, YEAR, categories[key].id, family_id)
        session.flush()
        budgets_by_month = {budget.month: budget for budget in group.budgets}
        db.update_budgets(
            session,
            [
                {"id": budgets_by_month[APRIL].id, "amount": money(april_amount)},
                {"id": budgets_by_month[MAY].id, "amount": money(may_amount)},
            ],
            family_id,
        )


def create_income(
    session: "scoped_session",
    db: Database,
    *,
    family_id: int,
    category: Category,
    name: str,
    date: datetime,
    amount: str,
    notes: Optional[str] = None,
) -> Income:
    return db.create_income(
        session,
        {
            "name": name,
            "created_at": date,
            "amount": money(amount),
            "notes": notes,
            "category_id": category.id,
            "family_id": family_id,
            "savings_investment_id": None,
        },
    )


def create_expense(
    session: "scoped_session",
    db: Database,
    *,
    family_id: int,
    category: Category,
    name: str,
    date: datetime,
    amount: str,
    notes: Optional[str] = None,
) -> Expense:
    return db.create_expense(
        session,
        {
            "name": name,
            "created_at": date,
            "amount": money(amount),
            "notes": notes,
            "category_id": category.id,
            "family_id": family_id,
            "savings_investment_id": None,
        },
        items=None,
    )


def create_itemized_expense(
    session: "scoped_session",
    db: Database,
    *,
    family_id: int,
    name: str,
    date: datetime,
    items: Iterable[Tuple[str, str, Category]],
    notes: Optional[str] = None,
) -> Expense:
    item_rows = [
        {"product": product, "amount": money(amount), "category_id": category.id}
        for product, amount, category in items
    ]
    total = sum((item["amount"] for item in item_rows), MONEY_ZERO)
    return db.create_expense(
        session,
        {
            "name": name,
            "created_at": date,
            "amount": total,
            "notes": notes,
            "category_id": None,
            "family_id": family_id,
            "savings_investment_id": None,
        },
        items=item_rows,
    )


def seed_april(
    session: "scoped_session",
    db: Database,
    family_id: int,
    categories: Dict[str, Category],
) -> None:
    create_income(
        session,
        db,
        family_id=family_id,
        category=categories["salary"],
        name="Primary salary",
        date=datetime(2025, 4, 1, 9, 0),
        amount="3200.00",
        notes="Monthly salary payment.",
    )
    create_income(
        session,
        db,
        family_id=family_id,
        category=categories["freelance"],
        name="Landing page project",
        date=datetime(2025, 4, 12, 18, 30),
        amount="450.00",
        notes="Freelance design and implementation work.",
    )
    create_income(
        session,
        db,
        family_id=family_id,
        category=categories["refunds"],
        name="Utility overpayment refund",
        date=datetime(2025, 4, 22, 10, 15),
        amount="180.00",
    )

    simple_expenses = [
        ("Monthly rent", 2, "housing", "950.00", "April rent payment."),
        ("Parking space", 2, "housing", "80.00", None),
        ("Electricity bill", 4, "utilities", "72.40", None),
        ("Water bill", 5, "utilities", "41.30", None),
        ("Home internet", 6, "utilities", "42.99", None),
        ("Mobile phone plan", 6, "utilities", "29.90", None),
        ("Streaming services", 7, "subscriptions", "25.97", None),
        ("Cloud storage", 7, "subscriptions", "9.99", None),
        ("Public transport pass", 8, "transportation", "45.00", None),
        ("Fuel refill", 11, "transportation", "58.20", None),
        ("Coffee with friends", 13, "dining_out", "18.60", None),
        ("Family lunch", 14, "dining_out", "63.40", None),
        ("Pharmacy purchase", 15, "health", "24.80", None),
        ("Dog food", 16, "pet_care", "38.90", None),
        ("Veterinary check-up", 18, "pet_care", "54.00", None),
        ("Cinema tickets", 19, "leisure", "23.00", None),
        ("Book purchase", 20, "education", "21.50", None),
        ("Kitchen containers", 21, "home", "27.80", None),
        ("Spring jacket", 23, "clothing", "59.90", None),
        ("Birthday gift", 24, "gifts", "45.00", None),
        ("Takeaway dinner", 25, "dining_out", "31.70", None),
        ("Fuel refill", 27, "transportation", "52.10", None),
        ("Museum visit", 28, "leisure", "28.00", None),
        ("Household cleaning supplies", 29, "home", "34.60", None),
    ]
    for name, day, category_key, amount, notes in simple_expenses:
        create_expense(
            session,
            db,
            family_id=family_id,
            category=categories[category_key],
            name=name,
            date=datetime(2025, 4, day, 12, 0),
            amount=amount,
            notes=notes,
        )

    create_itemized_expense(
        session,
        db,
        family_id=family_id,
        name="Weekly supermarket shopping",
        date=datetime(2025, 4, 5, 11, 30),
        items=[
            ("Fresh vegetables", "31.45", categories["groceries"]),
            ("Fruit", "22.80", categories["groceries"]),
            ("Dairy products", "18.30", categories["groceries"]),
            ("Meat and fish", "42.60", categories["groceries"]),
            ("Pantry staples", "25.40", categories["groceries"]),
            ("Laundry detergent", "12.90", categories["home"]),
        ],
    )
    create_itemized_expense(
        session,
        db,
        family_id=family_id,
        name="Weekly supermarket shopping",
        date=datetime(2025, 4, 12, 10, 45),
        items=[
            ("Fresh vegetables", "28.10", categories["groceries"]),
            ("Fruit", "19.70", categories["groceries"]),
            ("Dairy products", "21.25", categories["groceries"]),
            ("Breakfast products", "17.80", categories["groceries"]),
            ("Frozen food", "24.60", categories["groceries"]),
            ("Dog treats", "8.50", categories["pet_care"]),
        ],
    )
    create_itemized_expense(
        session,
        db,
        family_id=family_id,
        name="Weekly supermarket shopping",
        date=datetime(2025, 4, 19, 11, 10),
        items=[
            ("Fresh vegetables", "26.90", categories["groceries"]),
            ("Fruit", "18.40", categories["groceries"]),
            ("Meat and fish", "39.80", categories["groceries"]),
            ("Dairy products", "16.75", categories["groceries"]),
            ("Snacks", "14.30", categories["groceries"]),
            ("Bathroom supplies", "11.20", categories["home"]),
        ],
    )
    create_itemized_expense(
        session,
        db,
        family_id=family_id,
        name="Weekly supermarket shopping",
        date=datetime(2025, 4, 26, 12, 15),
        items=[
            ("Fresh vegetables", "29.60", categories["groceries"]),
            ("Fruit", "21.35", categories["groceries"]),
            ("Pantry staples", "27.90", categories["groceries"]),
            ("Meat and fish", "44.20", categories["groceries"]),
            ("Dairy products", "20.10", categories["groceries"]),
        ],
    )


def seed_may(
    session: "scoped_session",
    db: Database,
    family_id: int,
    categories: Dict[str, Category],
) -> None:
    create_income(
        session,
        db,
        family_id=family_id,
        category=categories["salary"],
        name="Primary salary",
        date=datetime(2025, 5, 1, 9, 0),
        amount="3200.00",
        notes="Monthly salary payment.",
    )
    create_income(
        session,
        db,
        family_id=family_id,
        category=categories["freelance"],
        name="Application maintenance",
        date=datetime(2025, 5, 16, 17, 45),
        amount="300.00",
    )
    create_income(
        session,
        db,
        family_id=family_id,
        category=categories["refunds"],
        name="Returned purchase refund",
        date=datetime(2025, 5, 20, 11, 20),
        amount="95.00",
    )

    simple_expenses = [
        ("Monthly rent", 2, "housing", "950.00", "May rent payment."),
        ("Parking space", 2, "housing", "80.00", None),
        ("Electricity bill", 4, "utilities", "68.70", None),
        ("Water bill", 5, "utilities", "39.80", None),
        ("Home internet", 6, "utilities", "42.99", None),
        ("Mobile phone plan", 6, "utilities", "29.90", None),
        ("Streaming services", 7, "subscriptions", "25.97", None),
        ("Cloud storage", 7, "subscriptions", "9.99", None),
        ("Public transport pass", 8, "transportation", "45.00", None),
        ("Fuel refill", 9, "transportation", "61.40", None),
        ("Breakfast outside", 10, "dining_out", "16.80", None),
        ("Mother's Day lunch", 11, "dining_out", "78.50", None),
        ("Dental cleaning", 13, "health", "65.00", None),
        ("Prescription medicine", 14, "health", "18.70", None),
        ("Dog food", 15, "pet_care", "41.20", None),
        ("Dog grooming", 17, "pet_care", "36.00", None),
        ("Concert tickets", 18, "leisure", "54.00", None),
        ("Online course", 19, "education", "49.00", None),
        ("Bedroom lamp", 20, "home", "39.90", None),
        ("Summer shoes", 21, "clothing", "47.50", None),
        ("Wedding gift", 22, "gifts", "70.00", None),
        ("Dinner with friends", 23, "dining_out", "52.30", None),
        ("Fuel refill", 25, "transportation", "55.80", None),
        ("Board game", 27, "leisure", "32.90", None),
        ("Home organization supplies", 28, "home", "28.40", None),
        ("T-shirt", 29, "clothing", "24.90", None),
        ("Coffee and pastry", 30, "dining_out", "11.60", None),
    ]
    for name, day, category_key, amount, notes in simple_expenses:
        create_expense(
            session,
            db,
            family_id=family_id,
            category=categories[category_key],
            name=name,
            date=datetime(2025, 5, day, 12, 0),
            amount=amount,
            notes=notes,
        )

    create_itemized_expense(
        session,
        db,
        family_id=family_id,
        name="Weekly supermarket shopping",
        date=datetime(2025, 5, 3, 11, 20),
        items=[
            ("Fresh vegetables", "30.80", categories["groceries"]),
            ("Fruit", "24.10", categories["groceries"]),
            ("Dairy products", "19.95", categories["groceries"]),
            ("Meat and fish", "46.30", categories["groceries"]),
            ("Pantry staples", "23.80", categories["groceries"]),
            ("Kitchen paper", "7.90", categories["home"]),
        ],
    )
    create_itemized_expense(
        session,
        db,
        family_id=family_id,
        name="Weekly supermarket shopping",
        date=datetime(2025, 5, 10, 10, 50),
        items=[
            ("Fresh vegetables", "27.60", categories["groceries"]),
            ("Fruit", "20.40", categories["groceries"]),
            ("Breakfast products", "18.90", categories["groceries"]),
            ("Frozen food", "26.80", categories["groceries"]),
            ("Dairy products", "17.60", categories["groceries"]),
            ("Dog treats", "9.20", categories["pet_care"]),
        ],
    )
    create_itemized_expense(
        session,
        db,
        family_id=family_id,
        name="Weekly supermarket shopping",
        date=datetime(2025, 5, 17, 11, 40),
        items=[
            ("Fresh vegetables", "29.40", categories["groceries"]),
            ("Fruit", "21.90", categories["groceries"]),
            ("Meat and fish", "43.50", categories["groceries"]),
            ("Dairy products", "18.25", categories["groceries"]),
            ("Snacks", "15.70", categories["groceries"]),
            ("Bathroom supplies", "13.40", categories["home"]),
        ],
    )
    create_itemized_expense(
        session,
        db,
        family_id=family_id,
        name="Weekly supermarket shopping",
        date=datetime(2025, 5, 24, 12, 5),
        items=[
            ("Fresh vegetables", "31.20", categories["groceries"]),
            ("Fruit", "23.60", categories["groceries"]),
            ("Pantry staples", "30.10", categories["groceries"]),
            ("Meat and fish", "48.60", categories["groceries"]),
            ("Dairy products", "21.30", categories["groceries"]),
        ],
    )
    create_itemized_expense(
        session,
        db,
        family_id=family_id,
        name="Monthly household restock",
        date=datetime(2025, 5, 31, 10, 30),
        items=[
            ("Laundry detergent", "13.80", categories["home"]),
            ("Dishwasher tablets", "11.50", categories["home"]),
            ("Cleaning products", "16.40", categories["home"]),
            ("Toiletries", "19.90", categories["home"]),
            ("Pantry staples", "32.70", categories["groceries"]),
        ],
    )


def create_monthly_allocation(
    session: "scoped_session",
    db: Database,
    *,
    family_id: int,
    month: int,
    savings_amount: str,
    investment_amount: str,
) -> SavingsInvestments:
    available_amount = db.get_available_amount_by_month_and_year(
        session, month, YEAR, family_id
    )
    savings = money(savings_amount)
    investments = money(investment_amount)
    if savings + investments > available_amount:
        raise RuntimeError(
            f"Invalid allocation for {YEAR}-{month:02d}: available={available_amount}, assigned={savings + investments}."
        )
    allocation = db.create_savings_investment(
        session,
        {
            "year": YEAR,
            "month": month,
            "available_amount": available_amount,
            "savings_amount": savings,
            "investment_amount": investments,
            "family_id": family_id,
        },
    )
    session.flush()
    db.synchronize_remaining_record(session, allocation)
    return allocation


def main() -> None:
    database_uri = get_database_uri()
    assert_local_database(database_uri)

    engine = create_engine(database_uri)
    db = Database(engine)
    session = db.create_session()

    try:
        user, family = get_single_developer_context(session)
        assert_family_is_empty(session, family.id)

        income_record_type = get_required_record_type(session, "Income")
        expense_record_type = get_required_record_type(session, "Expenses")

        categories = create_categories(
            session, db, family.id, income_record_type, expense_record_type
        )
        create_budgets(session, db, family.id, categories)

        seed_april(session, db, family.id, categories)
        session.flush()
        create_monthly_allocation(
            session,
            db,
            family_id=family.id,
            month=APRIL,
            savings_amount="700.00",
            investment_amount="400.00",
        )
        session.flush()

        seed_may(session, db, family.id, categories)
        session.flush()
        create_monthly_allocation(
            session,
            db,
            family_id=family.id,
            month=MAY,
            savings_amount="700.00",
            investment_amount="461.20",
        )

        session.commit()

        print(f"Developer user: {user.email} (ID {user.id})")
        print_summary(session, db, family.id)

    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


if __name__ == "__main__":
    main()
