import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getBudgetGroups } from "@/core/business/annual-budget/services";
import { ANNUAL_BUDGET_QUERY_KEY } from "@/ui/pages/AnnualBudget/hook/constants";
import type { MonthlySummaryRow, UseMonthlySummaryParams } from "../types";

const useMonthlySummary = ({
  selectedPeriod,
  expenses,
  incomes
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

        const categoryName = budgetGroup.name.toLowerCase();

        const expensesTotal = expenses.reduce(
          (total, expense) => {
            if (expense.items.length > 0) {
              return (
                total +
                expense.items.reduce(
                  (itemsTotal, item) =>
                    item.categoryNormalizedName ===
                    categoryName
                      ? itemsTotal + item.amount
                      : itemsTotal,
                  0,
                )
              );
            }

            return expense.categoryNormalizedName ===
              categoryName
              ? total + expense.amount
              : total;
          },
          0,
        );

        const incomesTotal = incomes.reduce(
          (total, income) =>
            income.categoryNormalizedName ===
            categoryName
              ? total + income.amount
              : total,
          0,
        );

        return {
          categoryId: budgetGroup.categoryId,
          categoryName: budgetGroup.name,
          budget: monthlyBudget,
          expenses: expensesTotal,
          income: incomesTotal,
          difference:
            monthlyBudget - expensesTotal + incomesTotal,
        };
      }),
    [query.data, expenses, incomes, month],
  );

  return {
    rows,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
  };
};

export default useMonthlySummary;
