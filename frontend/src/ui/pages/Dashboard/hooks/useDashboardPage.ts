import { useEffect, useMemo, useState } from "react";
import { MONTH_NAMES } from "@/ui/hooks/constants";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import useDashboard from "./useDashboard";
import useFamilyUser from "@/ui/hooks/useFamilyUser";
import usePeriodsAvailable from "@/ui/hooks/usePeriodsAvailable";

const useDashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const { showLoading, showModal, closeModal } = useModal();

  const {
    family,
    isPending: isLoadingFamily,
    isError: isFamilyError,
    error: familyError,
  } = useFamilyUser();

  const {
    periods,
    isPending: isLoadingPeriods,
    isError: isPeriodsError,
    error: periodsError,
  } = usePeriodsAvailable();

  const sortedPeriods = useMemo(
    () =>
      [...periods].sort((first, second) => {
        if (first.year !== second.year) {
          return second.year - first.year;
        }

        return first.month - second.month;
      }),
    [periods],
  );

  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();

  const currentMonth = currentDate.getMonth() + 1;

  const currentPeriod = `${currentYear}-${String(currentMonth).padStart(
    2,
    "0",
  )}`;

  const hasCurrentPeriod = sortedPeriods.some(
    (period) => period.year === currentYear && period.month === currentMonth,
  );

  const firstAvailablePeriod = sortedPeriods[0]
    ? `${sortedPeriods[0].year}-${String(sortedPeriods[0].month).padStart(
        2,
        "0",
      )}`
    : "";

  const defaultPeriod = hasCurrentPeriod ? currentPeriod : firstAvailablePeriod;

  const selectedPeriodExists = sortedPeriods.some(
    (period) =>
      `${period.year}-${String(period.month).padStart(2, "0")}` ===
      selectedPeriod,
  );

  const activePeriod =
    selectedPeriod && selectedPeriodExists ? selectedPeriod : defaultPeriod;

  const [yearValue, monthValue] = activePeriod.split("-");

  const year = Number(yearValue);
  const month = Number(monthValue);

  const {
    dashboard,
    isPending: isLoadingDashboard,
    isError: isDashboardError,
    error: dashboardError,
  } = useDashboard(month, year);

  const isLoading =
    isLoadingFamily ||
    isLoadingPeriods ||
    Boolean(activePeriod && isLoadingDashboard);

  const hasError = isFamilyError || isPeriodsError || isDashboardError;

  useEffect(() => {
    if (isLoading) {
      showLoading("Loading dashboard", "Please wait...");

      return;
    }

    if (hasError) {
      showModal({
        type: "error",
        title: "Dashboard",
        message:
          familyError?.message ??
          periodsError?.message ??
          dashboardError?.message ??
          "Unexpected error",
      });

      return;
    }

    closeModal();
  }, [
    isLoading,
    hasError,
    familyError,
    periodsError,
    dashboardError,
    showLoading,
    showModal,
    closeModal,
  ]);

  const periodOptions = useMemo(
    () =>
      sortedPeriods.map((period) => ({
        label: `${MONTH_NAMES[period.month - 1]} ${period.year}`,
        value: `${period.year}-${String(period.month).padStart(2, "0")}`,
      })),
    [sortedPeriods],
  );

  return {
    selectedPeriod: activePeriod,
    periodOptions,
    dashboard,
    family,
    month,
    year,
    isReady: !isLoading && !hasError,
    setSelectedPeriod,
  };
};

export default useDashboardPage;
