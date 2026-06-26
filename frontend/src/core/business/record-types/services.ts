import RecordTypesRepository from "./repository";
import type { RecordType } from "./types";

const repository = new RecordTypesRepository();

class ListRecordTypes {
  execute(): Promise<RecordType[]> {
    return repository.list();
  }
}

export const listRecordTypes = new ListRecordTypes();
