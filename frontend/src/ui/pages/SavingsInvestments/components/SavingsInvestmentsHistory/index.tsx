import useSavingsInvestmentsHistory from "./hooks/useSavingsInvestmentsHistory";
import type { SavingsInvestmentsHistoryProps } from "./types";

const SavingsInvestmentsHistory = (props: SavingsInvestmentsHistoryProps) => {
  const { rows, totalSaved, totalInvested, totalAssigned } =
    useSavingsInvestmentsHistory(props);

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-surface">
      <div className="border-b border-text-secondary/10 bg-background p-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Annual history
        </h2>

        <p className="text-sm text-text-secondary">
          Review your allocations on an annual basis.
        </p>
      </div>

      <div className="grid gap-4 border-b border-text-secondary/10 p-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-text-secondary">
            Total invested cumulative
          </span>

          <span className="text-xl font-semibold text-text-primary">
            {totalInvested.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col gap-1 md:text-right">
          <span className="text-sm text-text-secondary">
            Total saved cumulative
          </span>

          <span className="text-xl font-semibold text-text-primary">
            {totalSaved.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full border-collapse bg-surface text-sm">
          <thead className="sticky top-0 z-10 bg-background text-text-secondary">
            <tr>
              <th className="px-4 py-3 text-left font-medium">
                Monthly periods
              </th>

              <th className="px-4 py-3 text-right font-medium">
                Allocated savings
              </th>

              <th className="px-4 py-3 text-right font-medium">
                Allocated investments
              </th>

              <th className="px-4 py-3 text-right font-medium">Accumulated</th>
            </tr>
          </thead>

          <tbody>
            {!rows.length && (
              <tr>
                <td
                  colSpan={4}
                  className="border-t border-text-secondary/10 px-4 py-8 text-center text-text-secondary"
                >
                  No savings or investments found for this period.
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr key={row.id} className="border-t border-text-secondary/10">
                <td className="px-4 py-3 font-medium text-text-primary">
                  {row.label}
                </td>

                <td className="px-4 py-3 text-right text-text-primary">
                  {row.savingsAmount.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-right text-text-primary">
                  {row.investmentAmount.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-right font-semibold text-text-primary">
                  {row.accumulatedAmount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="border-t border-text-secondary/10 bg-background font-semibold">
              <td className="sticky bottom-0 bg-background px-4 py-3 text-text-primary" />

              <td className="sticky bottom-0 bg-background px-4 py-3 text-right text-text-primary" />

              <td className="sticky bottom-0 bg-background px-4 py-3 text-right text-text-primary" />

              <td className="sticky bottom-0 bg-background px-4 py-3 text-right text-text-primary">
                Total: {totalAssigned.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default SavingsInvestmentsHistory;
