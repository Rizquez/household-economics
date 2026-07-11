import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCategory } from "@/core/business/category/services";
import type { UpdateCategoryRequest } from "@/core/business/category/types";
import { CATEGORIES_QUERY_KEY } from "../../../hooks/constants";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";

const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { showLoading, showModal, closeModal } = useModal();

  return useMutation({
    mutationFn: (payload: UpdateCategoryRequest) =>
      updateCategory.execute(payload),

    onMutate: () => {
      showLoading("Updating category", "Please wait...");
    },

    onSuccess: async (_, payload) => {
      closeModal();

      void queryClient.invalidateQueries({
        queryKey: [CATEGORIES_QUERY_KEY, payload.recordTypeId],
      });
    },

    onError: (error) => {
      showModal({
        type: "error",
        title: "Update category",
        message: error.message,
      });
    },
  });
};

export default useUpdateCategory;
