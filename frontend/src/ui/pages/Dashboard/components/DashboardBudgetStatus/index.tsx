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

const DashboardBudgetStatus = ({
  budgetStatus,
  currencyType,
}: DashboardBudgetStatusProps) => {
  if (!budgetStatus.length) {
    return (
      <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
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
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
      <div className="shrink-0 border-b border-text-secondary/10 p-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Budget status by category
        </h2>

        <p className="text-sm text-text-secondary">
          Compare the planned budget with the net amount used.
        </p>
      </div>

      <div className="min-h-0 flex-1 p-4">
        <ResponsiveContainer width="100%" height="100%" minHeight={220}>
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
    </section>
  );
};

export default DashboardBudgetStatus;
