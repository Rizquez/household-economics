import { useMemo } from "react";

import { MONTH_NAMES } from "@/ui/hooks/constants";

import type {
  SavingsInvestmentsHistoryProps,
  SavingsInvestmentsHistoryRow,
} from "../types";

const useSavingsInvestmentsHistory = ({
  history,
}: SavingsInvestmentsHistoryProps) => {
  const rows = useMemo<
    SavingsInvestmentsHistoryRow[]
  >(() => {
    let accumulatedAmount = 0;

    return [...history]
      .sort(
        (first, second) =>
          first.month - second.month,
      )
      .map((savingsInvestment) => {
        accumulatedAmount +=
          savingsInvestment.savingsAmount +
          savingsInvestment.investmentAmount;

        return {
          id: savingsInvestment.id,
          label: `${
            MONTH_NAMES[
              savingsInvestment.month - 1
            ]
          } ${savingsInvestment.year}`,
          savingsAmount:
            savingsInvestment.savingsAmount,
          investmentAmount:
            savingsInvestment.investmentAmount,
          accumulatedAmount,
        };
      });
  }, [history]);

  const totalSaved = useMemo(
    () =>
      history.reduce(
        (total, savingsInvestment) =>
          total +
          savingsInvestment.savingsAmount,
        0,
      ),
    [history],
  );

  const totalInvested = useMemo(
    () =>
      history.reduce(
        (total, savingsInvestment) =>
          total +
          savingsInvestment.investmentAmount,
        0,
      ),
    [history],
  );

  const totalAssigned =
    totalSaved + totalInvested;

  return {
    rows,
    totalSaved,
    totalInvested,
    totalAssigned,
  };
};

export default useSavingsInvestmentsHistory;