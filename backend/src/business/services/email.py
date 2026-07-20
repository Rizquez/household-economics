import requests

from src.env import (
    get_email_service_id,
    get_email_template_id,
    get_email_user_id,
    get_email_private_key,
)
from src.constants import EMAILJS_API_URL


def send_access_request_email(
    name: str,
    email: str,
    clerk_id: str,
    timeout: int = 10,
) -> None:
    payload = {
        "service_id": get_email_service_id(),
        "template_id": get_email_template_id(),
        "user_id": get_email_user_id(),
        "accessToken": get_email_private_key(),
        "template_params": {
            "name": name,
            "email": email,
            "subject": "New Household Economics access request",
            "message": (
                f"New user pending approval:\n\n"
                f"Name: {name}\n"
                f"Email: {email}\n"
                f"Clerk ID: {clerk_id}"
            ),
        },
    }

    response = requests.post(
        url=EMAILJS_API_URL,
        json=payload,
        timeout=timeout,
    )

    response.raise_for_status()

# TODO: The email is sent to the administrator; a new template must be created and used to send the email to the guest
def send_family_invitation(name: str, email: str, timeout: int = 10) -> None:
    payload = {
        "service_id": get_email_service_id(),
        "template_id": get_email_template_id(),
        "user_id": get_email_user_id(),
        "accessToken": get_email_private_key(),
        "template_params": {
            "name": name,
            "email": email,
            "subject": "New Household Economics access request",
            "message": (
                f"New user pending approval:\n\n"
                f"Name: {name}\n"
                f"Email: {email}\n"
            ),
        },
    }

    response = requests.post(
        url=EMAILJS_API_URL,
        json=payload,
        timeout=timeout,
    )

    response.raise_for_status()
