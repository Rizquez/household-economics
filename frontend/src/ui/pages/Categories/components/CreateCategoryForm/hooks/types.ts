export type CreateCategoryErrorField = "category" | "recordType";

export type CreateCategoryValidationError = {
  field: CreateCategoryErrorField;
  message: string;
};
