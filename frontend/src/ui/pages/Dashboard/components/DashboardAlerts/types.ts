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

export type DashboardAlert = {
  id: string;
  type: "error" | "warning" | "info";
  message: string;
};

export type GetDashboardAlertsParams = Pick<
  DashboardAlertsProps,
  "overview" | "allocation" | "budgetStatus" | "previousMonthTransfer"
>;