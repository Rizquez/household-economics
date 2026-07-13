import type { MonthlySummaryProps } from "./types";

const MonthlySummary = ({ rows }: MonthlySummaryProps) => {
  const totals = rows.reduce(
    (accumulator, row) => ({
      budget: accumulator.budget + row.budget,
      expenses: accumulator.expenses + row.expenses,
      income: accumulator.income + row.income,
    }),
    {
      budget: 0,
      expenses: 0,
      income: 0,
    },
  );

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-surface">
      <div className="border-b border-text-secondary/10 bg-background p-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Monthly summary
        </h2>
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
            {!rows.length && (
              <tr>
                <td
                  colSpan={4}
                  className="border-t border-text-secondary/10 px-4 py-8 text-center text-text-secondary"
                >
                  No annual budget categories found for this period.
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr
                key={row.categoryId}
                className="border-t border-text-secondary/10"
              >
                <td className="px-4 py-3 font-medium text-text-primary">
                  {row.categoryName}
                </td>

                <td className="px-4 py-3 text-right text-text-primary">
                  {row.budget.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-right text-text-primary">
                  {row.expenses.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-right text-text-primary">
                  {row.income.toFixed(2)}
                </td>

                <td
                  className={`px-3 py-3 text-right font-semibold ${
                    row.difference >= 0 ? "text-success" : "text-error"
                  }`}
                >
                  {row.difference.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
              <tr className="border-t border-text-secondary/10 bg-background font-semibold">
                <td className="sticky bottom-0 bg-background px-4 py-3 text-text-primary">
                  Total
                </td>

                <td className="sticky bottom-0 bg-background px-4 py-3 text-right text-text-primary">
                  {totals.budget.toFixed(2)}
                </td>

                <td className="sticky bottom-0 bg-background px-4 py-3 text-right text-text-primary">
                  {totals.expenses.toFixed(2)}
                </td>

                <td className="sticky bottom-0 bg-background px-4 py-3 text-right text-text-primary">
                  {totals.income.toFixed(2)}
                </td>

                <td className="sticky bottom-0 bg-background px-4 py-3 text-right text-text-primary"></td>
              </tr>
            </tfoot>
        </table>
      </div>
    </section>
  );
};

export default MonthlySummary;
