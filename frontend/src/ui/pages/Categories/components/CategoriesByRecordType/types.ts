import type { Category } from "@/core/business/category/types";
import type { RecordType } from "@/core/business/record-type/types";

export type CategoriesByRecordTypeProps = {
  recordType: RecordType;
  categories: Category[];
};
