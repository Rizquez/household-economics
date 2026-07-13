import {
  useEffect,
  useState,
  type SubmitEventHandler,
} from "react";

import useFormFieldError from "@/ui/hooks/useFormFieldError";
import useSaveSavingsInvestments from "./useSaveSavingsInvestments";

import type {
  SavingsInvestmentsAllocationProps,
  SavingsInvestmentsFormField,
} from "../types";

const useSavingsInvestmentsForm = ({
  year,
  month,
  availableAmount,
  savingsInvestment,
}: SavingsInvestmentsAllocationProps) => {
  const [savingsAmount, setSavingsAmount] = useState("0");
  const [investmentAmount, setInvestmentAmount] = useState("0");

  const {
    errorMessage,
    showFieldError,
    clearFormError,
    hasFieldError,
  } = useFormFieldError<SavingsInvestmentsFormField>();

  const {
    mutate: saveSavingsInvestment,
    isPending,
  } = useSaveSavingsInvestments();

  useEffect(() => {
    setSavingsAmount(
      String(savingsInvestment?.savingsAmount ?? 0),
    );

    setInvestmentAmount(
      String(savingsInvestment?.investmentAmount ?? 0),
    );

    clearFormError();
  }, [savingsInvestment, year, month]);

  const numericSavingsAmount = Number(savingsAmount || 0);
  const numericInvestmentAmount = Number(investmentAmount || 0);

  const assignedAmount =
    numericSavingsAmount + numericInvestmentAmount;

  const remainingAmount =
    availableAmount - assignedAmount;

  const handleSavingsAmountChange = (value: string) => {
    setSavingsAmount(value);
    clearFormError();
  };

  const handleInvestmentAmountChange = (value: string) => {
    setInvestmentAmount(value);
    clearFormError();
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (
    event,
  ) => {
    event.preventDefault();

    if (numericSavingsAmount < 0) {
      showFieldError(
        "savingsAmount",
        "Input should be greater than or equal to 0.",
      );

      return;
    }

    if (numericInvestmentAmount < 0) {
      showFieldError(
        "investmentAmount",
        "Input should be greater than or equal to 0.",
      );

      return;
    }

    if (assignedAmount > availableAmount) {
      showFieldError(
        "form",
        "The assigned amount cannot exceed the available amount.",
      );

      return;
    }

    clearFormError();

    const request = {
      year,
      month,
      availableAmount,
      savingsAmount: numericSavingsAmount,
      investmentAmount: numericInvestmentAmount,
    };

    if (savingsInvestment) {
      saveSavingsInvestment({
        id: savingsInvestment.id,
        ...request,
      });

      return;
    }

    saveSavingsInvestment(request);
  };

  return {
    savingsAmount,
    investmentAmount,
    assignedAmount,
    remainingAmount,
    errorMessage,
    isPending,
    isEditing: Boolean(savingsInvestment),
    hasFieldError,
    handleSavingsAmountChange,
    handleInvestmentAmountChange,
    handleSubmit,
  };
};

export default useSavingsInvestmentsForm;