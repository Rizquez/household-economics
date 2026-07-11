import { useEffect } from "react";

import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import useFamilyUser from "./useFamilyUser";

const useSidebar = () => {
  const { showLoading, showModal, closeModal } = useModal();

  const {
    family,
    isPending: isLoadingFamily,
    isError: isFamilyError,
    error: familyError,
  } = useFamilyUser();

  useEffect(() => {
    if (isLoadingFamily) {
      showLoading("Loading family", "Please wait...");
      return;
    }

    if (isFamilyError) {
      showModal({
        type: "error",
        title: "Error loading family",
        message: familyError?.message ?? "Unexpected error",
      });
      return;
    }

    closeModal();
  }, [
    isLoadingFamily,
    isFamilyError,
    familyError,
    showLoading,
    showModal,
    closeModal,
  ]);

  return {
    family,
    isReady: !isLoadingFamily && !isFamilyError && family !== undefined,
  };
};

export default useSidebar;