import type { SavingsInvestments } from "@/core/business/savings-investments/types";

export type SavingsInvestmentsAllocationProps = {
  year: number;
  month: number;
  availableAmount: number;
  savingsInvestment: SavingsInvestments | null;
};
