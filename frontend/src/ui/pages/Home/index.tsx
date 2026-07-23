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
    <main className="flex h-full items-center justify-center bg-background px-8">
      <section className="card flex w-full max-w-5xl overflow-hidden bg-surface">
        <div className="flex flex-1 flex-col justify-center p-14">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Household Economics
          </span>

          <h1 className="mt-5 text-5xl font-bold leading-tight text-text-primary">
            Organize your family&apos;s finances in one place.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
            Keep track of your income and expenses, plan annual budgets, monitor
            your monthly progress, and grow your family&apos;s savings and
            investments, all in one simple place.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <SignInButton mode="modal" forceRedirectUrl={paths.dashboard.href}>
              <Button
                textSize="text-base"
                className="flex items-center gap-3 font-medium transition-all hover:scale-[1.02]"
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
