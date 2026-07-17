import type { BudgetStatus } from "../types";

const getBudgetStatusChartData = (budgetStatus: BudgetStatus) =>
  [...budgetStatus]
    .sort((first, second) => {
      const firstIsExceeded = first.available < 0;
      const secondIsExceeded = second.available < 0;

      if (firstIsExceeded !== secondIsExceeded) {
        return firstIsExceeded ? -1 : 1;
      }

      const firstUsage =
        first.budget > 0 ? first.expenses / first.budget : 0;

      const secondUsage =
        second.budget > 0 ? second.expenses / second.budget : 0;

      return secondUsage - firstUsage;
    })
    .slice(0, 5)
    .map((category) => ({
      categoryName: category.categoryName,
      budget: category.budget,
      netUsed: category.expenses - category.income,
      expenses: category.expenses,
      income: category.income,
      available: category.available,
    }));

export default getBudgetStatusChartData;