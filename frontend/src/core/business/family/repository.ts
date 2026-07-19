import httpClient from "@/core/client/httpClient";
import type { FamilyDto, UpdateFamilyRequestDto } from "./domain";
import type { Family, UpdateFamilyRequest } from "./types";

class FamilyRepository {
  async getFamily(): Promise<Family> {
    const response = await httpClient.get<FamilyDto>("/family");

    return this.toFamily(response.data);
  }

  async updateFamily(payload: UpdateFamilyRequest): Promise<Family> {
    const dto: UpdateFamilyRequestDto = {
      name: payload.name,
    };

    const response = await httpClient.put<FamilyDto>("/family", dto);
    return this.toFamily(response.data);
  }

  private toFamily(dto: FamilyDto): Family {
    return {
      id: dto.id,
      name: dto.name,
    };
  }
}

export default FamilyRepository;
