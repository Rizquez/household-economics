import { useQuery } from "@tanstack/react-query";

import { getMonthlyTrackingPeriods } from "@/core/business/monthly-tracking/services";
import { MONTHLY_TRACKING_QUERY_KEY } from "./constants";

const useMonthlyTrackingPeriods = () => {
  const query = useQuery({
    queryKey: [MONTHLY_TRACKING_QUERY_KEY, "periods"],
    queryFn: () => getMonthlyTrackingPeriods.execute(),
  });

  return {
    ...query,
    periods: query.data ?? [],
  };
};

export default useMonthlyTrackingPeriods;
