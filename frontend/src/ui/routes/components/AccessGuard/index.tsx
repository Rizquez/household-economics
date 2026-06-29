import useCurrentUser from "./hooks/useCurrentUser";
import PendingAccess from "../PendingAccess";
import type { AccessGuardProps } from "./types";
import useVerifyModal from "./hooks/useVerifyModal";

const AccessGuard = ({ children }: AccessGuardProps) => {
  const { currentUser, isPending, isError, error } = useCurrentUser();

  useVerifyModal(isPending);

  if (isPending) return null;

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center bg-background p-8">
        <section className="card max-w-xl bg-surface p-10 text-center">
          <h1 className="text-2xl font-semibold text-text-primary">
            Unable to verify access
          </h1>
          <p className="mt-3 text-text-secondary">{error.message}</p>
        </section>
      </div>
    );
  }

  if (!currentUser?.accessAllowed) {
    return <PendingAccess />;
  }

  return children;
};

export default AccessGuard;
