from dataclasses import dataclass


@dataclass(frozen=True)
class CurrentUser:
    id: int
    clerk_id: str
    email: str
    name: str
    family_id: int
    access_allowed: bool
