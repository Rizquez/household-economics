import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/core/business/category/services";
import type { CreateCategoryRequest } from "@/core/business/category/types";
import { CATEGORIES_QUERY_KEY } from "../../../hooks/constants";

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryRequest) =>
      createCategory.execute(payload),

    onSuccess: async (_, payload) => {
      void queryClient.invalidateQueries({
        queryKey: [CATEGORIES_QUERY_KEY, payload.recordTypeId],
      });
    },
  });
};

export default useCreateCategory;
