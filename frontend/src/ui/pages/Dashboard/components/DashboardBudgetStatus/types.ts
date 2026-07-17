import type { DashboardBudgetStatus } from "@/core/business/dashboard/types";

export type DashboardBudgetStatusProps = {
  budgetStatus: DashboardBudgetStatus[];
};

export type BudgetStatus = DashboardBudgetStatusProps["budgetStatus"];