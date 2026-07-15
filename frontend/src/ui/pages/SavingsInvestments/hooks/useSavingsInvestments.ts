import { useQuery } from "@tanstack/react-query";

import { getSavingsInvestments } from "@/core/business/savings-investments/services";
import {
  SAVINGS_INVESTMENTS_QUERY_KEY,
  SAVINGS_INVESTMENT_QUERY_KEY,
} from "./constants";

const useSavingsInvestments = (month: number, year: number) => {
  const query = useQuery({
    queryKey: [
      SAVINGS_INVESTMENTS_QUERY_KEY,
      SAVINGS_INVESTMENT_QUERY_KEY,
      year,
      month,
    ],
    queryFn: () => getSavingsInvestments.execute(month, year),
    enabled: month >= 1 && month <= 12 && year >= 1,
  });

  return {
    ...query,
    savingsInvestment: query.data ?? null,
  };
};

export default useSavingsInvestments;
