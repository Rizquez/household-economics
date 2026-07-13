import { useQueries } from "@tanstack/react-query";

import { listIncomesByMonthAndYear } from "@/core/business/daily-register/income/services";
import { listExpensesByMonthAndYear } from "@/core/business/daily-register/expense/services";
import { MONTHLY_TRACKING_QUERY_KEY } from "./constants";

const useMonthlyRecords = (month: number, year: number) => {
  const [incomeQuery, expenseQuery] = useQueries({
    queries: [
      {
        queryKey: [MONTHLY_TRACKING_QUERY_KEY, "income", year, month],
        queryFn: () => listIncomesByMonthAndYear.execute(month, year),
        enabled: month >= 1 && year >= 1,
      },
      {
        queryKey: [MONTHLY_TRACKING_QUERY_KEY, "expense", year, month],
        queryFn: () => listExpensesByMonthAndYear.execute(month, year),
        enabled: month >= 1 && year >= 1,
      },
    ],
  });

  return {
    incomes: incomeQuery.data ?? [],
    expenses: expenseQuery.data ?? [],

    isPending: incomeQuery.isPending || expenseQuery.isPending,

    isError: incomeQuery.isError || expenseQuery.isError,
    error: incomeQuery.error ?? expenseQuery.error,
  };
};

export default useMonthlyRecords;
