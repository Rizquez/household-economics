import type { BudgetGroup } from "@/core/business/annual-budget/types";
import type { CurrencyType } from "@/core/business/currency-type/types";

export type AnnualBudgetTableProps = {
  budgetGroups: BudgetGroup[];
  currencyType: CurrencyType;
  onAmountChange: (budgetId: number, amount: number) => void;
  hasFieldError: (field: `budget.${number}`) => boolean;
};
