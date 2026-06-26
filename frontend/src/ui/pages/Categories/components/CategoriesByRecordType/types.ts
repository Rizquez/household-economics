import type { Category } from "@/core/business/categories/types";
import type { RecordType } from "@/core/business/record-types/types";

export type CategoriesByRecordTypeProps = {
  recordType: RecordType;
  categories: Category[];
};