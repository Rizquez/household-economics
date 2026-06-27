from __future__ import annotations

from typing import TYPE_CHECKING

from .categories import router as categories_router
from .record_types import router as record_types_router

if TYPE_CHECKING:
    from fastapi import FastAPI


map_routers = {
    "/categories": (categories_router, "Categories"),
    "/record-types": (record_types_router, "Record Types"),
}


def setup_routers(app: "FastAPI") -> None:
    for prefix, (router, tag) in map_routers.items():
        app.include_router(
            router=router,
            prefix=prefix,
            tags=[tag],
        )
