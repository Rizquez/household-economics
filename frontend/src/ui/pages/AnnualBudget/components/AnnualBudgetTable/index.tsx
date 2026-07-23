import NumberInput from "@/ui/components/NumberInput";
import type { AnnualBudgetTableProps } from "./types";
import { getMonthLabel, getMonthlyTotals, getMonths } from "./utils/month";

const AnnualBudgetTable = ({
  budgetGroups,
  currencyType,
  onAmountChange,
  hasFieldError,
}: AnnualBudgetTableProps) => {
  const months = budgetGroups.length
    ? getMonths(budgetGroups)
    : Array.from({ length: 12 }, (_, index) => index + 1);
  const monthlyTotals = getMonthlyTotals(months, budgetGroups);

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-text-secondary/10">
      <table className="w-full min-w-245 border-collapse bg-surface text-sm">
        <thead className="bg-background text-text-secondary">
          <tr>
            <th className="sticky top-0 left-0 z-30 border-r border-text-secondary/10 bg-background px-4 py-3 text-left font-medium">
              Budget group
            </th>

            {months.map((month) => (
              <th
                key={month}
                className="sticky top-0 z-20 whitespace-nowrap bg-background px-3 py-3 text-right font-medium"
              >
                {getMonthLabel(month)}
              </th>
            ))}

            <th className="sticky top-0 right-0 z-30 whitespace-nowrap border-l border-text-secondary/10 bg-background px-3 py-3 text-right font-medium">
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {!budgetGroups.length && (
            <tr>
              <td
                colSpan={months.length + 2}
                className="border-t border-text-secondary/10 px-4 py-8 text-center text-text-secondary"
              >
                No budget groups found for this period.
              </td>
            </tr>
          )}
          {budgetGroups.map((budgetGroup) => {
            const budgetGroupTotal = budgetGroup.budgets.reduce(
              (total, budget) => total + budget.amount,
              0,
            );

            return (
              <tr
                key={budgetGroup.id}
                className="border-t border-text-secondary/10"
              >
                <td className="sticky left-0 z-10 border-r border-text-secondary/10 bg-surface px-4 py-3 font-medium text-text-primary whitespace-nowrap">
                  {budgetGroup.name}
                </td>

                {months.map((month) => {
                  const budget = budgetGroup.budgets.find(
                    (item) => item.month === month,
                  );

                  return (
                    <td key={month} className="px-2 py-2 text-right">
                      <NumberInput
                        step="0.01"
                        value={budget?.amount ?? 0}
                        className="ml-auto h-9 w-20 px-2"
                        error={
                          budget ? hasFieldError(`budget.${budget.id}`) : false
                        }
                        onChange={(event) =>
                          budget &&
                          onAmountChange(budget.id, Number(event.target.value))
                        }
                      />
                    </td>
                  );
                })}

                <td className="sticky right-0 z-10 border-l border-text-secondary/10 bg-surface px-3 py-3 text-right font-semibold text-text-primary">
                  {currencyType.symbol} {budgetGroupTotal.toFixed(2)}
                </td>
              </tr>
            );
          })}

          <tr className="border-t border-text-secondary/10 bg-background font-semibold">
            <td className="sticky bottom-0 left-0 z-30 border-r border-text-secondary/10 bg-background px-4 py-3 text-text-primary">
              Total
            </td>

            {months.map((month) => (
              <td
                key={month}
                className="sticky bottom-0 z-20 bg-background px-3 py-3 text-right text-text-primary"
              >
                {currencyType.symbol} {monthlyTotals[month].toFixed(2)}
              </td>
            ))}

            <td className="sticky right-0 bottom-0 z-30 border-l border-text-secondary/10 bg-background px-3 py-3 text-right text-text-primary">
              {currencyType.symbol}{" "}
              {Object.values(monthlyTotals)
                .reduce((total, value) => total + value, 0)
                .toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AnnualBudgetTable;
