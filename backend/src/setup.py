from sqlalchemy import create_engine

from database import Database, get_database_uri
from .business import setup_business_layer


def _configure_database() -> Database:
    engine = create_engine(url=get_database_uri())
    return Database(engine)


def setup_layers() -> None:
    db = _configure_database()
    setup_business_layer(db)
