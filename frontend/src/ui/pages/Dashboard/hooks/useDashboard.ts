import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/core/business/dashboard/services";
import { DASHBOARD_QUERY_KEY } from "./constants";

const useDashboard = (month: number, year: number) => {
  const query = useQuery({
    queryKey: [DASHBOARD_QUERY_KEY, year, month],
    queryFn: () => getDashboard.execute(month, year),
    enabled: month >= 1 && year >= 1,
  });

  return {
    ...query,
    dashboard: query.data ?? null,
  };
};

export default useDashboard;
