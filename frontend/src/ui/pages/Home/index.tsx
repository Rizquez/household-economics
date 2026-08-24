import { SignInButton, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faChartPie,
  faWallet,
  faPiggyBank,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

import { paths } from "@/ui/routes/paths";
import FeatureCard from "@/ui/components/FeatureCard";
import Button from "@/ui/components/Button";

const Home = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Navigate to={paths.dashboard.href} replace />;
  }

  return (
    <main className="flex h-full min-h-0 items-start justify-center overflow-x-hidden overflow-y-auto bg-background px-3 py-3 sm:px-6 sm:py-6 lg:px-8">
      <section className="card my-auto flex w-full max-w-5xl flex-col overflow-hidden bg-surface lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-8 md:p-10 lg:p-14">
          <span className="max-w-full wrap-break-word text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Household Economics
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-text-primary sm:mt-5 sm:text-4xl lg:text-5xl">
            Organize your family&apos;s finances in one place.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary sm:mt-5 sm:text-lg sm:leading-8 lg:mt-6">
            Keep track of your income and expenses, plan annual budgets, monitor
            your monthly progress, and grow your family&apos;s savings and
            investments, all in one simple place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
            <SignInButton mode="modal" forceRedirectUrl={paths.dashboard.href}>
              <Button
                textSize="text-base"
                className="flex w-full items-center justify-center gap-3 font-medium transition-all hover:scale-[1.02] sm:w-auto"
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                Sign in
              </Button>
            </SignInButton>
          </div>
        </div>

        <div className="hidden w-105 flex-col justify-center gap-5 bg-background p-10 lg:flex">
          <FeatureCard
            icon={faChartPie}
            title="Dashboard"
            description="Get a quick overview of your family's financial health."
          />

          <FeatureCard
            icon={faWallet}
            title="Annual budgets"
            description="Plan your annual budgets month by month and adjust them according to your needs."
          />

          <FeatureCard
            icon={faPiggyBank}
            title="Savings and investments"
            description="Keep track of your goals, investments, and plans for the future."
          />

          <FeatureCard
            icon={faChartLine}
            title="Monthly tracking"
            description="Keep a detailed record of your expenses related to your budget, savings, and investments each month."
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
