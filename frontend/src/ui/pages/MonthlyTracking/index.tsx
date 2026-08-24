import { useState } from "react";

import DailyRegister from "./components/DailyRegister";
import MonthlySummary from "./components/MonthlySummary";
import MonthlyRecords from "./components/MonthlyRecords";
import MonthlyTrackingControls from "./components/MonthlyTrackingControls";
import useMonthlyTrackingPage from "./hooks/useMonthlyTrackingPage";
import type { EditableDailyRegister } from "./components/DailyRegister/types";

const MonthlyTracking = () => {
  const [isDailyRegisterOpen, setIsDailyRegisterOpen] = useState(false);
  const [editingRecord, setEditingRecord] =
    useState<EditableDailyRegister | null>(null);

  const {
    selectedPeriod,
    periodOptions,
    incomes,
    expenses,
    summaryRows,
    family,
    isReady,
    setSelectedPeriod,
  } = useMonthlyTrackingPage();

  if (!isReady || !family) return null;

  const openCreateRecord = () => {
    setEditingRecord(null);
    setIsDailyRegisterOpen(true);
  };

  const openEditRecord = (record: EditableDailyRegister) => {
    setEditingRecord(record);
    setIsDailyRegisterOpen(true);
  };

  const closeDailyRegister = () => {
    setEditingRecord(null);
    setIsDailyRegisterOpen(false);
  };

  const handleRecordSaved = (createdAt: string) => {
    setSelectedPeriod(createdAt.slice(0, 7));
    closeDailyRegister();
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden bg-surface p-4 md:gap-6 md:p-6 card">
      <div className="flex flex-col items-stretch gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-text-primary">
            Monthly tracking
          </h1>

          <p className="text-sm text-text-secondary">
            Keep track of, record, and monitor your monthly income and expenses.
          </p>
        </header>
        <MonthlyTrackingControls
          selectedPeriod={selectedPeriod}
          periodOptions={periodOptions}
          onPeriodChange={setSelectedPeriod}
          onNewRecord={openCreateRecord}
        />
      </div>

      <div className="grid min-h-0 flex-1 auto-rows-max grid-cols-1 gap-4 overflow-y-auto 2xl:auto-rows-auto 2xl:grid-cols-[0.6fr_1fr] 2xl:overflow-hidden">
        <MonthlySummary rows={summaryRows} currencyType={family.currencyType} />

        <MonthlyRecords
          incomes={incomes}
          expenses={expenses}
          currencyType={family.currencyType}
          onEdit={openEditRecord}
        />
      </div>

      {isDailyRegisterOpen && (
        <DailyRegister
          onClose={closeDailyRegister}
          onRecordSaved={handleRecordSaved}
          record={editingRecord ?? undefined}
        />
      )}
    </div>
  );
};

export default MonthlyTracking;
