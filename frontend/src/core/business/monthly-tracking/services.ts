import MonthlyTrackingRepository from "./repository";
import type { MonthlyTrackingPeriod } from "./types";

const repository = new MonthlyTrackingRepository();

class GetMonthlyTrackingPeriods {
  execute(): Promise<MonthlyTrackingPeriod[]> {
    return repository.getPeriods();
  }
}

export const getMonthlyTrackingPeriods = new GetMonthlyTrackingPeriods();
