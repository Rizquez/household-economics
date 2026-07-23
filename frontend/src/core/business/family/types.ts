export type CurrencyType = {
  id: number;
  name: string;
  code: string;
  symbol: string;
};

export type Family = {
  id: number;
  name: string;
  currencyTypeId: number;
  currencyType: CurrencyType;
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
