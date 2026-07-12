import { getFamily } from "@/core/business/family/services";
import { useQuery } from "@tanstack/react-query";
import { FAMILY_QUERY_KEY } from "./constants";

const useFamilyUser = () => {
  const query = useQuery({
    queryKey: [FAMILY_QUERY_KEY],
    queryFn: () => getFamily.execute(),
  });

  return {
    ...query,
    family: query.data,
  };
};

export default useFamilyUser;
