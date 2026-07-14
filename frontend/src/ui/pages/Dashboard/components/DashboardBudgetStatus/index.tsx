import type { DashboardBudgetStatusProps } from "./types";

const DashboardBudgetStatus = ({
  budgetStatus,
}: DashboardBudgetStatusProps) => {
  if (!budgetStatus.length) {
    return (
      <section className="flex min-h-64 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
        <div className="border-b border-text-secondary/10 p-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Budget status by category
          </h2>

          <p className="text-sm text-text-secondary">
            Compare your monthly budget with your actual records.
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-center text-sm text-text-secondary">
            No budget information found for this period.
          </p>
        </div>
      </section>
    );
  }

  const visibleCategories = [...budgetStatus]
    .sort((first, second) => {
      const firstIsExceeded = first.available < 0;
      const secondIsExceeded = second.available < 0;

      if (firstIsExceeded !== secondIsExceeded) {
        return firstIsExceeded ? -1 : 1;
      }

      const firstUsage = first.budget > 0 ? first.expenses / first.budget : 0;

      const secondUsage =
        second.budget > 0 ? second.expenses / second.budget : 0;

      return secondUsage - firstUsage;
    })
    .slice(0, 5);

  return (
    <section className="flex min-h-64 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
      <div className="border-b border-text-secondary/10 p-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Budget status by category
        </h2>

        <p className="text-sm text-text-secondary">
          Compare your monthly budget with your actual records.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full border-collapse bg-surface text-sm">
          <thead className="sticky top-0 z-10 bg-background text-text-secondary">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Category</th>

              <th className="px-4 py-3 text-right font-medium">Budget</th>

              <th className="px-4 py-3 text-right font-medium">Expenses</th>

              <th className="px-4 py-3 text-right font-medium">Income</th>

              <th className="px-4 py-3 text-right font-medium">Available</th>
            </tr>
          </thead>

          <tbody>
            {visibleCategories.map((category) => (
              <tr
                key={category.categoryId}
                className="border-t border-text-secondary/10"
              >
                <td className="px-4 py-3 font-medium text-text-primary">
                  {category.categoryName}
                </td>

                <td className="px-4 py-3 text-right text-text-primary">
                  {category.budget.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-right text-text-primary">
                  {category.expenses.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-right text-text-primary">
                  {category.income.toFixed(2)}
                </td>

                <td
                  className={`px-4 py-3 text-right font-semibold ${
                    category.available >= 0 ? "text-success" : "text-error"
                  }`}
                >
                  {category.available.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DashboardBudgetStatus;
