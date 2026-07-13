import SavingsInvestmentsRepository from "./repository";

import type {
  CreateSavingsInvestmentsRequest,
  SavingsInvestments,
  SavingsInvestmentsAvailable,
  UpdateSavingsInvestmentsRequest,
} from "./types";

const repository = new SavingsInvestmentsRepository();

class GetSavingsInvestments {
  execute(
    month: number,
    year: number,
  ): Promise<SavingsInvestments | null> {
    return repository.getByMonthAndYear(month, year);
  }
}

class GetSavingsInvestmentsByYear {
  execute(
    year: number,
  ): Promise<SavingsInvestments[]> {
    return repository.getByYear(year);
  }
}

class GetSavingsInvestmentsAvailableAmount {
  execute(
    month: number,
    year: number,
  ): Promise<SavingsInvestmentsAvailable> {
    return repository.getAvailableAmount(month, year);
  }
}

class CreateSavingsInvestments {
  execute(
    request: CreateSavingsInvestmentsRequest,
  ): Promise<SavingsInvestments> {
    return repository.create(request);
  }
}

class UpdateSavingsInvestments {
  execute(
    request: UpdateSavingsInvestmentsRequest,
  ): Promise<SavingsInvestments> {
    return repository.update(request);
  }
}

export const getSavingsInvestments =
  new GetSavingsInvestments();

export const getSavingsInvestmentsByYear =
  new GetSavingsInvestmentsByYear();

export const getSavingsInvestmentsAvailableAmount =
  new GetSavingsInvestmentsAvailableAmount();

export const createSavingsInvestments =
  new CreateSavingsInvestments();

export const updateSavingsInvestments =
  new UpdateSavingsInvestments();