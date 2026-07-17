import type { DashboardAlert, GetDashboardAlertsParams } from "../types";

const getDashboardAlerts = ({
  overview,
  allocation,
  budgetStatus,
  previousMonthTransfer,
}: GetDashboardAlertsParams): DashboardAlert[] => {
  const exceededBudgets = budgetStatus
    .filter((category) => category.available < 0)
    .map((category) => ({
      id: `exceeded-${category.categoryId}`,
      type: "error" as const,
      message: `${category.categoryName} is ${Math.abs(
        category.available,
      ).toFixed(2)} over budget.`,
    }));

  const warningBudgets = budgetStatus
    .filter((category) => {
      if (category.budget <= 0 || category.available < 0) {
        return false;
      }

      const usedPercentage = category.expenses / category.budget;

      return usedPercentage >= 0.8;
    })
    .map((category) => ({
      id: `warning-${category.categoryId}`,
      type: "warning" as const,
      message: `${category.categoryName} has used ${Math.round(
        (category.expenses / category.budget) * 100,
      )}% of its monthly budget.`,
    }));

  const generalAlerts = [];

  if (overview.available < 0) {
    generalAlerts.push({
      id: "negative-available",
      type: "error" as const,
      message: `Expenses exceed income by ${Math.abs(
        overview.available,
      ).toFixed(2)}.`,
    });
  }

  if (overview.available > 0 && !allocation.hasAllocation) {
    generalAlerts.push({
      id: "missing-allocation",
      type: "warning" as const,
      message: `${overview.available.toFixed(
        2,
      )} is available but has not been allocated to savings or investments.`,
    });
  }

  if (previousMonthTransfer) {
    generalAlerts.push({
      id: "previous-month-transfer",
      type: "info" as const,
      message:
        previousMonthTransfer.type === "Income"
          ? `${previousMonthTransfer.amount.toFixed(
              2,
            )} was carried over from the previous month.`
          : `A deficit of ${previousMonthTransfer.amount.toFixed(
              2,
            )} was carried over from the previous month.`,
    });
  }

  const alerts = [...generalAlerts, ...exceededBudgets, ...warningBudgets];

  return alerts;
};

export default getDashboardAlerts;
