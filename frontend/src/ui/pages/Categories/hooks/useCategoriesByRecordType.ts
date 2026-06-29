import { useQuery } from "@tanstack/react-query";

import { listCategories } from "@/core/business/category/services";
import { CATEGORIES_QUERY_KEY } from "./constants";

const useCategoriesByRecordType = (recordTypeId: number) => {
  const query = useQuery({
    queryKey: [CATEGORIES_QUERY_KEY, recordTypeId],
    queryFn: () => listCategories.execute(recordTypeId),
    enabled: recordTypeId >= 1,
  });

  return {
    ...query,
    categories: query.data ?? [],
  };
};

export default useCategoriesByRecordType;
