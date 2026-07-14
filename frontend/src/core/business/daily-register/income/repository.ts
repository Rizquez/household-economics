import httpClient from "@/core/client/httpClient";
import type {
  CreateIncomeRequestDto,
  IncomeResponseDto,
  UpdateIncomeRequestDto,
} from "./domain";
import type { CreateIncomeRequest, Income, UpdateIncomeRequest } from "./types";

class IncomeRepository {
  async listByMonthAndYear(month: number, year: number): Promise<Income[]> {
    const response = await httpClient.get<IncomeResponseDto[]>(
      `/income/${month}/${year}`,
    );
    return response.data.map((income) => this.toIncome(income));
  }

  async create(payload: CreateIncomeRequest): Promise<Income> {
    const dto: CreateIncomeRequestDto = {
      name: payload.name,
      created_at: payload.createdAt,
      amount: payload.amount,
      notes: payload.notes,
      category_id: payload.categoryId,
    };

    const response = await httpClient.post<IncomeResponseDto>("/income", dto);

    return this.toIncome(response.data);
  }

  async update(payload: UpdateIncomeRequest): Promise<Income> {
    const dto: UpdateIncomeRequestDto = {
      name: payload.name,
      created_at: payload.createdAt,
      amount: payload.amount,
      notes: payload.notes,
      category_id: payload.categoryId,
    };

    const response = await httpClient.put<IncomeResponseDto>(
      `/income/${payload.id}`,
      dto,
    );

    return this.toIncome(response.data);
  }

  async delete(incomeId: number): Promise<void> {
    await httpClient.delete<void>(`/income/${incomeId}`);
  }

  private toIncome(dto: IncomeResponseDto): Income {
    return {
      id: dto.id,
      name: dto.name,
      createdAt: dto.created_at,
      amount: Number(dto.amount),
      notes: dto.notes,
      categoryId: dto.category_id,
      familyId: dto.family_id,
      savingsInvestmentId: dto.savings_investment_id,
      categoryName: dto.category?.name ?? null,
      categoryNormalizedName: dto.category?.normalized_name ?? null,
    };
  }
}

export default IncomeRepository;
