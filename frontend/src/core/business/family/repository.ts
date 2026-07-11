import httpClient from "@/core/client/httpClient";
import type { Family } from "./types";
import type { FamilyDto } from "./domain";

class FamilyRepository {
  async getFamily(): Promise<Family> {
    const response = await httpClient.get<FamilyDto>("/family");
    return {
        id: response.data.id,
        name: response.data.name
    };
  }
}

export default FamilyRepository;
