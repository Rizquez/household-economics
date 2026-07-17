import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { DashboardAllocationProps } from "./types";
import getAllocationChartData from "./utils/getAllocationChartData";

const DashboardAllocation = ({
  allocation,
}: DashboardAllocationProps) => {
  if (!allocation.hasAllocation) {
    return (
      <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
        <div className="shrink-0 border-b border-text-secondary/10 p-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Monthly allocation
          </h2>

          <p className="text-sm text-text-secondary">
            Review how the available balance was distributed.
          </p>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center p-6">
          <p className="text-center text-sm text-text-secondary">
            No savings or investment allocation found for this period.
          </p>
        </div>
      </section>
    );
  }

  const { chartData, assigned, chartTotal } = getAllocationChartData(allocation);
  
  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
      <div className="shrink-0 border-b border-text-secondary/10 p-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Monthly allocation
        </h2>

        <p className="text-sm text-text-secondary">
          Review how the available balance was distributed.
        </p>
      </div>

      <div className="grid min-h-0 flex-1 gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(160px,0.8fr)]">
        <div className="min-h-0">
          {chartTotal > 0 ? (
            <ResponsiveContainer
              width="100%"
              height="100%"
              minHeight={180}
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="82%"
                  paddingAngle={3}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {chartData.map((item) => (
                    <Cell /* Deprecation warning for versions later than 4.0; this project's version -> ^3.9.2 */
                      key={item.name}
                      fill="currentColor"
                      className={item.colorClassName}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    Number(value).toFixed(2)
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full min-h-44 items-center justify-center">
              <p className="text-center text-sm text-text-secondary">
                There is no positive amount to represent in the allocation chart.
              </p>
            </div>
          )}
        </div>

        <div className="flex min-h-0 flex-col justify-center gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-success" />

              <span className="text-sm text-text-secondary">
                Savings
              </span>
            </div>

            <span className="font-semibold text-text-primary">
              {allocation.savings.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary" />

              <span className="text-sm text-text-secondary">
                Investments
              </span>
            </div>

            <span className="font-semibold text-text-primary">
              {allocation.investments.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full ${
                  allocation.remaining >= 0
                    ? "bg-secondary"
                    : "bg-error"
                }`}
              />

              <span className="text-sm text-text-secondary">
                Remaining
              </span>
            </div>

            <span
              className={`font-semibold ${
                allocation.remaining >= 0
                  ? "text-text-primary"
                  : "text-error"
              }`}
            >
              {allocation.remaining.toFixed(2)}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3 border-t border-text-secondary/10 pt-3">
            <span className="text-sm text-text-secondary">
              Total assigned
            </span>

            <span className="font-semibold text-text-primary">
              {assigned.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardAllocation;