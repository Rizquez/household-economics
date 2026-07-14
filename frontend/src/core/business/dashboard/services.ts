import DashboardRepository from "./repository";
import type { Dashboard } from "./types";

const repository = new DashboardRepository();

class GetDashboard {
  execute(month: number, year: number): Promise<Dashboard> {
    return repository.getDashboard(month, year);
  }
}

export const getDashboard = new GetDashboard();
