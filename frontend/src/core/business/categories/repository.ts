import httpClient from "@/core/client/httpClient";
import type { CreateCategoriesRequest, CategoriesResponse } from "./types";

class CategoriesRepository {
  async list(record_type_id: number): Promise<CategoriesResponse[]> {
    const response = await httpClient.get<CategoriesResponse[]>(
      `/categories/${record_type_id}`,
    );
    return response.data;
  }

  async create(payload: CreateCategoriesRequest): Promise<void> {
    await httpClient.post<void>("/categories/", payload);
  }

  async delete(category_id: number): Promise<void> {
    await httpClient.delete<void>(`/categories/${category_id}`);
  }
}
export default CategoriesRepository;
