import type { CurrencyType } from "@/core/business/currency-type/types";
import type { Family } from "@/core/business/family/types";

export type FamilyInformationProps = {
  family: Family;
  currencyTypes: CurrencyType[];
};
