import FamilyRepository from "./repository";
import type { Family, UpdateFamilyRequest } from "./types";

const repository = new FamilyRepository();

class GetFamily {
  execute(): Promise<Family> {
    return repository.getFamily();
  }
}

class UpdateFamily {
  execute(payload: UpdateFamilyRequest): Promise<Family> {
    return repository.updateFamily(payload);
  }
}

export const getFamily = new GetFamily();
export const updateFamily = new UpdateFamily();
