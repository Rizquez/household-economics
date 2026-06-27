export type Category = {
  id: number;
  name: string;
};

export type CreateCategoryRequest = {
  name: string;
  recordTypeId: number;
};
