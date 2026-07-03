export type BudgetResponseDto = {
  id: number;
  year: number;
  month: number;
  amount: string;
  budget_group_id: number;
};

export type BudgetGroupResponseDto = {
  id: number;
  name: string;
  budgets: BudgetResponseDto[];
};

export type UpdateBudgetRequestDto = {
  id: number;
  amount: number;
};
