export type MonthlyTrackingControlsProps = {
  selectedPeriod: string;
  periodOptions: {
    label: string;
    value: string;
  }[];
  onPeriodChange: (period: string) => void;
  onNewRecord: () => void;
};
