import httpClient from "@/core/client/httpClient";
import type { RecordTypesResponse } from "./types";

class RecordTypesRepository {
  async list(): Promise<RecordTypesResponse[]> {
    const response =
      await httpClient.get<RecordTypesResponse[]>("/record-types");
    return response.data;
  }
}

export default RecordTypesRepository;
