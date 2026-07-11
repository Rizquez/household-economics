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
    isReady,
    setSelectedPeriod,
  } = useMonthlyTrackingPage();

  if (!isReady) return null;

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
    <div className="flex h-full min-h-0 flex-col gap-6 bg-surface p-6 card">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-text-primary">
            Monthly tracking
          </h1>

          <p className="text-sm text-text-secondary">
            Track and monitor your monthly income and expenses.
          </p>
        </div>
      </div>

      <MonthlyTrackingControls
        selectedPeriod={selectedPeriod}
        periodOptions={periodOptions}
        onPeriodChange={setSelectedPeriod}
        onNewRecord={openCreateRecord}
      />

      <div className="grid min-h-0 flex-1 grid-cols-[0.5fr_1fr] gap-4">
        <MonthlySummary rows={summaryRows} />

        <MonthlyRecords
          incomes={incomes}
          expenses={expenses}
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
