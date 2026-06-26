import { useCallback, useMemo, useState, type ReactNode } from "react";

import type { ModalState, ShowModalPayload } from "./types";
import { initialState } from "./constants";
import { ModalContext } from "./context";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalState>(initialState);

  const showModal = useCallback((payload: ShowModalPayload) => {
    setModal({
      open: true,
      type: payload.type ?? "info",
      title: payload.title,
      message: payload.message,
      hasButton: payload.hasButton ?? true,
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
    setModal(initialState);
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
