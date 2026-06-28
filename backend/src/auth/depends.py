from fastapi import Depends
from fastapi.security import HTTPBearer
from typing import TYPE_CHECKING

from src.app import get_settings
from src.business import AuthBusiness
from .clerk import verify_clerk_token, get_clerk_user

if TYPE_CHECKING:
    from src.schemas import CurrentUser
    from fastapi.security import HTTPAuthorizationCredentials


bearer_scheme = HTTPBearer()


def get_current_user(
    credentials: "HTTPAuthorizationCredentials" = Depends(bearer_scheme),
) -> "CurrentUser":
    settings = get_settings()

    claims = verify_clerk_token(
        token=credentials.credentials,
        issuer=settings.CLERK_ISSUER,
        jwks_url=settings.CLERK_JWKS_URL,
    )

    clerk_user = get_clerk_user(
        clerk_id=claims["sub"],
        secret_key=settings.CLERK_SECRET_KEY,
        clerk_api_url=settings.CLERK_API_URL,
    )

    return AuthBusiness.get_or_create_current_user(claims, clerk_user)
