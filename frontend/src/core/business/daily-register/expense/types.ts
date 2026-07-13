export type ExpenseItem = {
  id: number;
  product: string;
  amount: number;
  categoryId: number | null;
  expenseId: number;
  categoryName: string | null;
  categoryNormalizedName: string | null;
};

export type Expense = {
  id: number;
  name: string;
  createdAt: string;
  amount: number;
  notes: string | null;
  categoryId: number | null;
  familyId: number;
  savingsInvestmentId: number | null;
  items: ExpenseItem[];
  categoryName: string | null;
  categoryNormalizedName: string | null;
};

export type ExpenseItemRequest = {
  product: string;
  amount: number;
  categoryId: number;
};

export type CreateExpenseRequest = {
  name: string;
  createdAt: string;
  amount: number;
  notes?: string | null;
  categoryId?: number | null;
  items?: ExpenseItemRequest[] | null;
};

export type UpdateExpenseRequest = {
  id: number;
  name: string;
  createdAt: string;
  amount: number;
  notes?: string | null;
  categoryId?: number | null;
  items?: ExpenseItemRequest[] | null;
};
