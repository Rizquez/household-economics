import requests

from src.env import (
    get_email_service_id,
    get_email_new_user_template_id,
    get_email_user_id,
    get_email_private_key,
    get_email_family_invitation_template_id,
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
        "template_id": get_email_new_user_template_id(),
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


def send_family_invitation(
    user_name: str, family_name: str, to_email: str, from_email: str, timeout: int = 10
) -> None:
    payload = {
        "service_id": get_email_service_id(),
        "template_id": get_email_family_invitation_template_id(),
        "user_id": get_email_user_id(),
        "accessToken": get_email_private_key(),
        "template_params": {
            "name": user_name,
            "to_email": to_email,
            "from_email": from_email,
            "subject": f"You're invited to join the {family_name} family group",
            "message": (
                f"Hello,\n\n"
                f"{user_name} ({from_email}) has invited you to join the '{family_name}' family group in Household Economics.\n\n"
                f"Once you join, you'll be able to manage your household finances together with the other family members.\n\n"
                f"If you weren't expecting this invitation, you can safely ignore this email."
            ),
        },
    }

    response = requests.post(
        url=EMAILJS_API_URL,
        json=payload,
        timeout=timeout,
    )

    response.raise_for_status()
