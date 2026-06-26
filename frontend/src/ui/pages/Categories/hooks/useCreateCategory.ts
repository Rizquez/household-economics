import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCategory } from "@/core/business/categories/services";
import type { CreateCategoryRequest } from "@/core/business/categories/types";
import { CATEGORIES_QUERY_KEY } from "./constants/keys";

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryRequest) =>
      createCategory.execute(payload),

    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: [CATEGORIES_QUERY_KEY, payload.recordTypeId],
      });
    },
  });
};

export default useCreateCategory;