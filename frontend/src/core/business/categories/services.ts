import CategoriesRepository from "./repository";
import type { Category, CreateCategoryRequest } from "./types";

const repository = new CategoriesRepository();

class ListCategories {
  execute(recordTypeId: number): Promise<Category[]> {
    return repository.list(recordTypeId);
  }
}

class CreateCategory {
  execute(payload: CreateCategoryRequest): Promise<void> {
    return repository.create(payload);
  }
}

class DeleteCategory {
  execute(categoryId: number): Promise<void> {
    return repository.delete(categoryId);
  }
}

export const listCategories = new ListCategories();
export const createCategory = new CreateCategory();
export const deleteCategory = new DeleteCategory();
