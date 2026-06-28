import httpClient from "@/core/client/httpClient";
import type { CategoryResponseDto, CreateCategoryRequestDto } from "./domain";
import type { Category, CreateCategoryRequest } from "./types";

class CategoryRepository {
  async list(recordTypeId: number): Promise<Category[]> {
    const response = await httpClient.get<CategoryResponseDto[]>(
      `/category/${recordTypeId}`,
    );

    return response.data.map((category) => ({
      id: category.id,
      name: category.name,
    }));
  }

  async create(payload: CreateCategoryRequest): Promise<void> {
    const dto: CreateCategoryRequestDto = {
      name: payload.name,
      record_type_id: payload.recordTypeId,
    };

    await httpClient.post("/category", dto);
  }

  async delete(categoryId: number): Promise<void> {
    await httpClient.delete<void>(`/category/${categoryId}`);
  }
}
export default CategoryRepository;
