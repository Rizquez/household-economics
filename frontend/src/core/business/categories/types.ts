export type CategoriesResponse = {
  id: number;
  category: string;
};
export type CreateCategoriesRequest = {
  category: string;
  record_type_id: number;
};
