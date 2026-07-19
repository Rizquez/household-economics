import httpClient from "@/core/client/httpClient";
import type {
  CategoryResponseDto,
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
} from "./domain";
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "./types";

class CategoryRepository {
  async list(recordTypeId: number): Promise<Category[]> {
    const response = await httpClient.get<CategoryResponseDto[]>(
      `/category/${recordTypeId}`,
    );

    return response.data.map((category) => this.toCategory(category));
  }

  async create(payload: CreateCategoryRequest): Promise<Category> {
    const dto: CreateCategoryRequestDto = {
      name: payload.name,
      record_type_id: payload.recordTypeId,
    };

    const response = await httpClient.post<CategoryResponseDto>(
      "/category",
      dto,
    );

    return this.toCategory(response.data);
  }

  async update(payload: UpdateCategoryRequest): Promise<Category> {
    const dto: UpdateCategoryRequestDto = {
      name: payload.name,
      record_type_id: payload.recordTypeId,
    };

    const response = await httpClient.put<CategoryResponseDto>(
      `/category/${payload.id}`,
      dto,
    );

    return this.toCategory(response.data);
  }

  async delete(categoryId: number): Promise<void> {
    await httpClient.delete<void>(`/category/${categoryId}`);
  }

  private toCategory(dto: CategoryResponseDto): Category {
    return {
      id: dto.id,
      name: dto.name,
    };
  }
}

export default CategoryRepository;
