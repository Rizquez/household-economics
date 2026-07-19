import { useEffect } from "react";

import useFamilyUser from "@/ui/components/Sidebar/hooks/useFamilyUser";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";

const useFamilyManagementPage = () => {
  const { family, isPending, isError, error } = useFamilyUser();

  const { showLoading, showModal, closeModal } = useModal();

  useEffect(() => {
    if (isPending) {
      showLoading("Loading family", "Please wait...");
      return;
    }

    if (isError) {
      showModal({
        type: "error",
        title: "Error loading family",
        message: error?.message ?? "Unexpected error",
      });

      return;
    }

    closeModal();
  }, [isPending, isError, error, showLoading, showModal, closeModal]);

  return {
    family,
    isReady: !isPending && !isError,
  };
};

export default useFamilyManagementPage;
