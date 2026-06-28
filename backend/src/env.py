import os
from dotenv import load_dotenv

load_dotenv(override=True)


def _get_environment() -> str:
    return os.environ.get("ENVIRONMENT", "undefined")


def get_clerk_issuer() -> str:
    return os.environ.get("CLERK_ISSUER", "undefined")


def get_clerk_jwks_url() -> str:
    return os.environ.get("CLERK_JWKS_URL", "undefined")


def get_clerk_secret_key() -> str:
    return os.environ.get("CLERK_SECRET_KEY", "undefined")


def get_email_service_id() -> str:
    return os.environ.get("EMAIL_SERVICE_ID", "undefined")


def get_email_template_id() -> str:
    return os.environ.get("EMAIL_TEMPLATE_ID", "undefined")


def get_email_user_id() -> str:
    return os.environ.get("EMAIL_USER_ID", "undefined")


def get_email_private_key() -> str:
    return os.environ.get("EMAIL_PRIVATE_KEY", "undefined")


def is_local_environment() -> bool:
    return _get_environment() == "LOCAL"


def is_render_environment() -> bool:
    return _get_environment() == "RENDER"
