import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DashboardBudgetStatusProps } from "./types";
import getBudgetStatusChartData from "./utils/getBudgetStatusChartData";
import { chartTooltipStyles } from "../../../../styles/share";

const DashboardBudgetStatus = ({
  budgetStatus,
  currencyType,
}: DashboardBudgetStatusProps) => {
  if (!budgetStatus.length) {
    return (
      <section className="flex h-auto min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background xl:h-full">
        <div className="shrink-0 border-b border-text-secondary/10 p-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Budget status by category
          </h2>

          <p className="text-sm text-text-secondary">
            Compare your monthly budget with your actual records.
          </p>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center p-6">
          <p className="text-center text-sm text-text-secondary">
            No budget information found for this period.
          </p>
        </div>
      </section>
    );
  }

  const chartData = getBudgetStatusChartData(budgetStatus);

  return (
    <section className="flex h-auto min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background xl:h-full">
      <div className="shrink-0 border-b border-text-secondary/10 p-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Budget status by category
        </h2>
      </div>

      <div className="min-h-0 flex-1 overflow-x-auto p-4 lg:overflow-x-visible">
        <div className="h-72 min-w-105 lg:min-w-0 xl:h-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minHeight={220}
            debounce={16}
          >
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 0,
                right: 24,
                bottom: 0,
                left: 8,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="currentColor"
                className="text-text-secondary/10"
              />

              <XAxis
                type="number"
                tickFormatter={(value) =>
                  `${currencyType.symbol} ${Number(value).toFixed(0)}`
                }
                tick={{
                  fontSize: 12,
                }}
                stroke="currentColor"
                className="text-text-secondary"
              />

              <YAxis
                type="category"
                dataKey="categoryName"
                width={110}
                tick={{
                  fontSize: 12,
                }}
                stroke="currentColor"
                className="text-text-secondary"
              />

              <Tooltip
                {...chartTooltipStyles}
                cursor={{
                  fill: "var(--color-text-secondary)",
                  fillOpacity: 0.08,
                }}
                formatter={(value, name) => [
                  `${currencyType.symbol} ${Number(value).toFixed(2)}`,
                  name,
                ]}
              />

              <Legend />

              <Bar
                dataKey="budget"
                name="Budget"
                fill="currentColor"
                className="text-primary"
                radius={[0, 6, 6, 0]}
                maxBarSize={18}
              />

              <Bar
                dataKey="netUsed"
                name="Net used"
                fill="currentColor"
                className="text-secondary"
                radius={[0, 6, 6, 0]}
                maxBarSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default DashboardBudgetStatus;
