from collections.abc import Awaitable, Callable
from fastapi import Request, Response, status
from fastapi.responses import JSONResponse
from pyrate_limiter import Duration, Limiter, Rate
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp


def identify_client(request: Request) -> str:
    if request.client is None:
        return "unknown-client"

    return request.client.host


def is_cors_preflight(request: Request) -> bool:
    return (
        request.method == "OPTIONS"
        and "origin" in request.headers
        and "access-control-request-method" in request.headers
    )


class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(
        self,
        app: ASGIApp,
        requests: int,
        window_seconds: int
    ) -> None:
        super().__init__(app)

        self.window_seconds = window_seconds
        self.limiter = Limiter(Rate(requests, Duration.SECOND * window_seconds))

    async def dispatch(
        self,
        request: Request,
        call_next: Callable[[Request], Awaitable[Response]]
    ) -> Response:
        if is_cors_preflight(request):
            return await call_next(request)

        allowed = await self.limiter.try_acquire_async(
            identify_client(request),
            blocking=False
        )

        if not allowed:
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "detail": "The load balancer has been triggered because you've made too many requests in a very short period of time. Please wait a moment and reload the page."
                    },
                headers={
                    "Retry-After": str(self.window_seconds)
                }
            )

        return await call_next(request)
