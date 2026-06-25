from __future__ import annotations

from fastapi import FastAPI
from typing import Union, TYPE_CHECKING
from fastapi.middleware.cors import CORSMiddleware

if TYPE_CHECKING:
    from .settings import Local, Render


def builder_app(settings: Union["Local", "Render"]) -> FastAPI:
    app = FastAPI(
        title="Household-Economics-Backend",
        description="xxx",  # TODO: add description
        version=settings.VERSION,
        debug=settings.DEBUG,
        root_path=settings.ROOT,
        docs_url="/docs" if settings.ENABLE_DOCS else None,
        redoc_url="/redoc" if settings.ENABLE_DOCS else None,
        openapi_url="/openapi.json" if settings.ENABLE_DOCS else None
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
