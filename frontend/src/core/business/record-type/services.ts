import RecordTypeRepository from "./repository";
import type { RecordType } from "./types";

const repository = new RecordTypeRepository();

class ListRecordTypes {
  execute(): Promise<RecordType[]> {
    return repository.list();
  }
}

export const listRecordTypes = new ListRecordTypes();
