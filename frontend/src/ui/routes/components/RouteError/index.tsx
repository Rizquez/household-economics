import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowRotateLeft,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@clerk/clerk-react";
import { paths } from "@/ui/routes/paths";

const RouteError = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;

  const status = isRouteErrorResponse(error) ? error.status : 500;

  const title = isRouteErrorResponse(error)
    ? error.status === 404
      ? "Page not found"
      : "Something went wrong"
    : "Unexpected error";

  const description = isRouteErrorResponse(error)
    ? error.status === 404
      ? "The page you're looking for doesn't exist or may have been moved."
      : error.statusText
    : ((error as Error)?.message ?? "An unexpected error occurred.");

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
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-md border border-text-secondary/20 px-4 py-2 transition-colors hover:bg-background cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowRotateLeft} />
            Go back
          </button>

          <button
            onClick={() =>
              navigate(isSignedIn ? paths.dashboard.href : paths.home.href, {
                replace: true,
              })
            }
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white transition-opacity hover:opacity-90 cursor-pointer"
          >
            <FontAwesomeIcon icon={faHouse} />
            {isSignedIn ? "Dashboard" : "Home"}
          </button>
        </div>

        <p className="text-xs text-text-secondary">
          If this problem persists, please try again later.
        </p>
      </section>
    </div>
  );
};

export default RouteError;
