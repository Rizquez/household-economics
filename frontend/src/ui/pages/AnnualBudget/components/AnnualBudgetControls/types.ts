export type AnnualBudgetControlsProps = {
  year: string;
  yearOptions: {
    label: string;
    value: number;
  }[];
  isUpdatingBudgets: boolean;
  onYearChange: (year: string) => void;
  onSaveBudgets: () => void;
};
