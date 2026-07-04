import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBudgets } from "@/core/business/annual-budget/services";
import type { UpdateBudgetRequest } from "@/core/business/annual-budget/types";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import { ANNUAL_BUDGET_QUERY_KEY } from "./constants";

const useUpdateBudgets = () => {
  const queryClient = useQueryClient();
  const { showLoading, showModal, closeModal } = useModal();

  return useMutation({
    mutationFn: (payload: UpdateBudgetRequest[]) =>
      updateBudgets.execute(payload),

    onMutate: () => {
      showLoading("Updating annual budget", "Please wait...");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ANNUAL_BUDGET_QUERY_KEY],
      });

      closeModal();
    },

    onError: (error) => {
      showModal({
        type: "error",
        title: "Update annual budget",
        message: error.message,
      });
    },
  });
};

export default useUpdateBudgets;
