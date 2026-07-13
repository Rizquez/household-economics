import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteExpense } from "@/core/business/daily-register/expense/services";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import { MONTHLY_TRACKING_QUERY_KEY } from "../../../hooks/constants";
import { SAVINGS_INVESTMENTS_QUERY_KEY } from "@/ui/pages/SavingsInvestments/hooks/constants";

const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const { showLoading, showModal, closeModal } = useModal();

  return useMutation({
    mutationFn: (expenseId: number) => deleteExpense.execute(expenseId),

    onMutate: () => {
      showLoading("Deleting record", "Please wait...");
    },

    onSuccess: () => {
      closeModal();

      void Promise.all([
        queryClient.invalidateQueries({
          queryKey: [MONTHLY_TRACKING_QUERY_KEY],
        }),

        queryClient.invalidateQueries({
          queryKey: [SAVINGS_INVESTMENTS_QUERY_KEY],
        }),
      ]);
    },

    onError: (error) => {
      showModal({
        type: "error",
        title: "Delete expense",
        message: error.message,
      });
    },
  });
};

export default useDeleteExpense;
