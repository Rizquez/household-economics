import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIncome } from "@/core/business/daily-register/income/services";
import { updateExpense } from "@/core/business/daily-register/expense/services";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import { MONTHLY_TRACKING_QUERY_KEY } from "@/ui/pages/MonthlyTracking/hooks/constants";
import { SAVINGS_INVESTMENTS_QUERY_KEY } from "@/ui/pages/SavingsInvestments/hooks/constants";
import type { UpdateIncomeRequest } from "@/core/business/daily-register/income/types";
import type { UpdateExpenseRequest } from "@/core/business/daily-register/expense/types";

type UpdateDailyRegisterPayload =
  | {
      type: "Income";
      payload: UpdateIncomeRequest;
    }
  | {
      type: "Expenses";
      payload: UpdateExpenseRequest;
    };


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
        title: "Update record",
        message: error.message,
      });
    },
  });
};

export default useUpdateDailyRegister;
