import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ModalContextValue, ModalState, ShowModalPayload } from "./types";
import { initialState } from "./constants";
import ApplicationError from "@/core/errors";

const ModalContext = createContext<ModalContextValue | null>(null);

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

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new ApplicationError("useModal must be used inside ModalProvider");
  }

  return context;
};