export type AnnualBudgetControlsProps = {
  year: string;
  yearOptions: {
    label: string;
    value: number;
  }[];
  hasBudgetGroups: boolean;
  isUpdatingBudgets: boolean;
  onYearChange: (year: string) => void;
  onSaveBudgets: () => void;
};
