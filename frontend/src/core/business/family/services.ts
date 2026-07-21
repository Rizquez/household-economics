import FamilyRepository from "./repository";
import type {
  CreateFamilyInvitationRequest,
  Family,
  FamilyMember,
  UpdateFamilyRequest,
} from "./types";

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

class GetFamilyMembers {
  execute(): Promise<FamilyMember[]> {
    return repository.getFamilyMembers();
  }
}

class RemoveFamilyMember {
  execute(userId: number): Promise<void> {
    return repository.removeFamilyMember(userId);
  }
}

class CreateFamilyInvitation {
  execute(payload: CreateFamilyInvitationRequest): Promise<void> {
    return repository.createFamilyInvitation(payload);
  }
}

export const getFamily = new GetFamily();
export const updateFamily = new UpdateFamily();
export const getFamilyMembers = new GetFamilyMembers();
export const removeFamilyMember = new RemoveFamilyMember();
export const createFamilyInvitation = new CreateFamilyInvitation();
