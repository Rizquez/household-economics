import { useQuery } from "@tanstack/react-query";
import { getFamilyMembers } from "@/core/business/family/services";
import { FAMILY_MEMBERS_QUERY_KEY } from "../../../hooks/constants";

const useFamilyMembers = () => {
  const query = useQuery({
    queryKey: [FAMILY_MEMBERS_QUERY_KEY],
    queryFn: () => getFamilyMembers.execute(),
  });

  return {
    ...query,
    familyMembers: query.data ?? [],
  };
};

export default useFamilyMembers;
