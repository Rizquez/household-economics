import Button from "@/ui/components/Button";
import type { MonthlyRecordsProps } from "./types";
import ExpenseItemsModal from "./components/ExpenseItemsModal";
import NoteModal from "./components/NoteModal";
import Tooltip from "@/ui/components/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import useMonthlyRecords from "./hooks/useMonthlyRecords";

const MonthlyRecords = (props: MonthlyRecordsProps) => {
  const {
    records,
    selectedNote,
    selectedExpense,
    isDeleting,
    openNote,
    closeNote,
    openExpenseItems,
    closeExpenseItems,
    editRecord,
    confirmDelete,
  } = useMonthlyRecords(props);

  return (
    <>
      <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
        <div className="border-b border-text-secondary/10 p-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Monthly records
          </h2>
        </div>

        <div className="min-h-0 flex-1 overflow-auto">
          <table className="w-full min-w-180 border-collapse bg-surface text-sm">
            <thead className="sticky top-0 z-10 bg-background text-text-secondary">
              <tr>
                <th className="w-60 max-w-60 px-4 py-3 text-left font-medium">Record name</th>
                <th className="w-28 px-4 py-3 text-left font-medium">Record type</th>
                <th className="w-28 px-4 py-3 text-left font-medium">Category</th>
                <th className="w-28 px-4 py-3 text-left font-medium">Amount</th>
                <th className="w-28 max-w-28 px-4 py-3 text-left font-medium">Note</th>
                <th className="w-40 px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {!records.length && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-text-secondary"
                  >
                    No records found for this period.
                  </td>
                </tr>
              )}

              {records.map((record) => (
                <tr
                  key={record.id}
                  className="border-t border-text-secondary/10"
                >
                  <td className="w-60 max-w-60 px-4 py-3">
                    <span
                      className="block truncate font-medium text-text-primary"
                      title={record.name}
                    >
                      {record.name}
                    </span>
                  </td>

                  <td className="w-28 px-4 py-3 text-text-primary">
                    {record.type}
                  </td>

                  <td className="w-28 px-4 py-3 text-text-primary">
                    {record.categoryName ?? "-"}
                  </td>

                  <td className="w-28 px-4 py-3 text-left font-medium text-text-primary">
                    {record.amount.toFixed(2)}
                  </td>

                  <td className="w-28 max-w-28 px-4 py-3">
                    {record.notes ? (
                      <Tooltip text="See note">
                        <button
                          type="button"
                          className="block max-w-full cursor-pointer truncate text-left text-primary hover:underline"
                          onClick={() =>
                            record.notes && openNote(record.notes)
                          }
                        >
                          {record.notes}
                        </button>
                      </Tooltip>
                    ) : (
                      <span className="text-text-secondary">
                        -
                      </span>
                    )}
                  </td>

                  <td className="w-40 px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {record.expense?.items.length ? (
                        <Tooltip text="Product details">
                          <Button
                            variant="secondary"
                            disabled={isDeleting}
                            onClick={() => {
                              if (record.expense) {
                                openExpenseItems(record.expense);
                              }
                            }}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </Button>
                        </Tooltip>
                      ) : null}

                      <Tooltip text="Edit">
                        <Button
                          variant="secondary"
                          disabled={isDeleting}
                          onClick={() => editRecord(record)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                      </Tooltip>

                      <Tooltip text="Delete">
                        <Button
                          variant="danger"
                          disabled={isDeleting}
                          onClick={() => confirmDelete(record)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedNote && <NoteModal note={selectedNote} onClose={closeNote} />}

      {selectedExpense && (
        <ExpenseItemsModal
          expense={selectedExpense}
          onClose={closeExpenseItems}
        />
      )}
    </>
  );
};

export default MonthlyRecords;
