import type { Expense } from "@/core/business/daily-register/expense/types";

export type MonthlySummaryRow = {
  categoryId: number;
  categoryName: string;
  budget: number;
  actualExpenditure: number;
  difference: number;
};

export type MonthlySummaryProps = {
  rows: MonthlySummaryRow[];
};

export type UseMonthlySummaryParams = {
  selectedPeriod: string;
  expenses: Expense[];
};
