export type AnnualBudgetControlsProps = {
  year: string;
  yearOptions: {
    label: string;
    value: number;
  }[];
  hasBudgetGroups: boolean;
  isUpdatingBudgets: boolean;
  formError: string;
  onYearChange: (year: string) => void;
  onSaveBudgets: () => void;
};
