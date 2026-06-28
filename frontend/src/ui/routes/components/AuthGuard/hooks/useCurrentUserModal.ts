import { useEffect } from "react";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";

const useCurrentUserModal = (isPending: boolean) => {
  const { showLoading, closeModal } = useModal();

  useEffect(() => {
    if (isPending) {
      showLoading(
        "Verifying your credentials",
        "You will be able to access the app shortly; please wait...",
      );
      return;
    }

    closeModal();
  }, [isPending, showLoading, closeModal]);
};

export default useCurrentUserModal;
