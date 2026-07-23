export type CurrencyTypeDto = {
  id: number;
  name: string;
  code: string;
  symbol: string;
};

export type FamilyDto = {
  id: number;
  name: string;
  currency_type_id: number;
  currency_type: CurrencyTypeDto;
};

export type UpdateFamilyRequestDto = {
  name: string;
  currency_type_id: number;
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
