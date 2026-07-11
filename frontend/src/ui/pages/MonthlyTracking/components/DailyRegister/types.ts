import type { Expense } from "@/core/business/daily-register/expense/types";
import type { Income } from "@/core/business/daily-register/income/types";

export type EditableDailyRegister =
  | {
      type: "Income";
      record: Income;
    }
  | {
      type: "Expenses";
      record: Expense;
    };

export type DailyRegisterProps = {
  onClose: () => void;
  onRecordSaved: (createdAt: string) => void;
  record?: EditableDailyRegister;
};
