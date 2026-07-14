import type { DashboardAllocationProps } from "./types";

const DashboardAllocation = ({ allocation }: DashboardAllocationProps) => {
  if (!allocation.hasAllocation) {
    return (
      <section className="flex min-h-64 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
        <div className="border-b border-text-secondary/10 p-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Monthly allocation
          </h2>

          <p className="text-sm text-text-secondary">
            Review how the available balance was distributed.
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-center text-sm text-text-secondary">
            No savings or investment allocation found for this period.
          </p>
        </div>
      </section>
    );
  }

  const assigned = allocation.savings + allocation.investments;

  return (
    <section className="flex min-h-64 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
      <div className="border-b border-text-secondary/10 p-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Monthly allocation
        </h2>

        <p className="text-sm text-text-secondary">
          Review how the available balance was distributed.
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-1 rounded-xl bg-surface p-4">
            <span className="text-sm text-text-secondary">Savings</span>

            <span className="text-xl font-semibold text-success">
              {allocation.savings.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col gap-1 rounded-xl bg-surface p-4">
            <span className="text-sm text-text-secondary">Investments</span>

            <span className="text-xl font-semibold text-primary">
              {allocation.investments.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col gap-1 rounded-xl bg-surface p-4">
            <span className="text-sm text-text-secondary">Remaining</span>

            <span
              className={`text-xl font-semibold ${
                allocation.remaining >= 0 ? "text-success" : "text-error"
              }`}
            >
              {allocation.remaining.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-text-secondary/10 pt-4">
          <span className="text-sm text-text-secondary">Total assigned</span>

          <span className="text-lg font-semibold text-text-primary">
            {assigned.toFixed(2)}
          </span>
        </div>
      </div>
    </section>
  );
};

export default DashboardAllocation;
