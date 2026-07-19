import AnnualBudgetRepository from "./repository";
import type { Budget, BudgetGroup, UpdateBudgetRequest } from "./types";

const repository = new AnnualBudgetRepository();

class CreateBudgetGroupFromCategory {
  execute(categoryId: number): Promise<BudgetGroup> {
    return repository.createFromCategory(categoryId);
  }
}

class GetBudgetYears {
  execute(): Promise<number[]> {
    return repository.getYears();
  }
}

class GetBudgetGroups {
  execute(year: number): Promise<BudgetGroup[]> {
    return repository.getBudgetGroups(year);
  }
}

class UpdateBudgets {
  execute(payload: UpdateBudgetRequest[]): Promise<Budget[]> {
    return repository.updateBudgets(payload);
  }
}

export const createBudgetGroupFromCategory =
  new CreateBudgetGroupFromCategory();
export const getBudgetYears = new GetBudgetYears();
export const getBudgetGroups = new GetBudgetGroups();
export const updateBudgets = new UpdateBudgets();
