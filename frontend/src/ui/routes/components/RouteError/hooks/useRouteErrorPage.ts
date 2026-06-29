import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { paths } from "@/ui/routes/paths";

const useRouteErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const { isLoaded, isSignedIn } = useUser();

  const isRouteError = isRouteErrorResponse(error);

  const status = isRouteError ? error.status : 500;

  const title = isRouteError
    ? error.status === 404
      ? "Page not found"
      : "Something went wrong"
    : "Unexpected error";

  const description = isRouteError
    ? error.status === 404
      ? "The page you're looking for doesn't exist or may have been moved."
      : error.statusText
    : ((error as Error)?.message ?? "An unexpected error occurred.");

  const homeLabel = isSignedIn ? "Dashboard" : "Home";

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate(isSignedIn ? paths.dashboard.href : paths.home.href, {
      replace: true,
    });
  };

  return {
    isLoaded,
    status,
    title,
    description,
    homeLabel,
    goBack,
    goHome,
  };
};

export default useRouteErrorPage;