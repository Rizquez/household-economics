import { useMemo } from "react";
import { MONTH_NAMES } from "@/ui/hooks/constants";
import type { SavingsInvestmentsHistoryProps, SavingsInvestmentsHistoryRow } from "../types";

const useSavingsInvestmentsHistory = ({
  history,
}: SavingsInvestmentsHistoryProps) => {
  const rows = useMemo<SavingsInvestmentsHistoryRow[]>(() => {
    const sortedHistory = [...history].sort(
      (first, second) => first.month - second.month,
    );

    return sortedHistory.reduce<SavingsInvestmentsHistoryRow[]>(
      (currentRows, savingsInvestment) => {
        const assignedAmount =
          savingsInvestment.savingsAmount + savingsInvestment.investmentAmount;

        const previousAccumulatedAmount =
          currentRows.at(-1)?.accumulatedAmount ?? 0;

        const row: SavingsInvestmentsHistoryRow = {
          id: savingsInvestment.id,
          label: `${
            MONTH_NAMES[savingsInvestment.month - 1]
          } ${savingsInvestment.year}`,
          savingsAmount: savingsInvestment.savingsAmount,
          investmentAmount: savingsInvestment.investmentAmount,
          accumulatedAmount: previousAccumulatedAmount + assignedAmount,
        };

        return [...currentRows, row];
      },
      [],
    );
  }, [history]);

  const totalSaved = useMemo(
    () =>
      history.reduce(
        (total, savingsInvestment) => total + savingsInvestment.savingsAmount,
        0,
      ),
    [history],
  );

  const totalInvested = useMemo(
    () =>
      history.reduce(
        (total, savingsInvestment) =>
          total + savingsInvestment.investmentAmount,
        0,
      ),
    [history],
  );

  const totalAssigned = totalSaved + totalInvested;

  return {
    rows,
    totalSaved,
    totalInvested,
    totalAssigned,
  };
};

export default useSavingsInvestmentsHistory;
