import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBudgetGroupFromCategory } from "@/core/business/annual-budget/services";
import { CATEGORIES_QUERY_KEY } from "./constants";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";

const useCreateBudgetGroupFromCategory = () => {
  const queryClient = useQueryClient();
  const { showLoading, showModal, closeModal } = useModal();

  return useMutation({
    mutationFn: (categoryId: number) =>
      createBudgetGroupFromCategory.execute(categoryId),

    onMutate: () => {
      showLoading("Exporting category", "Please wait...");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [CATEGORIES_QUERY_KEY],
      });

      closeModal();
    },

    onError: (error) => {
      showModal({
        type: "error",
        title: "Export category",
        message: error.message,
      });
    },
  });
};

export default useCreateBudgetGroupFromCategory;
