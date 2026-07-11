import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateIncome } from "@/core/business/daily-register/income/services";
import { updateExpense } from "@/core/business/daily-register/expense/services";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import { MONTHLY_TRACKING_QUERY_KEY } from "@/ui/pages/MonthlyTracking/hooks/constants";
import type { UpdateDailyRegisterPayload } from "./types";

const useUpdateDailyRegister = () => {
  const queryClient = useQueryClient();
  const { showLoading, showModal, closeModal } = useModal();

  return useMutation({
    mutationFn: ({ type, payload }: UpdateDailyRegisterPayload) => {
      if (type === "Income") {
        return updateIncome.execute(payload);
      }

      return updateExpense.execute(payload);
    },

    onMutate: () => {
      showLoading("Updating record", "Please wait...");
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
        title: "Update record",
        message: error.message,
      });
    },
  });
};

export default useUpdateDailyRegister;
