import Button from "@/ui/components/Button";
import NumberInput from "@/ui/components/NumberInput";

import type { SavingsInvestmentsAllocationProps } from "./types";
import useSavingsInvestmentsForm from "./hooks/useSavingsInvestmentsForm";
import Tooltip from "@/ui/components/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const SavingsInvestmentsAllocation = (
  props: SavingsInvestmentsAllocationProps,
) => {
  const {
    savingsAmount,
    investmentAmount,
    assignedAmount,
    remainingAmount,
    errorMessage,
    isPending,
    isEditing,
    hasFieldError,
    handleSavingsAmountChange,
    handleInvestmentAmountChange,
    handleSubmit,
  } = useSavingsInvestmentsForm(props);

  const { availableAmount } = props;
  const isAllocationDisabled = availableAmount <= 0;

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-surface">
      <div className="border-b border-text-secondary/10 bg-background p-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Monthly allocation
        </h2>

        <p className="text-sm text-text-secondary">
          Allocate the available amount to savings and investments.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6 p-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Available</span>

            {isAllocationDisabled && (
              <Tooltip text="It is not possible to allocate savings and investments since there is no positive balance for the specified month.">
                <span className="cursor-pointer text-sm text-text-secondary">
                  <FontAwesomeIcon icon={faCircleInfo} />
                </span>
              </Tooltip>
            )}
          </div>

          <span
            className={`text-3xl font-semibold ${
              availableAmount >= 0 ? "text-success" : "text-error"
            }`}
          >
            {availableAmount.toFixed(2)}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <NumberInput
            id="savings-investment-savings"
            label="Savings"
            step="0.01"
            placeholder="0.00"
            value={savingsAmount}
            disabled={isAllocationDisabled}
            error={hasFieldError("savingsAmount")}
            onChange={(event) => handleSavingsAmountChange(event.target.value)}
          />

          <NumberInput
            id="savings-investment-investments"
            label="Investments"
            step="0.01"
            placeholder="0.00"
            value={investmentAmount}
            disabled={isAllocationDisabled}
            error={hasFieldError("investmentAmount")}
            onChange={(event) =>
              handleInvestmentAmountChange(event.target.value)
            }
          />
        </div>

        <div className="grid gap-4 border-t border-text-secondary/10 pt-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="">Assigned</span>
              <Tooltip text="The amount assigned for savings and investments will be reset to zero whenever the available balance decreases.">
                <span className="cursor-pointer">
                  <FontAwesomeIcon icon={faCircleInfo} />
                </span>
              </Tooltip>
            </span>

            <span className="text-lg font-semibold text-text-primary">
              {assignedAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col gap-1 md:text-right">
            <span className="text-sm text-text-secondary">Remaining</span>

            <span
              className={`text-lg font-semibold ${
                remainingAmount >= 0 ? "text-success" : "text-error"
              }`}
            >
              {remainingAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <Button type="submit" disabled={isAllocationDisabled || isPending}>
            {isPending
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
                ? "Save changes"
                : "Create allocation"}
          </Button>

          {errorMessage && <p className="text-sm text-error">{errorMessage}</p>}
        </div>
      </form>
    </section>
  );
};

export default SavingsInvestmentsAllocation;
