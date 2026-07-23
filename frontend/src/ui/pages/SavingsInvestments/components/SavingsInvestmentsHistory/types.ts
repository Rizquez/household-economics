import type { CurrencyType } from "@/core/business/currency-type/types";
import type { SavingsInvestments } from "@/core/business/savings-investments/types";

export type SavingsInvestmentsHistoryProps = {
  history: SavingsInvestments[];
  currencyType: CurrencyType;
};

export type SavingsInvestmentsHistoryRow = {
  id: number;
  label: string;
  savingsAmount: number;
  investmentAmount: number;
  accumulatedAmount: number;
};
