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

const mapSavingsInvestments = (
  savingsInvestments: SavingsInvestmentsResponseDto,
): SavingsInvestments => ({
  id: savingsInvestments.id,
  year: savingsInvestments.year,
  month: savingsInvestments.month,
  availableAmount: Number(savingsInvestments.available_amount),
  savingsAmount: Number(savingsInvestments.savings_amount),
  investmentAmount: Number(savingsInvestments.investment_amount),
  familyId: savingsInvestments.family_id,
});

const mapSavingsInvestmentsRequest = (
  request: CreateSavingsInvestmentsRequest | UpdateSavingsInvestmentsRequest,
): SavingsInvestmentsRequestDto => ({
  year: request.year,
  month: request.month,
  available_amount: request.availableAmount,
  savings_amount: request.savingsAmount,
  investment_amount: request.investmentAmount,
});

class SavingsInvestmentssRepository {
  async getByMonthAndYear(
    month: number,
    year: number,
  ): Promise<SavingsInvestments | null> {
    const response = await httpClient.get<SavingsInvestmentsResponseDto | null>(
      `/savings-investments/${month}/${year}`,
    );

    return response.data ? mapSavingsInvestments(response.data) : null;
  }

  async getByYear(year: number): Promise<SavingsInvestments[]> {
    const response = await httpClient.get<SavingsInvestmentsResponseDto[]>(
      `/savings-investments/history/${year}`,
    );

    return response.data.map(mapSavingsInvestments);
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
      mapSavingsInvestmentsRequest(request),
    );

    return mapSavingsInvestments(response.data);
  }

  async update(
    request: UpdateSavingsInvestmentsRequest,
  ): Promise<SavingsInvestments> {
    const response = await httpClient.put<SavingsInvestmentsResponseDto>(
      `/savings-investments/${request.id}`,
      mapSavingsInvestmentsRequest(request),
    );

    return mapSavingsInvestments(response.data);
  }
}

export default SavingsInvestmentssRepository;
