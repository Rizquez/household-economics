import RecordTypesRepository from "./repository";
import type { RecordTypesResponse } from "./types";

const repository = new RecordTypesRepository();

class ListRecordTypes {
  execute(): Promise<RecordTypesResponse[]> {
    return repository.list();
  }
}

export const listRecordTypes = new ListRecordTypes();
