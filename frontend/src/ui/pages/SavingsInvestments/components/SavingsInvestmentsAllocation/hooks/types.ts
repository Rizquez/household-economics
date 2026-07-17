import type {
  CreateSavingsInvestmentsRequest,
  UpdateSavingsInvestmentsRequest,
} from "@/core/business/savings-investments/types";

export type SaveSavingsInvestmentRequest =
  CreateSavingsInvestmentsRequest | UpdateSavingsInvestmentsRequest;
