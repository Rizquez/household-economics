import RecordTypesRepository from "./repository";

const repository = new RecordTypesRepository();

class ListRecordTypes {
  execute() {
    return repository.list();
  }
}

export const listRecordTypes = new ListRecordTypes();
