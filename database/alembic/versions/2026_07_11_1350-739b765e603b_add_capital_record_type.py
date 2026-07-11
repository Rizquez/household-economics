"""add capital record type

Revision ID: 739b765e603b
Revises: cc8155c55dbd
Create Date: 2026-07-11 13:50:56.651080

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "739b765e603b"
down_revision: Union[str, None] = "cc8155c55dbd"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.bulk_insert(
        sa.table(
            "record_type",
            sa.column("id", sa.BigInteger()),
            sa.column("name", sa.String()),
        ),
        [
            {"id": 3, "name": "Capital"},
        ],
    )


def downgrade() -> None:
    op.execute(sa.text("DELETE FROM record_type WHERE name = 'Capital'"))
