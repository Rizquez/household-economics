import { useQuery } from "@tanstack/react-query";

import { getBudgetYears } from "@/core/business/annual-budget/services";
import { ANNUAL_BUDGET_QUERY_KEY, YEARS_QUERY_KEY } from "./constants";

const useBudgetYears = () => {
  const query = useQuery({
    queryKey: [ANNUAL_BUDGET_QUERY_KEY, YEARS_QUERY_KEY],
    queryFn: () => getBudgetYears.execute(),
  });

  return {
    ...query,
    years: query.data ?? [],
  };
};

export default useBudgetYears;
