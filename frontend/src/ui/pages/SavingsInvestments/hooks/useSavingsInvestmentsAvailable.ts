import { useQuery } from "@tanstack/react-query";
import { getSavingsInvestmentsAvailableAmount } from "@/core/business/savings-investments/services";
import { SAVINGS_INVESTMENTS_QUERY_KEY, SAVINGS_INVESTMENT_AVAILABLE_QUERY_KEY } from "./constants";

const useSavingsInvestmentsAvailable = (month: number, year: number) => {
  const query = useQuery({
    queryKey: [
      SAVINGS_INVESTMENTS_QUERY_KEY,
      SAVINGS_INVESTMENT_AVAILABLE_QUERY_KEY,
      year,
      month,
    ],
    queryFn: () => getSavingsInvestmentsAvailableAmount.execute(month, year),
    enabled: month >= 1 && month <= 12 && year >= 1,
  });

  return {
    ...query,
    availableAmount: query.data?.availableAmount ?? 0,
  };
};

export default useSavingsInvestmentsAvailable;
