import type { Allocation } from "../types";

const getAllocationChartData = (allocation: Allocation) => {
  const chartData = [
    {
      name: "Savings",
      value: allocation.savings,
      colorClassName: "text-success",
    },
    {
      name: "Investments",
      value: allocation.investments,
      colorClassName: "text-primary",
    },
    {
      name: "Remaining",
      value: Math.max(allocation.remaining, 0),
      colorClassName: "text-secondary",
    },
  ].filter((item) => item.value > 0);

  const assigned = allocation.savings + allocation.investments;

  const chartTotal = chartData.reduce((total, item) => total + item.value, 0);

  return {
    chartData,
    assigned,
    chartTotal,
  };
};

export default getAllocationChartData;
