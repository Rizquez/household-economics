import { useEffect } from "react";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";

const SLOW_VERIFICATION_DELAY_MS = 10000;

const useVerifyModal = (isPending: boolean) => {
  const { showLoading } = useModal();

  useEffect(() => {
    if (!isPending) return;

    showLoading(
      "Verifying your credentials",
      "We're verifying your credentials; this usually takes just a few seconds...",
    );

    const timeoutId = window.setTimeout(() => {
      showLoading(
        "We're almost ready",
        "Our server may be coming back online after a period of inactivity; this may take up to one minute for the first request. Thank you for your patience...",
      );
    }, SLOW_VERIFICATION_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isPending, showLoading]);
};

export default useVerifyModal;