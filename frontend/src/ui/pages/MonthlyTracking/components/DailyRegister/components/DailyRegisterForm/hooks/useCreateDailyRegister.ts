import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createIncome } from "@/core/business/daily-register/income/services";
import { createExpense } from "@/core/business/daily-register/expense/services";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import { MONTHLY_TRACKING_QUERY_KEY } from "@/ui/pages/MonthlyTracking/hooks/constants";
import type { CreateDailyRegisterPayload } from "./types";
import { SAVINGS_INVESTMENTS_QUERY_KEY } from "@/ui/pages/SavingsInvestments/hooks/constants";

const useCreateDailyRegister = () => {
  const queryClient = useQueryClient();
  const { showLoading, showModal, closeModal } = useModal();

  return useMutation({
    mutationFn: ({ type, payload }: CreateDailyRegisterPayload) => {
      if (type === "Income") {
        return createIncome.execute(payload);
      }

      return createExpense.execute(payload);
    },

    onMutate: () => {
      showLoading("Creating record", "Please wait...");
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
        title: "Create daily register",
        message: error.message,
      });
    },
  });
};

export default useCreateDailyRegister;
