export type Family = {
  id: number;
  name: string;
  currencyTypeId: number;
};

export type UpdateFamilyRequest = {
  name: string;
  currencyTypeId: number;
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
