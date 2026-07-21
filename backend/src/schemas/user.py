from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class CurrentUser:
    id: int
    clerk_id: str
    email: str
    name: str
    family_id: Optional[int]
    access_allowed: bool
