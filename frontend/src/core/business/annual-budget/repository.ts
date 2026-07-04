import httpClient from "@/core/client/httpClient";
import type { BudgetGroup, UpdateBudgetRequest } from "./types";
import type { BudgetGroupResponseDto, UpdateBudgetRequestDto } from "./domain";

class AnnualBudgetRepository {
  async createFromCategory(categoryId: number): Promise<void> {
    await httpClient.post<void>(`/annual-budget/${categoryId}`);
  }

  async getYears(): Promise<number[]> {
    const response = await httpClient.get<number[]>("/annual-budget/years");

    return response.data;
  }

  async getBudgetGroups(year: number): Promise<BudgetGroup[]> {
    const response = await httpClient.get<BudgetGroupResponseDto[]>(
      `/annual-budget/${year}`,
    );

    return response.data.map((budgetGroup) => ({
      id: budgetGroup.id,
      name: budgetGroup.name,
      year: budgetGroup.year,
      budgets: budgetGroup.budgets.map((budget) => ({
        id: budget.id,
        month: budget.month,
        amount: Number(budget.amount),
        budgetGroupId: budget.budget_group_id,
      })),
    }));
  }

  async updateBudgets(payload: UpdateBudgetRequest[]): Promise<void> {
    const dto: UpdateBudgetRequestDto[] = payload.map((budget) => ({
      id: budget.id,
      amount: budget.amount,
    }));

    await httpClient.put<void>("/annual-budget", dto);
  }
}

export default AnnualBudgetRepository;
