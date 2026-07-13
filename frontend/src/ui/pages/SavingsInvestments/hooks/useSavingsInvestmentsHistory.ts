import { useQuery } from "@tanstack/react-query";

import { getSavingsInvestmentsByYear } from "@/core/business/savings-investments/services";
import {
  SAVINGS_INVESTMENTS_HISTORY_QUERY_KEY,
  SAVINGS_INVESTMENTS_QUERY_KEY,
} from "./constants";

const useSavingsInvestmentsHistory = (
  year: number,
) => {
  const query = useQuery({
    queryKey: [
      SAVINGS_INVESTMENTS_QUERY_KEY,
      SAVINGS_INVESTMENTS_HISTORY_QUERY_KEY,
      year,
    ],
    queryFn: () =>
      getSavingsInvestmentsByYear.execute(year),
    enabled: year >= 1,
  });

  return {
    ...query,
    history: query.data ?? [],
  };
};

export default useSavingsInvestmentsHistory;