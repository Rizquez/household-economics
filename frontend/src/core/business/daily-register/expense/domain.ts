export type ExpenseItemResponseDto = {
  id: number;
  product: string;
  amount: string;
  category_id: number | null;
  expense_id: number;
  category: ExpenseCategoryResponseDto | null;
};

export type ExpenseResponseDto = {
  id: number;
  name: string;
  created_at: string;
  amount: string;
  notes: string | null;
  category_id: number | null;
  family_id: number;
  items: ExpenseItemResponseDto[];
  category: ExpenseCategoryResponseDto | null;
};

export type ExpenseItemRequestDto = {
  product: string;
  amount: number;
  category_id: number;
};

export type CreateExpenseRequestDto = {
  name: string;
  created_at: string;
  amount: number;
  notes?: string | null;
  category_id?: number | null;
  items?: ExpenseItemRequestDto[] | null;
};

export type UpdateExpenseRequestDto = {
  name: string;
  created_at: string;
  amount: number;
  notes?: string | null;
  category_id?: number | null;
  items?: ExpenseItemRequestDto[] | null;
};

export type ExpenseCategoryResponseDto = {
  id: number;
  name: string;
  record_type_id: number;
};
