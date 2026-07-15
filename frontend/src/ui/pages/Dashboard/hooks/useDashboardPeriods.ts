import { useQuery } from "@tanstack/react-query";
import { getMonthlyTrackingPeriods } from "@/core/business/monthly-tracking/services";
import { DASHBOARD_PERIODS_QUERY_KEY } from "./constants";

const useDashboardPeriods = () => {
  const query = useQuery({
    queryKey: [DASHBOARD_PERIODS_QUERY_KEY],
    queryFn: () => getMonthlyTrackingPeriods.execute(),
  });

  return {
    periods: query.data ?? [],
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
  };
};

export default useDashboardPeriods;
