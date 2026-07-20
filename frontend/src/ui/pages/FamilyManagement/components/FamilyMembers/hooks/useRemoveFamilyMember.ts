import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFamilyMember } from "@/core/business/family/services";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import { FAMILY_MEMBERS_QUERY_KEY } from "../../../hooks/constants";

const useRemoveFamilyMember = () => {
  const queryClient = useQueryClient();
  const { showLoading, showModal, closeModal } = useModal();

  return useMutation({
    mutationFn: (userId: number) => removeFamilyMember.execute(userId),

    onMutate: () => {
      showLoading("Removing family member", "Please wait...");
    },

    onSuccess: async () => {
      closeModal();

      void queryClient.invalidateQueries({
        queryKey: [FAMILY_MEMBERS_QUERY_KEY],
      });
    },

    onError: (error) => {
      showModal({
        type: "error",
        title: "Remove family member",
        message: error.message,
      });
    },
  });
};

export default useRemoveFamilyMember;
