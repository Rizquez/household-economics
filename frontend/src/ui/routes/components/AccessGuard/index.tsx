import useCurrentUser from "./hooks/useCurrentUser";
import PendingAccess from "../PendingAccess";
import type { AccessGuardProps } from "./types";
import useVerifyModal from "./hooks/useVerifyModal";
import AccessError from "../AccessError";

const AccessGuard = ({ children }: AccessGuardProps) => {
  const { currentUser, isPending, isError, error } = useCurrentUser();

  useVerifyModal(isPending);

  if (isPending) return null;

  if (isError) {
    return <AccessError message={error.message} />;
  }

  if (!currentUser?.accessAllowed) {
    return <PendingAccess />;
  }

  return children;
};

export default AccessGuard;
