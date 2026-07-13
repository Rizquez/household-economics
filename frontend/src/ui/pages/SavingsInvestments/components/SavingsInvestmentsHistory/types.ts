import type { SavingsInvestments } from "@/core/business/savings-investments/types";

export type SavingsInvestmentsHistoryProps = {
  history: SavingsInvestments[];
};

export type SavingsInvestmentsHistoryRow = {
  id: number;
  label: string;
  savingsAmount: number;
  investmentAmount: number;
  accumulatedAmount: number;
};
