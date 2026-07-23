import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { ModalState, ShowModalPayload } from "./types";
import { ModalContext } from "./context";

const INITIAL_STATE: ModalState = {
  open: false,
  type: "info",
  title: "",
  message: "",
  hasButton: true,
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalState>(INITIAL_STATE);

  const showModal = useCallback((payload: ShowModalPayload) => {
    setModal({
      open: true,
      type: payload.type ?? "info",
      title: payload.title,
      message: payload.message,
      hasButton: payload.hasButton ?? true,

      confirmText: payload.confirmText,
      cancelText: payload.cancelText,
      onConfirm: payload.onConfirm,
    });
  }, []);

  const showLoading = useCallback(
    (title = "Loading", message = "Please wait...") => {
      setModal({
        open: true,
        type: "loading",
        title,
        message,
        hasButton: false,
      });
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModal(INITIAL_STATE);
  }, []);

  const value = useMemo(
    () => ({
      modal,
      showModal,
      showLoading,
      closeModal,
    }),
    [modal, showModal, showLoading, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
