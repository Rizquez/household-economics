import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBudgetGroupFromCategory } from "@/core/business/annual-budget/services";
import { ANNUAL_BUDGET_QUERY_KEY } from "@/ui/pages/AnnualBudget/hook/constants";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import { CATEGORIES_QUERY_KEY } from "../../../hooks/constants";

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
      closeModal();

      void queryClient.invalidateQueries({
        queryKey: [CATEGORIES_QUERY_KEY],
      });

      void queryClient.invalidateQueries({
        queryKey: [ANNUAL_BUDGET_QUERY_KEY],
      });
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
