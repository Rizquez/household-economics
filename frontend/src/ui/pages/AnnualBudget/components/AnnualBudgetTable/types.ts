import type { BudgetGroup } from "@/core/business/annual-budget/types";

export type AnnualBudgetTableProps = {
  budgetGroups: BudgetGroup[];
  onAmountChange: (
    budgetId: number,
    amount: number,
  ) => void;
  hasFieldError: (
    field: `budget.${number}`,
  ) => boolean;
};