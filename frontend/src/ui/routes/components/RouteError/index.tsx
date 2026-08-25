import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowRotateLeft,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import useRouteErrorPage from "./hooks/useRouteErrorPage";
import Button from "@/ui/components/Button";

const RouteError = () => {
  const { isLoaded, status, title, description, homeLabel, goBack, goHome } =
    useRouteErrorPage();
  if (!isLoaded) return null;

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
            Error {status}
          </p>

          <h1 className="mt-2 wrap-break-word text-2xl font-semibold text-text-primary sm:text-3xl">
            {title}
          </h1>

          <p className="mt-3 wrap-break-word text-text-secondary">
            {description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            onClick={goBack}
            textSize="text-base"
            variant="background"
            className="flex w-full items-center justify-center gap-2 border border-text-secondary/10 sm:w-auto"
          >
            <FontAwesomeIcon icon={faArrowRotateLeft} />
            Go back
          </Button>
          <Button
            onClick={goHome}
            textSize="text-base"
            className="flex w-full items-center justify-center gap-2 text-white transition-opacity sm:w-auto"
          >
            <FontAwesomeIcon icon={faHouse} />
            {homeLabel}
          </Button>
        </div>

        <p className="max-w-full wrap-break-word text-xs text-text-secondary">
          If this problem persists, please try again later.
        </p>
      </section>
    </div>
  );
};

export default RouteError;
