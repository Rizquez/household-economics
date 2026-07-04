export type Budget = {
  id: number;
  month: number;
  amount: number;
  budgetGroupId: number;
};

export type BudgetGroup = {
  id: number;
  name: string;
  year: number;
  budgets: Budget[];
};

export type UpdateBudgetRequest = {
  id: number;
  amount: number;
};
