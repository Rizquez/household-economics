import { useEffect } from "react";
import { UserButton } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHouseLock } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";

const PendingAccess = () => {
  const { closeModal } = useModal();

  useEffect(() => {
    closeModal();
  }, [closeModal]);

  return (
    <div className="flex h-full min-h-0 items-start justify-center overflow-y-auto bg-background p-4 sm:p-8">
      <section className="card my-auto flex w-full max-w-xl flex-col items-center gap-5 bg-surface p-6 text-center sm:gap-6 sm:p-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-20 sm:w-20">
          <FontAwesomeIcon
            icon={faHouseLock}
            className="text-3xl sm:text-4xl"
          />
        </div>

        <div className="w-full min-w-0">
          <p className="max-w-full wrap-break-word text-sm font-semibold uppercase tracking-widest text-text-secondary">
            Access pending
          </p>

          <h1 className="mt-2 wrap-break-word text-2xl font-semibold text-text-primary sm:text-3xl">
            Your registration is under review
          </h1>

          <p className="mt-3 wrap-break-word text-text-secondary">
            Your account has been created successfully. Access to Household
            Economics is pending approval. You will receive a response soon.
          </p>
        </div>

        <div className="flex w-full items-start gap-3 rounded-xl bg-background px-4 py-3 text-left text-sm text-text-secondary sm:w-auto sm:items-center sm:px-5 sm:py-4 sm:text-center">
          <FontAwesomeIcon icon={faClock} className="shrink-0 text-primary" />
          <span className="min-w-0 wrap-break-word">
            Waiting for administrator approval.
          </span>
        </div>

        <UserButton />
      </section>
    </div>
  );
};

export default PendingAccess;
