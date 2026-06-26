import { useQuery } from "@tanstack/react-query";

import { listRecordTypes } from "@/core/business/record-types/services";

const QUERY_KEY = "record-types.list";

const useRecordTypes = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => listRecordTypes.execute(),
  });

  const recordTypes = query.data ?? [];

  return {
    ...query,
    recordTypes,
  };
};

export default useRecordTypes;
