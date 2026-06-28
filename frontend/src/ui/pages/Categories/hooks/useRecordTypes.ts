import { useQuery } from "@tanstack/react-query";

import { listRecordTypes } from "@/core/business/record-type/services";
import { RECORD_TYPES_QUERY_KEY } from "./keys";

const useRecordTypes = () => {
  const query = useQuery({
    queryKey: [RECORD_TYPES_QUERY_KEY],
    queryFn: () => listRecordTypes.execute(),
  });

  const recordTypes = query.data ?? [];

  return {
    ...query,
    recordTypes,
  };
};

export default useRecordTypes;
