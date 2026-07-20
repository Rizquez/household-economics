from __future__ import annotations

from typing import List, TYPE_CHECKING
from fastapi import APIRouter, Depends, status

from src.auth import get_valid_user
from src.business import FamilyBusiness
from src.schemas import FamilyResponse, FamilyUpdateRequest, FamilyMemberResponse, CreateInvitationRequest
from src.routes.helpers import validate_non_negative_num

if TYPE_CHECKING:
    from src.schemas import CurrentUser


router = APIRouter()


@router.get("")
def route_get_family_by_user_id(
    current_user: "CurrentUser" = Depends(get_valid_user),
) -> FamilyResponse:
    return FamilyBusiness.get_family_by_user_id(current_user.id)

@router.put("")
def route_update_family(
    request: FamilyUpdateRequest,
    current_user: "CurrentUser" = Depends(get_valid_user),
) -> FamilyResponse:
    return FamilyBusiness.update_family(
        request.name,
        current_user.family_id,
    )

@router.get("/members")
def route_get_family_members(
    current_user: "CurrentUser" = Depends(get_valid_user),
) -> List[FamilyMemberResponse]:
    return FamilyBusiness.get_family_members(current_user.id)


@router.delete("/members/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def route_remove_family_member(
    member_id: int,
    current_user: "CurrentUser" = Depends(get_valid_user),
) -> None:
    FamilyBusiness.remove_family_member(current_user.id, validate_non_negative_num(member_id))

@router.post("/invitations", status_code=status.HTTP_204_NO_CONTENT)
def route_create_family_invitation(
    request: CreateInvitationRequest,
    current_user: "CurrentUser" = Depends(get_valid_user),
) -> None:
    FamilyBusiness.create_invitation(
        str(request.email),
        current_user.family_id,
        current_user.id,
    )
