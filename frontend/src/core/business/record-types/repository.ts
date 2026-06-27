import httpClient from "@/core/client/httpClient";
import type { RecordType } from "./types";
import type { RecordTypeResponseDto } from "./domain";

class RecordTypesRepository {
  async list(): Promise<RecordType[]> {
    const response =
      await httpClient.get<RecordTypeResponseDto[]>("/record-types");

    return response.data.map((recordType) => ({
      id: recordType.id,
      recordType: recordType.record_type,
    }));
  }
}

export default RecordTypesRepository;
