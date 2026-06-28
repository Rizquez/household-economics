import CurrentUserRepository from "./repository";
import type { CurrentUser } from "./types";

const repository = new CurrentUserRepository();

class GetCurrentUser {
  execute(): Promise<CurrentUser> {
    return repository.get();
  }
}

export const getCurrentUser = new GetCurrentUser();
