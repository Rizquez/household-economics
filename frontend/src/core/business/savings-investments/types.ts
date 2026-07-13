export type SavingsInvestments = {
  id: number;
  year: number;
  month: number;
  availableAmount: number;
  savingsAmount: number;
  investmentAmount: number;
  familyId: number;
};

export type CreateSavingsInvestmentsRequest = {
  year: number;
  month: number;
  availableAmount: number;
  savingsAmount: number;
  investmentAmount: number;
};

export type UpdateSavingsInvestmentsRequest =
  CreateSavingsInvestmentsRequest & {
    id: number;
  };

export type SavingsInvestmentsAvailable = {
  availableAmount: number;
};

export type SaveSavingsInvestmentsRequest =
  | CreateSavingsInvestmentsRequest
  | UpdateSavingsInvestmentsRequest;