import { useEffect } from "react";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";

const useVerifyModal = (isPending: boolean) => {
  const { showLoading } = useModal();

  useEffect(() => {
    if (!isPending) return;

    showLoading(
      "Verifying your credentials",
      "You will be able to access the app shortly; please wait...",
    );
      
  }, [isPending, showLoading]);
};

export default useVerifyModal;