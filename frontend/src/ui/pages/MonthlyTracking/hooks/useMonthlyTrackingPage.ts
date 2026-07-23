import { useEffect, useMemo, useState } from "react";

import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import useMonthlySummary from "../components/MonthlySummary/hooks/useMonthlySummary";
import useMonthlyRecords from "./useMonthlyRecords";
import { MONTH_NAMES } from "@/ui/hooks/constants";
import useFamilyUser from "@/ui/hooks/useFamilyUser";
import usePeriods from "@/ui/hooks/usePeriods";

const useMonthlyTrackingPage = () => {
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
  } = usePeriods();

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
    incomes,
    expenses,
    isPending: isLoadingRecords,
    isError: isRecordsError,
    error: recordsError,
  } = useMonthlyRecords(month, year);

  const {
    rows: summaryRows,
    isPending: isLoadingSummary,
    isError: isSummaryError,
    error: summaryError,
  } = useMonthlySummary({
    selectedPeriod: activePeriod,
    expenses,
    incomes,
  });

  const isLoading =
    isLoadingFamily ||
    isLoadingPeriods ||
    Boolean(activePeriod && isLoadingRecords) ||
    Boolean(activePeriod && isLoadingSummary);

  const hasError =
    isFamilyError || isPeriodsError || isRecordsError || isSummaryError;

  useEffect(() => {
    if (isLoading) {
      showLoading("Loading monthly tracking", "Please wait...");
      return;
    }

    if (hasError) {
      showModal({
        type: "error",
        title: "Monthly tracking",
        message:
          familyError?.message ??
          periodsError?.message ??
          recordsError?.message ??
          summaryError?.message ??
          "Unexpected error",
      });

      return;
    }

    closeModal();
  }, [
    isLoading,
    hasError,
    periodsError,
    recordsError,
    summaryError,
    familyError,
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
    incomes,
    expenses,
    summaryRows,
    family,
    isReady: !isLoading && !hasError,
    setSelectedPeriod,
  };
};

export default useMonthlyTrackingPage;
