import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import type { AccessErrorProps } from "./types";

const AccessError = ({ message }: AccessErrorProps) => {
  const { closeModal } = useModal();

  useEffect(() => {
    closeModal();
  }, [closeModal]);

  return (
    <div className="flex h-full items-center justify-center bg-background p-8">
      <section className="card flex w-full max-w-xl flex-col items-center gap-6 bg-surface p-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-error/10 text-error">
          <FontAwesomeIcon icon={faTriangleExclamation} className="text-4xl" />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-text-secondary">
            Verification failed
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-text-primary">
            Unable to verify your access
          </h1>

          <p className="mt-3 text-text-secondary">
            We couldn't verify your account at this time. Please try again in a
            few moments. If the problem persists, contact an administrator.
          </p>
        </div>

        <div className="w-full rounded-xl bg-background px-5 py-4 text-sm text-error">
          {message}
        </div>
      </section>
    </div>
  );
};

export default AccessError;
