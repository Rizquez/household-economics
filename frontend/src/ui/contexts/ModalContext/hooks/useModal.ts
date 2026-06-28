import { useContext } from "react";

import ApplicationError from "@/core/errors";
import { ModalContext } from "../context";

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new ApplicationError("useModal must be used inside ModalProvider");
  }

  return context;
};
