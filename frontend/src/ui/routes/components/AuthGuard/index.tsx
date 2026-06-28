import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import type { AuthGuardProps } from "./types";

const AuthGuard = ({ children }: AuthGuardProps) => (
  <>
    <SignedIn>{children}</SignedIn>

    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

export default AuthGuard;
