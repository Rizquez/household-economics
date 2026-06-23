from __future__ import annotations

from typing import TYPE_CHECKING

from .categories import router as categories_router

if TYPE_CHECKING:
    from fastapi import FastAPI


map_routers = {"/categories": categories_router}


def setup_routers(app: "FastAPI") -> None:
    for prefix, router in map_routers.items():
        app.include_router(router=router, prefix=prefix)
