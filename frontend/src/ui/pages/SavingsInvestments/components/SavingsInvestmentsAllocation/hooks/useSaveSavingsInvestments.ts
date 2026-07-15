import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createSavingsInvestments,
  updateSavingsInvestments,
} from "@/core/business/savings-investments/services";

import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";

import {
  SAVINGS_INVESTMENTS_HISTORY_QUERY_KEY,
  SAVINGS_INVESTMENTS_QUERY_KEY,
  SAVINGS_INVESTMENT_QUERY_KEY,
} from "../../../hooks/constants";
import type { SaveSavingsInvestmentRequest } from "./types";

const useSaveSavingsInvestments = () => {
  const queryClient = useQueryClient();
  const { showLoading, showModal, closeModal } = useModal();

  return useMutation({
    mutationFn: (request: SaveSavingsInvestmentRequest) => {
      if ("id" in request) {
        return updateSavingsInvestments.execute(request);
      }

      return createSavingsInvestments.execute(request);
    },

    onMutate: (request) => {
      showLoading(
        "id" in request ? "Updating allocation" : "Creating allocation",
        "Please wait...",
      );
    },

    onSuccess: async (savingsInvestment) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [
            SAVINGS_INVESTMENTS_QUERY_KEY,
            SAVINGS_INVESTMENT_QUERY_KEY,
            savingsInvestment.year,
            savingsInvestment.month,
          ],
        }),

        queryClient.invalidateQueries({
          queryKey: [
            SAVINGS_INVESTMENTS_QUERY_KEY,
            SAVINGS_INVESTMENTS_HISTORY_QUERY_KEY,
            savingsInvestment.year,
          ],
        }),
      ]);

      closeModal();
    },

    onError: (error) => {
      showModal({
        type: "error",
        title: "Savings and investments",
        message: error.message,
      });
    },
  });
};

export default useSaveSavingsInvestments;
