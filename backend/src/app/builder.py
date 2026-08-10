from __future__ import annotations

from collections.abc import Awaitable, Callable
from typing import TYPE_CHECKING, Union
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware

if TYPE_CHECKING:
    from src.app.settings import Local, Render


CallNext = Callable[[Request], Awaitable[Response]]


def builder_app(settings: Union["Local", "Render"]) -> FastAPI:
    app = FastAPI(
        title="Household-Economics-Backend",
        description="An API responsible for business logic and communication with the database",
        version=settings.VERSION,
        debug=settings.DEBUG,
        root_path=settings.ROOT,
        docs_url="/docs" if settings.ENABLE_DOCS else None,
        redoc_url="/redoc" if settings.ENABLE_DOCS else None,
        openapi_url="/openapi.json" if settings.ENABLE_DOCS else None,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ALLOWED_ORIGINS,
        allow_credentials=False,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type"]
    )

    @app.middleware("http")
    async def add_security_headers(
        request: Request,
        call_next: CallNext,
    ) -> Response:
        response = await call_next(request)

        response.headers["Content-Security-Policy"] = "default-src 'none'; frame-ancestors 'none'"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "no-referrer"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"

        if settings.ENABLE_HSTS:
            response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"

        return response

    return app
