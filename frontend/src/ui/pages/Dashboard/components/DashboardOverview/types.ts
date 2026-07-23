import type { CurrencyType } from "@/core/business/currency-type/types";
import type { DashboardOverview } from "@/core/business/dashboard/types";

export type DashboardOverviewProps = {
  overview: DashboardOverview;
  currencyType: CurrencyType;
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
