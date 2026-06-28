from __future__ import annotations

from functools import lru_cache
from typing import Any, Dict
import jwt
import requests
from fastapi import HTTPException, status
from jwt import PyJWKClient


@lru_cache
def _get_jwks_client(jwks_url: str) -> PyJWKClient:
    return PyJWKClient(jwks_url)


def verify_clerk_token(token: str, issuer: str, jwks_url: str) -> Dict[str, Any]:
    if not issuer or not jwks_url:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Clerk authentication is not configured.",
        )

    try:
        jwks_client = _get_jwks_client(jwks_url)
        signing_key = jwks_client.get_signing_key_from_jwt(token)

        return jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            issuer=issuer,
            options={"verify_aud": False},
        )

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token.",
        )


def get_clerk_user(
    clerk_id: str, secret_key: str, clerk_api_url: str, timeout: int = 10
) -> Dict[str, Any]:
    if not secret_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Clerk secret key is not configured.",
        )

    response = requests.get(
        f"{clerk_api_url}/users/{clerk_id}",
        headers={"Authorization": f"Bearer {secret_key}"},
        timeout=timeout,
    )

    if response.status_code != status.HTTP_200_OK:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unable to load Clerk user.",
        )

    return response.json()
