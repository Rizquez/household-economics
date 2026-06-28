import httpClient from "@/core/client/httpClient";
import type { CurrentUserResponseDto } from "./domain";
import type { CurrentUser } from "./types";

class CurrentUserRepository {
  async get(): Promise<CurrentUser> {
    const response = await httpClient.get<CurrentUserResponseDto>("/user/me");

    return {
      id: response.data.id,
      clerkId: response.data.clerk_id,
      email: response.data.email,
      name: response.data.name,
      familyId: response.data.family_id,
      accessAllowed: response.data.access_allowed,
    };
  }
}

export default CurrentUserRepository;
