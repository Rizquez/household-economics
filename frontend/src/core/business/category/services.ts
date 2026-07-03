import CategoryRepository from "./repository";
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "./types";

const repository = new CategoryRepository();

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

class UpdateCategory {
  execute(payload: UpdateCategoryRequest): Promise<void> {
    return repository.update(payload);
  }
}

class DeleteCategory {
  execute(categoryId: number): Promise<void> {
    return repository.delete(categoryId);
  }
}

export const listCategories = new ListCategories();
export const createCategory = new CreateCategory();
export const updateCategory = new UpdateCategory();
export const deleteCategory = new DeleteCategory();
