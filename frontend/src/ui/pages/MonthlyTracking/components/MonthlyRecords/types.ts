import type { Expense } from "@/core/business/daily-register/expense/types";
import type { Income } from "@/core/business/daily-register/income/types";
import type { EditableDailyRegister } from "../DailyRegister/types";

export type MonthlyRecordsProps = {
  incomes: Income[];
  expenses: Expense[];
  onEdit: (record: EditableDailyRegister) => void;
};

export type NoteModalProps = {
  note: string;
  onClose: () => void;
};

export type ExpenseItemsModalProps = {
  expense: Expense;
  onClose: () => void;
};

export type MonthlyRecordType = "Income" | "Expenses";

export type MonthlyRecord = {
  id: string;
  type: MonthlyRecordType;
  name: string;
  createdAt: string;
  amount: number;
  notes: string | null;
  categoryName: string | null;
  isSystemGenerated: boolean;
  income: Income | null;
  expense: Expense | null;
};
