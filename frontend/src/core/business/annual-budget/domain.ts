export type BudgetResponseDto = {
  id: number;
  month: number;
  amount: string;
  budget_group_id: number;
};

export type BudgetGroupResponseDto = {
  id: number;
  name: string;
  normalized_name: string;
  year: number;
  category_id: number;
  budgets: BudgetResponseDto[];
};

export type UpdateBudgetRequestDto = {
  id: number;
  amount: number;
};
