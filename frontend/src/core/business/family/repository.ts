import httpClient from "@/core/client/httpClient";
import type {
  CreateFamilyInvitationRequestDto,
  FamilyDto,
  FamilyMemberDto,
  UpdateFamilyRequestDto,
} from "./domain";
import type {
  CreateFamilyInvitationRequest,
  Family,
  FamilyMember,
  UpdateFamilyRequest,
} from "./types";

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

  async getFamilyMembers(): Promise<FamilyMember[]> {
    const response = await httpClient.get<FamilyMemberDto[]>("/family/members");

    return response.data.map(this.toFamilyMember);
  }

  async removeFamilyMember(userId: number): Promise<void> {
    await httpClient.delete(`/family/members/${userId}`);
  }

  async createFamilyInvitation(
    payload: CreateFamilyInvitationRequest,
  ): Promise<void> {
    const dto: CreateFamilyInvitationRequestDto = {
      email: payload.email,
    };

    await httpClient.post("/family/invitations", dto);
  }

  private toFamily(dto: FamilyDto): Family {
    return {
      id: dto.id,
      name: dto.name,
    };
  }

  private toFamilyMember(dto: FamilyMemberDto): FamilyMember {
    return {
      id: dto.id,
      userId: dto.user_id,
      name: dto.name,
      email: dto.email,
      role: dto.role,
    };
  }
}

export default FamilyRepository;
