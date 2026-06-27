export type Category = {
  id: number;
  category: string;
};

export type CreateCategoryRequest = {
  category: string;
  recordTypeId: number;
};
