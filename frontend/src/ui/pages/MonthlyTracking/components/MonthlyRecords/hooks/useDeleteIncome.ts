import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteIncome } from "@/core/business/daily-register/income/services";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import { MONTHLY_TRACKING_QUERY_KEY } from "../../../hooks/constants";

const useDeleteIncome = () => {
  const queryClient = useQueryClient();
  const { showLoading, showModal, closeModal } = useModal();

  return useMutation({
    mutationFn: (incomeId: number) => deleteIncome.execute(incomeId),

    onMutate: () => {
      showLoading("Deleting record", "Please wait...");
    },

    onSuccess: () => {
      closeModal();

      void queryClient.invalidateQueries({
        queryKey: [MONTHLY_TRACKING_QUERY_KEY],
      });
    },

    onError: (error) => {
      showModal({
        type: "error",
        title: "Delete income",
        message: error.message,
      });
    },
  });
};

export default useDeleteIncome;
