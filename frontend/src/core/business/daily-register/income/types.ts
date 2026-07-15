export type Income = {
  id: number;
  name: string;
  createdAt: string;
  amount: number;
  notes: string | null;
  categoryId: number | null;
  familyId: number;
  savingsInvestmentId: number | null;
  categoryName: string | null;
  categoryNormalizedName: string | null;
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
