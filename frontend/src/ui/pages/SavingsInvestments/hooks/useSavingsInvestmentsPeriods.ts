import { useQuery } from "@tanstack/react-query";

import { getMonthlyTrackingPeriods } from "@/core/business/monthly-tracking/services";
import {
  SAVINGS_INVESTMENTS_PERIODS_QUERY_KEY,
  SAVINGS_INVESTMENTS_QUERY_KEY,
} from "./constants";

const useSavingsInvestmentsPeriods = () => {
  const query = useQuery({
    queryKey: [
      SAVINGS_INVESTMENTS_QUERY_KEY,
      SAVINGS_INVESTMENTS_PERIODS_QUERY_KEY,
    ],
    queryFn: () =>
      getMonthlyTrackingPeriods.execute(),
  });

  return {
    ...query,
    periods: query.data ?? [],
  };
};

export default useSavingsInvestmentsPeriods;