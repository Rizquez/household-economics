import type { ModalState } from "./types";

export const initialState: ModalState = {
  open: false,
  type: "info",
  title: "",
  message: "",
  hasButton: true,
};
