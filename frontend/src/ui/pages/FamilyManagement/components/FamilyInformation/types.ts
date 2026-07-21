import type { CurrencyType } from "@/core/business/currency-type/types";
import type { Family } from "@/core/business/family/types";

export type FamilyInformationProps = {
  family: Family;
  currencyTypes: CurrencyType[];
};

export type FamilyInformationErrorField = "name" | "currencyType";

export type FamilyInformationValidationError = {
  field: FamilyInformationErrorField;
  message: string;
};
