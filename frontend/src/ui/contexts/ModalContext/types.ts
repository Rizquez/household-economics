type ModalType = "info" | "success" | "warning" | "error" | "loading";

export type ModalState = {
  open: boolean;
  type: ModalType;
  title: string;
  message: string;
  hasButton: boolean;
};

export type ShowModalPayload = {
  type?: ModalType;
  title: string;
  message: string;
  hasButton?: boolean;
};

export type ModalContextValue = {
  modal: ModalState;
  showModal: (payload: ShowModalPayload) => void;
  showLoading: (title?: string, message?: string) => void;
  closeModal: () => void;
};
