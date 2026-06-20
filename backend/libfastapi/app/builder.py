from __future__ import annotations

from fastapi import FastAPI
from typing import Union, TYPE_CHECKING
from fastapi.middleware.cors import CORSMiddleware

from .settings import get_settings

if TYPE_CHECKING:
    from .settings import Local, Render


def builder_app(settings: Union["Local", "Render"] = get_settings()) -> FastAPI:
    app = FastAPI(
        title="Household-Economics-Backend",
        description="xxx",
        version=settings.VERSION,
        debug=settings.DEBUG,
        root_path=settings.ROOT,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
