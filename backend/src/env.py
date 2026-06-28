import os
from dotenv import load_dotenv

load_dotenv(override=True)


def _get_environment() -> str:
    return os.environ.get("ENVIRONMENT", "undefined")


def is_local_environment() -> bool:
    return _get_environment() == "LOCAL"


def is_render_environment() -> bool:
    return _get_environment() == "RENDER"


def get_clerk_issuer() -> str:
    return os.environ.get("CLERK_ISSUER", "")


def get_clerk_jwks_url() -> str:
    return os.environ.get("CLERK_JWKS_URL", "")


def get_clerk_secret_key() -> str:
    return os.environ.get("CLERK_SECRET_KEY", "")
