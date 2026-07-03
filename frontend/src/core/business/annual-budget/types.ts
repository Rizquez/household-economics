export type Budget = {
  id: number;
  year: number;
  month: number;
  amount: number;
  budgetGroupId: number;
};

export type BudgetGroup = {
  id: number;
  name: string;
  budgets: Budget[];
};

export type UpdateBudgetRequest = {
  id: number;
  amount: number;
};
