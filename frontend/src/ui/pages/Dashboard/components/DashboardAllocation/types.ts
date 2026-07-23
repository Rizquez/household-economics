import type { CurrencyType } from "@/core/business/currency-type/types";
import type { DashboardAllocation } from "@/core/business/dashboard/types";

export type DashboardAllocationProps = {
  allocation: DashboardAllocation;
  currencyType: CurrencyType;
};

export type Allocation = DashboardAllocationProps["allocation"];
