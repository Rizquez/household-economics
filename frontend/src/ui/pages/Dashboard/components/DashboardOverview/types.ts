import type { DashboardOverview } from "@/core/business/dashboard/types";

export type DashboardOverviewProps = {
  overview: DashboardOverview;
};

export type OverviewChart = {
  label: string;
  value: number;
  percentage: number;
  chartPercentage: number;
  valueClassName: string;
  chartClassName: string;
};

export type Overview = DashboardOverviewProps["overview"];