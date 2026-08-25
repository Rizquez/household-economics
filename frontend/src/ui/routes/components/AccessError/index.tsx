import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import type { AccessErrorProps } from "./types";
import { useNavigate } from "react-router";
import { paths } from "@/ui/routes/paths";
import Button from "@/ui/components/Button";

const AccessError = ({ message }: AccessErrorProps) => {
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const goHome = () => {
    navigate(paths.home.href, {
      replace: true,
    });
  };

  useEffect(() => {
    closeModal();
  }, [closeModal]);

  return (
    <div className="flex h-full min-h-0 items-start justify-center overflow-y-auto bg-background p-4 sm:p-8">
      <section className="card my-auto flex w-full max-w-xl flex-col items-center gap-5 bg-surface p-6 text-center sm:gap-6 sm:p-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error sm:h-20 sm:w-20">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-3xl sm:text-4xl"
          />
        </div>

        <div className="w-full min-w-0">
          <p className="max-w-full wrap-break-word text-sm font-semibold uppercase tracking-widest text-text-secondary">
            Verification failed
          </p>

          <h1 className="mt-2 wrap-break-word text-2xl font-semibold text-text-primary sm:text-3xl">
            Unable to verify your access
          </h1>

          <p className="mt-3 wrap-break-word text-text-secondary">
            We couldn&apos;t verify your account at this time. Please try again
            in a few moments. If the problem persists, contact an administrator.
          </p>
        </div>

        <div className="w-full wrap-break-word rounded-xl bg-background px-4 py-3 text-sm text-error sm:px-5 sm:py-4">
          {message}
        </div>

        <div className="flex w-full gap-3 sm:w-auto">
          <Button
            onClick={goHome}
            textSize="text-base"
            className="flex w-full items-center justify-center gap-2 sm:w-auto"
          >
            <FontAwesomeIcon icon={faHouse} />
            {"Home"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AccessError;
