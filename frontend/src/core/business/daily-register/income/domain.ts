export type IncomeResponseDto = {
  id: number;
  name: string;
  created_at: string;
  amount: string;
  notes: string | null;
  category_id: number | null;
  family_id: number;
  category: IncomeCategoryResponseDto | null;
};

export type CreateIncomeRequestDto = {
  name: string;
  created_at: string;
  amount: number;
  notes?: string | null;
  category_id: number;
};

export type UpdateIncomeRequestDto = {
  name: string;
  created_at: string;
  amount: number;
  notes?: string | null;
  category_id: number;
};

export type IncomeCategoryResponseDto = {
  id: number;
  name: string;
  record_type_id: number;
};
