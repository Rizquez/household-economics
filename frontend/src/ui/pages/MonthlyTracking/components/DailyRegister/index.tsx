import DailyRegisterForm from "./components/DailyRegisterForm";
import useDailyRegisterPage from "./hooks/useDailyRegisterPage";
import type { DailyRegisterProps } from "./types";

const DailyRegister = ({
  onClose,
  onRecordSaved,
  record,
}: DailyRegisterProps) => {
  const { isReady, recordTypes, incomeCategories, expenseCategories } =
    useDailyRegisterPage();

  if (!isReady) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-visible rounded-xl bg-surface p-6 shadow-xl">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-text-primary">
            {record ? "Edit record" : "Daily register"}
          </h1>

          <p className="text-sm text-text-secondary">
            {record
              ? "Update the selected income or expense record."
              : "Create income or expense records for your household."}
          </p>
        </div>

        <DailyRegisterForm
          recordTypes={recordTypes}
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
          onSuccess={onRecordSaved}
          onClose={onClose}
          record={record}
        />
      </div>
    </div>
  );
};

export default DailyRegister;
