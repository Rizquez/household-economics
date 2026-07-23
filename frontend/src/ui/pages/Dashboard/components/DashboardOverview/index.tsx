import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import type { DashboardOverviewProps } from "./types";
import getOverviewCharts from "./utils/getOverviewCharts";

const DashboardOverview = ({
  overview,
  currencyType,
}: DashboardOverviewProps) => {
  const charts = getOverviewCharts(overview);
  return (
    <section className="grid h-full min-h-0 grid-cols-2 grid-rows-2 gap-3">
      {charts.map((chart) => (
        <article
          key={chart.label}
          className="grid min-h-0 grid-cols-[108px_minmax(0,1fr)] items-center gap-3 rounded-xl border border-text-secondary/10 bg-background px-3 py-2"
        >
          <div className="relative h-24 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="72%"
                outerRadius="100%"
                barSize={8}
                startAngle={90}
                endAngle={-270}
                data={[
                  {
                    value: chart.chartPercentage,
                  },
                ]}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />

                <RadialBar
                  dataKey="value"
                  angleAxisId={0}
                  background
                  cornerRadius={8}
                  fill="currentColor"
                  className={chart.chartClassName}
                  isAnimationActive={false}
                />
              </RadialBarChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-text-primary">
                {Math.round(chart.percentage)}%
              </span>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-sm text-text-secondary">{chart.label}</span>

            <span
              className={`truncate text-xl font-semibold ${chart.valueClassName}`}
              title={`${currencyType.symbol} ${chart.value.toFixed(2)}`}
            >
              {currencyType.symbol} {chart.value.toFixed(2)}
            </span>

            <span className="text-xs text-text-secondary">
              {chart.label === "Income"
                ? "Monthly income"
                : "Of monthly income"}
            </span>
          </div>
        </article>
      ))}
    </section>
  );
};

export default DashboardOverview;
