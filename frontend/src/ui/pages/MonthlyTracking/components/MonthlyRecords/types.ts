import type { Expense } from "@/core/business/daily-register/expense/types";
import type { Income } from "@/core/business/daily-register/income/types";
import type { EditableDailyRegister } from "../DailyRegister/types";
import type { CurrencyType } from "@/core/business/currency-type/types";

export type MonthlyRecordsProps = {
  incomes: Income[];
  expenses: Expense[];
  currencyType: CurrencyType;
  onEdit: (record: EditableDailyRegister) => void;
};

export type NoteModalProps = {
  note: string;
  onClose: () => void;
};

export type ExpenseItemsModalProps = {
  expense: Expense;
  currencyType: CurrencyType;
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
