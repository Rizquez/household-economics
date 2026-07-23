import CurrencyTypeRepository from "./repository";
import type { CurrencyType } from "./types";

const repository = new CurrencyTypeRepository();

class GetCurrencyTypes {
  execute(): Promise<CurrencyType[]> {
    return repository.getCurrencyTypes();
  }
}

export const getCurrencyTypes = new GetCurrencyTypes();
