import type { Family } from "@/core/business/family/types";

export type FamilyInformationProps = {
  family: Family;
};

export type FamilyInformationErrorField = "name";

export type FamilyInformationValidationError = {
  field: FamilyInformationErrorField;
  message: string;
};
