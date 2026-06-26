import httpClient from "@/core/client/httpClient";
import type { Category, CreateCategoryRequest } from "./types";
import type { CategoryResponseDto, CreateCategoryRequestDto } from "./domain";

class CategoriesRepository {
  async list(recordTypeId: number): Promise<Category[]> {
    const response = await httpClient.get<CategoryResponseDto[]>(
      `/categories/${recordTypeId}`,
    );

    return response.data.map((category) => ({
      id: category.id,
      category: category.category,
    }));
  }

  async create(payload: CreateCategoryRequest): Promise<void> {
    const dto: CreateCategoryRequestDto = {
      category: payload.category,
      record_type_id: payload.recordTypeId,
    };

    await httpClient.post("/categories", dto);
  }

  async delete(categoryId: number): Promise<void> {
    await httpClient.delete<void>(`/categories/${categoryId}`);
  }
}
export default CategoriesRepository;
