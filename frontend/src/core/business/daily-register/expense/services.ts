import ExpenseRepository from "./repository";
import type {
  CreateExpenseRequest,
  Expense,
  UpdateExpenseRequest,
} from "./types";

const repository = new ExpenseRepository();

class CreateExpense {
  execute(payload: CreateExpenseRequest): Promise<Expense> {
    return repository.create(payload);
  }
}

class UpdateExpense {
  execute(payload: UpdateExpenseRequest): Promise<Expense> {
    return repository.update(payload);
  }
}

class DeleteExpense {
  execute(expenseId: number): Promise<void> {
    return repository.delete(expenseId);
  }
}

class ListExpensesByMonthAndYear {
  execute(month: number, year: number): Promise<Expense[]> {
    return repository.listByMonthAndYear(month, year);
  }
}

export const listExpensesByMonthAndYear = new ListExpensesByMonthAndYear();
export const createExpense = new CreateExpense();
export const updateExpense = new UpdateExpense();
export const deleteExpense = new DeleteExpense();
