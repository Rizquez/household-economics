import type { Category } from "@/core/business/category/types";
import type { RecordType } from "@/core/business/record-type/types";
import type { EditableDailyRegister } from "../../types";

export type DailyRegisterFormProps = {
  recordTypes: RecordType[];
  incomeCategories: Category[];
  expenseCategories: Category[];
  onSuccess: (createdAt: string) => void;
  onClose: () => void;
  record?: EditableDailyRegister;
};
