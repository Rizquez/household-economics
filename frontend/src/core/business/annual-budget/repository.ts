import httpClient from "@/core/client/httpClient";
import type { Budget, BudgetGroup, UpdateBudgetRequest } from "./types";
import type {
  BudgetGroupResponseDto,
  BudgetResponseDto,
  UpdateBudgetRequestDto,
} from "./domain";

class AnnualBudgetRepository {
  async createFromCategory(categoryId: number): Promise<BudgetGroup> {
    const response = await httpClient.post<BudgetGroupResponseDto>(
      `/annual-budget/${categoryId}`,
    );

    return this.toBudgetGroup(response.data);
  }

  async getYears(): Promise<number[]> {
    const response = await httpClient.get<number[]>("/annual-budget/years");

    return response.data;
  }

  async getBudgetGroups(year: number): Promise<BudgetGroup[]> {
    const response = await httpClient.get<BudgetGroupResponseDto[]>(
      `/annual-budget/${year}`,
    );

    return response.data.map((budgetGroup) => this.toBudgetGroup(budgetGroup));
  }

  async updateBudgets(payload: UpdateBudgetRequest[]): Promise<Budget[]> {
    const dto: UpdateBudgetRequestDto[] = payload.map((budget) => ({
      id: budget.id,
      amount: budget.amount,
    }));

    const response = await httpClient.put<BudgetResponseDto[]>(
      "/annual-budget",
      dto,
    );

    return response.data.map((budget) => this.toBudget(budget));
  }

  private toBudgetGroup(dto: BudgetGroupResponseDto): BudgetGroup {
    return {
      id: dto.id,
      name: dto.name,
      normalizedName: dto.normalized_name,
      year: dto.year,
      categoryId: dto.category_id,
      budgets: dto.budgets.map((budget) => this.toBudget(budget)),
    };
  }

  private toBudget(dto: BudgetResponseDto): Budget {
    return {
      id: dto.id,
      month: dto.month,
      amount: Number(dto.amount),
      budgetGroupId: dto.budget_group_id,
    };
  }
}

export default AnnualBudgetRepository;
