import FamilyRepository from "./repository";
import type { Family } from "./types";

const repository = new FamilyRepository();

class GetFamily {
  execute(): Promise<Family> {
    return repository.getFamily();
  }
}

export const getFamily = new GetFamily();
