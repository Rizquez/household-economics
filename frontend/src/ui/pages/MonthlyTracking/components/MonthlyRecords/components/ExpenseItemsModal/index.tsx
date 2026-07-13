import Button from "@/ui/components/Button";
import type { ExpenseItemsModalProps } from "../../types";

const ExpenseItemsModal = ({ expense, onClose }: ExpenseItemsModalProps) => {
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 p-6">
      <div className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-surface p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-text-primary">
          {expense.name} items
        </h2>

        <div className="mt-4 min-h-0 overflow-y-auto rounded-xl border border-text-secondary/10">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-background text-text-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Product</th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
              </tr>
            </thead>

            <tbody>
              {expense.items.map((item) => (
                <tr key={item.id} className="border-t border-text-secondary/10">
                  <td className="max-w-48 px-4 py-3">
                    <span
                      className="block font-medium max-w-full truncate text-text-primary"
                      title={item.product}
                    >
                      {item.product}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-text-primary">
                    {item.categoryName ?? "-"}
                  </td>

                  <td className="px-4 py-3 text-right text-text-primary">
                    {item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Ok</Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItemsModal;
