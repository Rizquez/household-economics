import type { BudgetGroup } from "@/core/business/annual-budget/types";

export const getMonthLabel = (month: number) =>
  new Intl.DateTimeFormat("en", { month: "short" }).format(
    new Date(2000, month - 1, 1),
  );

export const getMonthlyTotals = (
  months: number[],
  budgetGroups: BudgetGroup[],
) =>
  months.reduce<Record<number, number>>((totals, month) => {
    totals[month] = budgetGroups.reduce((sum, budgetGroup) => {
      const budget = budgetGroup.budgets.find((item) => item.month === month);
      return sum + (budget?.amount ?? 0);
    }, 0);

    return totals;
  }, {});

export const getMonths = (budgetGroups: BudgetGroup[]) =>
  Array.from(
    new Set(
      budgetGroups.flatMap((budgetGroup) =>
        budgetGroup.budgets.map((budget) => budget.month),
      ),
    ),
  ).sort((a, b) => a - b);
