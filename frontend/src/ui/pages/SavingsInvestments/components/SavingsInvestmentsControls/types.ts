export type SavingsInvestmentsControlsProps = {
  selectedPeriod: string;

  periodOptions: {
    label: string;
    value: string;
  }[];

  onPeriodChange: (period: string) => void;
};
