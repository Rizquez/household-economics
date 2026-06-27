export type CategoryResponseDto = {
  id: number;
  category: string;
};

export type CreateCategoryRequestDto = {
  category: string;
  record_type_id: number;
};
