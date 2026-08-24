import Button from "@/ui/components/Button";
import type { NoteModalProps } from "../../types";

const NoteModal = ({ note, onClose }: NoteModalProps) => {
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 p-3 md:p-6">
      <div className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-lg flex-col rounded-xl bg-surface p-4 shadow-xl md:max-h-[70vh] md:p-6">
        <h2 className="text-lg font-semibold text-text-primary">Note</h2>

        <p className="mt-4 overflow-y-auto whitespace-pre-wrap text-sm text-text-primary">
          {note}
        </p>

        <div className="mt-6 flex justify-end">
          <Button className="w-full sm:w-auto" onClick={onClose}>
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
