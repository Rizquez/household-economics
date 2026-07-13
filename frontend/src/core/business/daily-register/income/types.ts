export type Income = {
  id: number;
  name: string;
  createdAt: string;
  amount: number;
  notes: string | null;
  categoryId: number | null;
  familyId: number;
  categoryName: string | null;
};

export type CreateIncomeRequest = {
  name: string;
  createdAt: string;
  amount: number;
  notes?: string | null;
  categoryId: number;
};

export type UpdateIncomeRequest = {
  id: number;
  name: string;
  createdAt: string;
  amount: number;
  notes?: string | null;
  categoryId: number;
};
