import type {
  CreateExpenseRequest,
  UpdateExpenseRequest,
} from "@/core/business/daily-register/expense/types";
import type {
  CreateIncomeRequest,
  UpdateIncomeRequest,
} from "@/core/business/daily-register/income/types";

export type ItemForm = {
  product: string;
  categoryId: string;
  amount: string;
};

export type EmptyFieldErrors = {
  recordType: boolean;
  name: boolean;
  createdAt: boolean;
  category: boolean;
  amount: boolean;
};

export type DailyRegisterErrorField =
  | "recordType"
  | "name"
  | "createdAt"
  | "category"
  | "amount"
  | "notes"
  | `item.${number}.product`
  | `item.${number}.category`
  | `item.${number}.amount`;

export type DailyRegisterValidationError = {
  field: DailyRegisterErrorField;
  message: string;
};

export type UpdateDailyRegisterPayload =
  | {
      type: "Income";
      payload: UpdateIncomeRequest;
    }
  | {
      type: "Expenses";
      payload: UpdateExpenseRequest;
    };

export type CreateDailyRegisterPayload =
  | {
      type: "Income";
      payload: CreateIncomeRequest;
    }
  | {
      type: "Expenses";
      payload: CreateExpenseRequest;
    };
