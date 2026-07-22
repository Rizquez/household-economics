import { useQuery } from "@tanstack/react-query";
import { getCurrencyTypes } from "@/core/business/currency-type/services";
import { CURRENCY_TYPES_QUERY_KEY } from "./constants";

const useCurrencyTypes = () => {
  const query = useQuery({
    queryKey: [CURRENCY_TYPES_QUERY_KEY],
    queryFn: () => getCurrencyTypes.execute(),
  });

  return {
    ...query,
    currencyTypes: query.data ?? [],
  };
};

export default useCurrencyTypes;
