from __future__ import annotations

from typing import TYPE_CHECKING, Dict
from fastapi import status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

if TYPE_CHECKING:
    from fastapi import FastAPI


def handling_errors_schemas(app: "FastAPI") -> None:
    @app.exception_handler(RequestValidationError)
    async def request_validation_error_handler(_, exc: RequestValidationError):
        first_error: Dict = exc.errors()[0]
        message: str = first_error.get(
            "msg", "An unexpected error occurred while validating the submitted data."
        )

        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            content={"detail": message.replace("Value error, ", "", 1)},
        )
