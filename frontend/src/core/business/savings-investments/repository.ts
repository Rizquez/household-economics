import httpClient from "@/core/client/httpClient";

import type {
  SavingsInvestmentsAvailableResponseDto,
  SavingsInvestmentsRequestDto,
  SavingsInvestmentsResponseDto,
} from "./domain";

import type {
  CreateSavingsInvestmentsRequest,
  SavingsInvestments,
  SavingsInvestmentsAvailable,
  UpdateSavingsInvestmentsRequest,
} from "./types";

class SavingsInvestmentssRepository {
  async getByMonthAndYear(
    month: number,
    year: number,
  ): Promise<SavingsInvestments | null> {
    const response = await httpClient.get<SavingsInvestmentsResponseDto | null>(
      `/savings-investments/${month}/${year}`,
    );

    return response.data ? this.toSavingsInvestments(response.data) : null;
  }

  async getByYear(year: number): Promise<SavingsInvestments[]> {
    const response = await httpClient.get<SavingsInvestmentsResponseDto[]>(
      `/savings-investments/history/${year}`,
    );

    return response.data.map((item) => this.toSavingsInvestments(item));
  }

  async getAvailableAmount(
    month: number,
    year: number,
  ): Promise<SavingsInvestmentsAvailable> {
    const response =
      await httpClient.get<SavingsInvestmentsAvailableResponseDto>(
        `/savings-investments/available/${month}/${year}`,
      );

    return {
      availableAmount: Number(response.data),
    };
  }

  async create(
    request: CreateSavingsInvestmentsRequest,
  ): Promise<SavingsInvestments> {
    const response = await httpClient.post<SavingsInvestmentsResponseDto>(
      "/savings-investments",
      this.toSavingsInvestmentsRequest(request),
    );

    return this.toSavingsInvestments(response.data);
  }

  async update(
    request: UpdateSavingsInvestmentsRequest,
  ): Promise<SavingsInvestments> {
    const response = await httpClient.put<SavingsInvestmentsResponseDto>(
      `/savings-investments/${request.id}`,
      this.toSavingsInvestmentsRequest(request),
    );

    return this.toSavingsInvestments(response.data);
  }

  private toSavingsInvestments(
    dto: SavingsInvestmentsResponseDto,
  ): SavingsInvestments {
    return {
      id: dto.id,
      year: dto.year,
      month: dto.month,
      availableAmount: Number(dto.available_amount),
      savingsAmount: Number(dto.savings_amount),
      investmentAmount: Number(dto.investment_amount),
      familyId: dto.family_id,
    };
  }

  private toSavingsInvestmentsRequest(
    request: CreateSavingsInvestmentsRequest | UpdateSavingsInvestmentsRequest,
  ): SavingsInvestmentsRequestDto {
    return {
      year: request.year,
      month: request.month,
      available_amount: request.availableAmount,
      savings_amount: request.savingsAmount,
      investment_amount: request.investmentAmount,
    };
  }
}

export default SavingsInvestmentssRepository;
