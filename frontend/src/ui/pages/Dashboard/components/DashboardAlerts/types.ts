import type {
  DashboardAllocation,
  DashboardBudgetStatus,
  DashboardOverview,
  DashboardPreviousMonthTransfer,
} from "@/core/business/dashboard/types";

export type DashboardAlertsProps = {
  overview: DashboardOverview;
  allocation: DashboardAllocation;
  budgetStatus: DashboardBudgetStatus[];
  previousMonthTransfer: DashboardPreviousMonthTransfer | null;
};
