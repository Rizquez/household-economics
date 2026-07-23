import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateFamily } from "@/core/business/family/services";
import type { UpdateFamilyRequest } from "@/core/business/family/types";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import { FAMILY_QUERY_KEY } from "@/ui/hooks/constants";

const useUpdateFamilyInformation = () => {
  const queryClient = useQueryClient();
  const { showLoading, showModal, closeModal } = useModal();

  return useMutation({
    mutationFn: (payload: UpdateFamilyRequest) => updateFamily.execute(payload),

    onMutate: () => {
      showLoading("Updating family", "Please wait...");
    },

    onSuccess: async () => {
      closeModal();

      void queryClient.invalidateQueries({
        queryKey: [FAMILY_QUERY_KEY],
      });
    },

    onError: (error) => {
      showModal({
        type: "error",
        title: "Update family",
        message: error.message,
      });
    },
  });
};

export default useUpdateFamilyInformation;
