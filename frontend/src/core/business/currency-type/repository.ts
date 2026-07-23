import httpClient from "@/core/client/httpClient";
import type { CurrencyTypeDto } from "./domain";
import type { CurrencyType } from "./types";

class CurrencyTypeRepository {
  async getCurrencyTypes(): Promise<CurrencyType[]> {
    const response = await httpClient.get<CurrencyTypeDto[]>("/currency-type");

    return response.data.map(this.toCurrencyType);
  }

  private toCurrencyType(dto: CurrencyTypeDto): CurrencyType {
    return {
      id: dto.id,
      code: dto.code,
      symbol: dto.symbol,
      name: dto.name,
    };
  }
}

export default CurrencyTypeRepository;
