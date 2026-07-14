import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import type { DashboardAlertsProps } from "./types";

const DashboardAlerts = ({
  overview,
  allocation,
  budgetStatus,
  previousMonthTransfer,
}: DashboardAlertsProps) => {
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

  const alerts = [
    ...generalAlerts,
    ...exceededBudgets,
    ...warningBudgets,
  ].slice(0, 5);

  return (
    <section className="flex min-h-64 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
      <div className="border-b border-text-secondary/10 p-4">
        <h2 className="text-lg font-semibold text-text-primary">Alerts</h2>

        <p className="text-sm text-text-secondary">
          Review situations that may require your attention.
        </p>
      </div>

      {!alerts.length ? (
        <div className="flex flex-1 items-center justify-center gap-2 p-6 text-success">
          <FontAwesomeIcon icon={faCircleCheck} />

          <p className="text-sm">Your finances are on track for this period.</p>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 rounded-xl p-3 ${
                alert.type === "error"
                  ? "bg-error/10 text-error"
                  : alert.type === "warning"
                    ? "bg-secondary/10 text-secondary"
                    : "bg-primary/10 text-primary"
              }`}
            >
              <FontAwesomeIcon
                icon={
                  alert.type === "info" ? faCircleInfo : faTriangleExclamation
                }
                className="mt-0.5 shrink-0"
              />

              <p className="text-sm leading-5">{alert.message}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DashboardAlerts;
