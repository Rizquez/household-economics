from __future__ import annotations

from typing import TYPE_CHECKING

from .category import router as category_router
from .record_type import router as record_type_router

if TYPE_CHECKING:
    from fastapi import FastAPI


map_routers = {
    "/category": (category_router, "Category"),
    "/record-type": (record_type_router, "Record Type"),
}


def setup_routers(app: "FastAPI") -> None:
    for prefix, (router, tag) in map_routers.items():
        app.include_router(
            router=router,
            prefix=prefix,
            tags=[tag],
        )
