import { useQuery } from "@tanstack/react-query";
import { getMonthlyTrackingPeriods } from "@/core/business/monthly-tracking/services";
import {
  SAVINGS_INVESTMENTS_PERIODS_QUERY_KEY,
  SAVINGS_INVESTMENTS_QUERY_KEY,
} from "../pages/SavingsInvestments/hooks/constants";
import {
  MONTHLY_TRACKING_QUERY_KEY,
  PERIODS_QUERY_KEY,
} from "../pages/MonthlyTracking/hooks/constants";
import { DASHBOARD_PERIODS_QUERY_KEY } from "../pages/Dashboard/hooks/constants";

const usePeriodsAvailable = () => {
  const query = useQuery({
    queryKey: [
      SAVINGS_INVESTMENTS_PERIODS_QUERY_KEY,
      SAVINGS_INVESTMENTS_QUERY_KEY,
      MONTHLY_TRACKING_QUERY_KEY,
      PERIODS_QUERY_KEY,
      DASHBOARD_PERIODS_QUERY_KEY,
    ],
    queryFn: () => getMonthlyTrackingPeriods.execute(),
  });
  return {
    ...query,
    periods: query.data ?? [],
  };
};

export default usePeriodsAvailable;
