import DashboardAlerts from "./components/DashboardAlerts";
import DashboardAllocation from "./components/DashboardAllocation";
import DashboardBudgetStatus from "./components/DashboardBudgetStatus";
import DashboardControls from "./components/DashboardControls";
import DashboardOverview from "./components/DashboardOverview";
import useDashboardPage from "./hooks/useDashboardPage";

const EMPTY_OVERVIEW = {
  income: 0,
  expenses: 0,
  available: 0,
  remaining: 0,
};

const EMPTY_ALLOCATION = {
  savings: 0,
  investments: 0,
  remaining: 0,
  hasAllocation: false,
};

const Dashboard = () => {
  const {
    selectedPeriod,
    periodOptions,
    dashboard,
    isReady,
    setSelectedPeriod,
  } = useDashboardPage();

  if (!isReady) return null;

  const overview = dashboard?.overview ?? EMPTY_OVERVIEW;

  const allocation = dashboard?.allocation ?? EMPTY_ALLOCATION;

  const budgetStatus = dashboard?.budgetStatus ?? [];

  return (
    <div className="flex h-full min-h-0 flex-col bg-surface p-6 card">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-text-primary">Dashboard</h1>

        <p className="text-sm text-text-secondary">
          Take a quick look at your family&apos;s finances for the selected
          month and year.
        </p>
      </header>

      <div className="py-6">
        <DashboardControls
          selectedPeriod={selectedPeriod}
          periodOptions={periodOptions}
          onPeriodChange={setSelectedPeriod}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6">
          <DashboardOverview overview={overview} />

          <div className="grid gap-4 xl:grid-cols-2">
            <DashboardAllocation allocation={allocation} />

            <DashboardAlerts
              overview={overview}
              allocation={allocation}
              budgetStatus={budgetStatus}
              previousMonthTransfer={dashboard?.previousMonthTransfer ?? null}
            />

            <div className="xl:col-span-2">
              <DashboardBudgetStatus budgetStatus={budgetStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
