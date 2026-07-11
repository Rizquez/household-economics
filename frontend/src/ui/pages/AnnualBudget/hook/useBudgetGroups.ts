import { useQuery } from "@tanstack/react-query";

import { getBudgetGroups } from "@/core/business/annual-budget/services";
import { ANNUAL_BUDGET_QUERY_KEY } from "./constants";

const useBudgetGroups = (year: string) => {
  const numericYear = Number(year);

  const query = useQuery({
    queryKey: [ANNUAL_BUDGET_QUERY_KEY, numericYear],
    queryFn: () => getBudgetGroups.execute(numericYear),
    enabled: numericYear >= 1,
  });

  return {
    ...query,
    budgetGroups: query.data ?? [],
  };
};

export default useBudgetGroups;
