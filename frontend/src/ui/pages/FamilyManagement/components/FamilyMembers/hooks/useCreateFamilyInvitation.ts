import { useMutation } from "@tanstack/react-query";
import { createFamilyInvitation } from "@/core/business/family/services";
import type { CreateFamilyInvitationRequest } from "@/core/business/family/types";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";

const useCreateFamilyInvitation = () => {
  const { showLoading, showModal, closeModal } = useModal();

  return useMutation({
    mutationFn: (payload: CreateFamilyInvitationRequest) =>
      createFamilyInvitation.execute(payload),

    onMutate: () => {
      showLoading("Sending invitation", "Please wait...");
    },

    onSuccess: () => {
      closeModal();

      showModal({
        type: "success",
        title: "Invitation sent",
        message: "The family invitation was sent successfully.",
      });
    },

    onError: (error) => {
      showModal({
        type: "error",
        title: "Send invitation",
        message: error.message,
      });
    },
  });
};

export default useCreateFamilyInvitation;
