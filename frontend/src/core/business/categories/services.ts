import CategoriesRepository from "./repository";
import type { CategoriesResponse, CreateCategoriesRequest } from "./types";

const repository = new CategoriesRepository();

class ListCategories {
  execute(record_type_id: number): Promise<CategoriesResponse[]> {
    return repository.list(record_type_id);
  }
}

class CreateCategory {
  execute(payload: CreateCategoriesRequest): Promise<void> {
    return repository.create(payload);
  }
}

class DeleteCategory {
  execute(category_id: number): Promise<void> {
    return repository.delete(category_id);
  }
}

export const listCategories = new ListCategories();
export const createCategory = new CreateCategory();
export const deleteCategory = new DeleteCategory();
