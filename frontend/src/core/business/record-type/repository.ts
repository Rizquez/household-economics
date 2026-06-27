import httpClient from "@/core/client/httpClient";
import type { RecordType } from "./types";
import type { RecordTypeResponseDto } from "./domain";

class RecordTypeRepository {
  async list(): Promise<RecordType[]> {
    const response =
      await httpClient.get<RecordTypeResponseDto[]>("/record-type");

    return response.data.map((recordType) => ({
      id: recordType.id,
      name: recordType.name,
    }));
  }
}

export default RecordTypeRepository;
