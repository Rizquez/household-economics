import { SignInButton, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

import { paths } from "@/ui/routes/paths";

// TODO: implement a real home page
const Home = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Navigate to={paths.dashboard.href} replace />;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <SignInButton mode="modal" forceRedirectUrl={paths.dashboard.href}>
        <button className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-opacity hover:opacity-90">
          Login
        </button>
      </SignInButton>
    </div>
  );
};

export default Home;
