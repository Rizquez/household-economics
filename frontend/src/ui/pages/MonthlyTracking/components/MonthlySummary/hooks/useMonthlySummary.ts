import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getBudgetGroups } from "@/core/business/annual-budget/services";
import { ANNUAL_BUDGET_QUERY_KEY } from "@/ui/pages/AnnualBudget/hook/constants";
import type { MonthlySummaryRow, UseMonthlySummaryParams } from "../types";

const useMonthlySummary = ({
  selectedPeriod,
  expenses,
}: UseMonthlySummaryParams) => {
  const [yearValue, monthValue] = selectedPeriod.split("-");

  const year = Number(yearValue);
  const month = Number(monthValue);

  const query = useQuery({
    queryKey: [ANNUAL_BUDGET_QUERY_KEY, year],
    queryFn: () => getBudgetGroups.execute(year),
    enabled: year >= 1,
  });

  const rows = useMemo<MonthlySummaryRow[]>(
    () =>
      (query.data ?? []).map((budgetGroup) => {
        const monthlyBudget =
          budgetGroup.budgets.find((budget) => budget.month === month)
            ?.amount ?? 0;

        const actualExpenditure = expenses.reduce((total, expense) => {
          if (expense.items.length > 0) {
            const itemsTotal = expense.items.reduce(
              (currentItemsTotal, item) =>
                item.categoryId === budgetGroup.categoryId
                  ? currentItemsTotal + item.amount
                  : currentItemsTotal,
              0,
            );

            return total + itemsTotal;
          }

          if (expense.categoryId === budgetGroup.categoryId) {
            return total + expense.amount;
          }

          return total;
        }, 0);

        return {
          categoryId: budgetGroup.categoryId,
          categoryName: budgetGroup.name,
          budget: monthlyBudget,
          actualExpenditure,
          difference: monthlyBudget - actualExpenditure,
        };
      }),
    [query.data, expenses, month],
  );

  return {
    rows,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
  };
};

export default useMonthlySummary;
