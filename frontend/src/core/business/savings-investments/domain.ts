export type SavingsInvestmentsResponseDto = {
  id: number;
  year: number;
  month: number;
  available_amount: string | number;
  savings_amount: string | number;
  investment_amount: string | number;
  family_id: number;
};

export type SavingsInvestmentsRequestDto = {
  year: number;
  month: number;
  available_amount: number;
  savings_amount: number;
  investment_amount: number;
};

export type SavingsInvestmentsAvailableResponseDto = string | number;
