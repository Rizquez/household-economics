import httpClient from "@/core/client/httpClient";
import type { MonthlyTrackingPeriodResponseDto } from "./domain";
import type { MonthlyTrackingPeriod } from "./types";

class MonthlyTrackingRepository {
  async getPeriods(): Promise<MonthlyTrackingPeriod[]> {
    const response = await httpClient.get<MonthlyTrackingPeriodResponseDto[]>(
      "/monthly-tracking/periods",
    );

    return response.data.map((period) => ({
      month: period.month,
      year: period.year,
    }));
  }
}

export default MonthlyTrackingRepository;
