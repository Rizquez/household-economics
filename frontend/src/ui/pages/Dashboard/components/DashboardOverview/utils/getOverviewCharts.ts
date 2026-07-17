import type { Overview, OverviewChart } from "../types";

const getPercentage = (
  value: number,
  income: number,
) => {
  if (income <= 0) {
    return 0;
  }

  return (value / income) * 100;
};

const createChart = (
  label: string,
  value: number,
  percentage: number,
  valueClassName: string,
  chartClassName: string,
): OverviewChart => ({
  label,
  value,
  percentage,
  chartPercentage: Math.min(
    Math.max(percentage, 0),
    100,
  ),
  valueClassName,
  chartClassName,
});

const getOverviewCharts = (
  overview: Overview,
): OverviewChart[] => [
  createChart(
    "Income",
    overview.income,
    overview.income > 0 ? 100 : 0,
    "text-success",
    "text-success",
  ),
  createChart(
    "Expenses",
    overview.expenses,
    getPercentage(
      overview.expenses,
      overview.income,
    ),
    "text-error",
    "text-error",
  ),
  createChart(
    "Available",
    overview.available,
    getPercentage(
      overview.available,
      overview.income,
    ),
    overview.available >= 0
      ? "text-success"
      : "text-error",
    overview.available >= 0
      ? "text-success"
      : "text-error",
  ),
  createChart(
    "Remaining",
    overview.remaining,
    getPercentage(
      overview.remaining,
      overview.income,
    ),
    overview.remaining >= 0
      ? "text-success"
      : "text-error",
    overview.remaining >= 0
      ? "text-primary"
      : "text-error",
  ),
];

export default getOverviewCharts;