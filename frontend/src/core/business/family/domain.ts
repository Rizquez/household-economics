export type FamilyDto = {
  id: number;
  name: string;
};

export type UpdateFamilyRequestDto = {
  name: string;
};
export type FamilyMemberDto = {
  id: number;
  user_id: number;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
};

export type CreateFamilyInvitationRequestDto = {
  email: string;
};
