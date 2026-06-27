export type CategoryResponseDto = {
  id: number;
  name: string;
};

export type CreateCategoryRequestDto = {
  name: string;
  record_type_id: number;
};
