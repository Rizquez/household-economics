import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import type { DashboardAlertsProps } from "./types";
import getDashboardAlerts from "./utils/getDashboardAlerts";

const DashboardAlerts = ({
  overview,
  allocation,
  budgetStatus,
  previousMonthTransfer,
}: DashboardAlertsProps) => {
  const alerts = getDashboardAlerts({
    overview,
    allocation,
    budgetStatus,
    previousMonthTransfer,
  });

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
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
