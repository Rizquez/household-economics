import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { MONTH_NAMES } from "@/ui/hooks/constants";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";

import useSavingsInvestments from "./useSavingsInvestments";
import useSavingsInvestmentsAvailable from "./useSavingsInvestmentsAvailable";
import useSavingsInvestmentsHistory from "./useSavingsInvestmentsHistory";
import useSavingsInvestmentsPeriods from "./useSavingsInvestmentsPeriods";

const useSavingsInvestmentsPage = () => {
  const [selectedPeriod, setSelectedPeriod] =
    useState("");

  const { showLoading, showModal, closeModal } =
    useModal();

  const {
    periods,
    isPending: isLoadingPeriods,
    isError: isPeriodsError,
    error: periodsError,
  } = useSavingsInvestmentsPeriods();

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
  const currentMonth =
    currentDate.getMonth() + 1;

  const currentPeriod = `${currentYear}-${String(
    currentMonth,
  ).padStart(2, "0")}`;

  const hasCurrentPeriod = sortedPeriods.some(
    (period) =>
      period.year === currentYear &&
      period.month === currentMonth,
  );

  const firstAvailablePeriod = sortedPeriods[0]
    ? `${sortedPeriods[0].year}-${String(
        sortedPeriods[0].month,
      ).padStart(2, "0")}`
    : "";

  const defaultPeriod = hasCurrentPeriod
    ? currentPeriod
    : firstAvailablePeriod;

  const selectedPeriodExists = sortedPeriods.some(
    (period) =>
      `${period.year}-${String(
        period.month,
      ).padStart(2, "0")}` ===
      selectedPeriod,
  );

  const activePeriod =
    selectedPeriod && selectedPeriodExists
      ? selectedPeriod
      : defaultPeriod;

  const [yearValue, monthValue] =
    activePeriod.split("-");

  const year = Number(yearValue);
  const month = Number(monthValue);

  const {
    savingsInvestment,
    isPending: isLoadingSavingsInvestment,
    isError: isSavingsInvestmentError,
    error: savingsInvestmentError,
  } = useSavingsInvestments(month, year);

  const {
    availableAmount,
    isPending: isLoadingAvailable,
    isError: isAvailableError,
    error: availableError,
  } = useSavingsInvestmentsAvailable(
    month,
    year,
  );

  const {
    history,
    isPending: isLoadingHistory,
    isError: isHistoryError,
    error: historyError,
  } = useSavingsInvestmentsHistory(year);

  const isLoading =
    isLoadingPeriods ||
    Boolean(
      activePeriod &&
        isLoadingSavingsInvestment,
    ) ||
    Boolean(
      activePeriod &&
        isLoadingAvailable,
    ) ||
    Boolean(
      activePeriod &&
        isLoadingHistory,
    );

  const hasError =
    isPeriodsError ||
    isSavingsInvestmentError ||
    isAvailableError ||
    isHistoryError;

  useEffect(() => {
    if (isLoading) {
      showLoading(
        "Loading savings and investments",
        "Please wait...",
      );

      return;
    }

    if (hasError) {
      showModal({
        type: "error",
        title: "Savings and investments",
        message:
          periodsError?.message ??
          savingsInvestmentError?.message ??
          availableError?.message ??
          historyError?.message ??
          "Unexpected error",
      });

      return;
    }

    closeModal();
  }, [
    isLoading,
    hasError,
    periodsError,
    savingsInvestmentError,
    availableError,
    historyError,
    showLoading,
    showModal,
    closeModal,
  ]);

  const periodOptions = useMemo(
    () =>
      sortedPeriods.map((period) => ({
        label: `${
          MONTH_NAMES[period.month - 1]
        } ${period.year}`,

        value: `${period.year}-${String(
          period.month,
        ).padStart(2, "0")}`,
      })),
    [sortedPeriods],
  );

  return {
    selectedPeriod: activePeriod,
    periodOptions,
    year,
    month,
    availableAmount,
    savingsInvestment,
    history,
    isReady: !isLoading && !hasError,
    setSelectedPeriod,
  };
};

export default useSavingsInvestmentsPage;