import type { CurrencyType } from "@/core/business/currency-type/types";
import type { Expense } from "@/core/business/daily-register/expense/types";
import type { Income } from "@/core/business/daily-register/income/types";

export type MonthlySummaryRow = {
  categoryId: number;
  categoryName: string;
  budget: number;
  expenses: number;
  income: number;
  difference: number;
};

export type MonthlySummaryProps = {
  rows: MonthlySummaryRow[];
  currencyType: CurrencyType;
};

export type UseMonthlySummaryParams = {
  selectedPeriod: string;
  expenses: Expense[];
  incomes: Income[];
};
