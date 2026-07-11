import Button from "@/ui/components/Button";
import type { NoteModalProps } from "../../types";

const NoteModal = ({ note, onClose }: NoteModalProps) => {
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 p-6">
      <div className="flex max-h-[70vh] w-full max-w-lg flex-col rounded-xl bg-surface p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-text-primary">Note</h2>

        <p className="mt-4 overflow-y-auto whitespace-pre-wrap text-sm text-text-primary">
          {note}
        </p>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Ok</Button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
