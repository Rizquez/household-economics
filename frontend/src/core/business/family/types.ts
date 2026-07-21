export type Family = {
  id: number;
  name: string;
};

export type UpdateFamilyRequest = {
  name: string;
};
export type FamilyRole = "OWNER" | "ADMIN" | "MEMBER";

export type FamilyMember = {
  id: number;
  userId: number;
  name: string;
  email: string;
  role: FamilyRole;
};

export type CreateFamilyInvitationRequest = {
  email: string;
};
