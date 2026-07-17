import type { DashboardAllocation } from "@/core/business/dashboard/types";

export type DashboardAllocationProps = {
  allocation: DashboardAllocation;
};

export type Allocation = DashboardAllocationProps["allocation"];