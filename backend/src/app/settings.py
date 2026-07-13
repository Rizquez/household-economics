from typing import Union
from fastapi import status, HTTPException

from src.env import (
    is_local_environment,
    is_render_environment,
    get_clerk_issuer,
    get_clerk_jwks_url,
    get_clerk_secret_key,
)


class Base:
    PORT: int = 8080
    WORKERS: int = 1
    VERSION = "0.1.0"
    ROOT: str = "/api/v1"
    CLERK_ISSUER: str = get_clerk_issuer()
    CLERK_JWKS_URL: str = get_clerk_jwks_url()
    CLERK_SECRET_KEY: str = get_clerk_secret_key()


class Local(Base):
    HOST: str = "127.0.0.1"
    DEBUG: bool = True
    RELOAD: bool = True
    ENABLE_DOCS: bool = True


class Render(Base):
    HOST: str = "0.0.0.0"
    DEBUG: bool = False
    RELOAD: bool = False
    ENABLE_DOCS: bool = False


def get_settings() -> Union[Local, Render]:
    if is_local_environment():
        return Local()
    elif is_render_environment():
        return Render()
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No environment was found in the environment variables",
        )
