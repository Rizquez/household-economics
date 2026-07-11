import IncomeRepository from "./repository";
import type { CreateIncomeRequest, Income, UpdateIncomeRequest } from "./types";

const repository = new IncomeRepository();

class CreateIncome {
  execute(payload: CreateIncomeRequest): Promise<Income> {
    return repository.create(payload);
  }
}

class UpdateIncome {
  execute(payload: UpdateIncomeRequest): Promise<Income> {
    return repository.update(payload);
  }
}

class DeleteIncome {
  execute(incomeId: number): Promise<void> {
    return repository.delete(incomeId);
  }
}

class ListIncomesByMonthAndYear {
  execute(month: number, year: number): Promise<Income[]> {
    return repository.listByMonthAndYear(month, year);
  }
}

export const listIncomesByMonthAndYear = new ListIncomesByMonthAndYear();
export const createIncome = new CreateIncome();
export const updateIncome = new UpdateIncome();
export const deleteIncome = new DeleteIncome();
