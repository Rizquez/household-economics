import type { CurrencyType } from "@/core/business/currency-type/types";
import type { DashboardBudgetStatus } from "@/core/business/dashboard/types";

export type DashboardBudgetStatusProps = {
  budgetStatus: DashboardBudgetStatus[];
  currencyType: CurrencyType;
};

export type BudgetStatus = DashboardBudgetStatusProps["budgetStatus"];
