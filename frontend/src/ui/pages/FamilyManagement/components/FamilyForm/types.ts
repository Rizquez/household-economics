import type { Family } from "@/core/business/family/types";

export type FamilyFormProps = {
  family: Family;
};

export type FamilyFormErrorField = "name";

export type FamilyFormValidationError = {
  field: FamilyFormErrorField;
  message: string;
};
