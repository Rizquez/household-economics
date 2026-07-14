import { useMemo, useState } from "react";

import type { Expense } from "@/core/business/daily-register/expense/types";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import useDeleteExpense from "./useDeleteExpense";
import useDeleteIncome from "./useDeleteIncome";
import type {
  MonthlyRecord,
  MonthlyRecordsProps,
  MonthlyRecordType,
} from "../types";

const useMonthlyRecords = ({
  incomes,
  expenses,
  onEdit,
}: MonthlyRecordsProps) => {
  const { showModal } = useModal();

  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const { mutate: deleteIncome, isPending: isDeletingIncome } =
    useDeleteIncome();

  const { mutate: deleteExpense, isPending: isDeletingExpense } =
    useDeleteExpense();

  const isDeleting = isDeletingIncome || isDeletingExpense;

  const records = useMemo<MonthlyRecord[]>(
    () =>
      [
        ...incomes.map(
          (income): MonthlyRecord => ({
            id: `income-${income.id}`,
            type: "Income",
            name: income.name,
            createdAt: income.createdAt,
            amount: income.amount,
            notes: income.notes,
            categoryName: income.categoryName,
            isSystemGenerated: income.savingsInvestmentId !== null,
            income,
            expense: null,
          }),
        ),

        ...expenses.map(
          (expense): MonthlyRecord => ({
            id: `expense-${expense.id}`,
            type: "Expenses",
            name: expense.name,
            createdAt: expense.createdAt,
            amount: expense.amount,
            notes: expense.notes,
            categoryName: expense.categoryName,
            isSystemGenerated: expense.savingsInvestmentId !== null,
            income: null,
            expense,
          }),
        ),
      ].sort(
        (first, second) =>
          new Date(second.createdAt).getTime() -
          new Date(first.createdAt).getTime(),
      ),
    [incomes, expenses],
  );

  const openNote = (note: string) => {
    setSelectedNote(note);
  };

  const closeNote = () => {
    setSelectedNote(null);
  };

  const openExpenseItems = (expense: Expense) => {
    setSelectedExpense(expense);
  };

  const closeExpenseItems = () => {
    setSelectedExpense(null);
  };

  const editRecord = (record: MonthlyRecord) => {
    if (record.isSystemGenerated) return;

    if (record.income) {
      onEdit({
        type: "Income",
        record: record.income,
      });

      return;
    }

    if (record.expense) {
      onEdit({
        type: "Expenses",
        record: record.expense,
      });
    }
  };

  const deleteRecord = (type: MonthlyRecordType, recordId: number) => {
    if (type === "Income") {
      deleteIncome(recordId);
      return;
    }

    deleteExpense(recordId);
  };

  const confirmDelete = (record: MonthlyRecord) => {
    if (record.isSystemGenerated) return;

    const recordId = record.income?.id ?? record.expense?.id;

    if (recordId === undefined) return;

    showModal({
      type: "warning",
      title: "Delete record",
      message:
        "Are you sure you want to delete this record? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: () => deleteRecord(record.type, recordId),
    });
  };

  return {
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
  };
};

export default useMonthlyRecords;
