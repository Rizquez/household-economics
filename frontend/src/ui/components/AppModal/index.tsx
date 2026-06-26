import { useModal } from "@/ui/contexts/ModalContext";
import { typeStyles } from "./constants";
import Button from "../Button";


const AppModal = () => {
  const { modal, closeModal } = useModal();

  if (!modal.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/40 p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-5 rounded-2xl bg-surface p-8 text-center shadow-xl">
        <h2 className={`text-xl font-semibold ${typeStyles[modal.type]}`}>
          {modal.title}
        </h2>

        <p className="text-sm leading-6 text-text-secondary">{modal.message}</p>

        {modal.type === "loading" && (
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        )}

        {modal.hasButton && <Button onClick={closeModal}>OK</Button>}
      </div>
    </div>
  );
};

export default AppModal;
