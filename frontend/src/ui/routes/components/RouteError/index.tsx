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
    <div className="flex h-full items-center justify-center bg-background p-8">
      <section className="card flex w-full max-w-xl flex-col items-center gap-6 bg-surface p-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-error/10 text-error">
          <FontAwesomeIcon icon={faTriangleExclamation} className="text-4xl" />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-text-secondary">
            Error {status}
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-text-primary">
            {title}
          </h1>

          <p className="mt-3 text-text-secondary">{description}</p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={goBack}
            textSize="text-base"
            variant="background"
            className="flex items-center gap-2 border border-text-secondary/10"
          >
            <FontAwesomeIcon icon={faArrowRotateLeft} />
            Go back
          </Button>
          <Button
            onClick={goHome}
            textSize="text-base"
            className="flex items-center gap-2 text-white transition-opacity"
          >
            <FontAwesomeIcon icon={faHouse} />
            {homeLabel}
          </Button>
        </div>

        <p className="text-xs text-text-secondary">
          If this problem persists, please try again later.
        </p>
      </section>
    </div>
  );
};

export default RouteError;
