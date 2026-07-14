export type DashboardPeriodOption = {
  label: string;
  value: string;
};

export type DashboardControlsProps = {
  selectedPeriod: string;
  periodOptions: DashboardPeriodOption[];
  onPeriodChange: (period: string) => void;
};
