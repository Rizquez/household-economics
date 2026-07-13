import Button from "@/ui/components/Button";
import Input from "@/ui/components/Input";
import Select from "@/ui/components/Select";
import NumberInput from "@/ui/components/NumberInput";
import type { DailyRegisterFormProps } from "./types";
import useDailyRegisterForm from "./hooks/useDailyRegisterForm";
import DateInput from "@/ui/components/DateInput";

const DailyRegisterForm = (props: DailyRegisterFormProps) => {
  const {
    recordTypeId,
    name,
    createdAt,
    categoryId,
    notes,
    items,
    formError,
    isPending,
    isExpense,
    hasItems,
    categories,
    visibleAmount,
    isEditing,
    emptyItem,
    handleSubmit,
    handleRecordTypeChange,
    setName,
    setCreatedAt,
    setCategoryId,
    setAmount,
    setNotes,
    setItems,
    hasFieldError,
    clearFieldError,
    clearFormError,
  } = useDailyRegisterForm(props);

  const { recordTypes, expenseCategories, onClose } = props;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-0 flex-1 flex-col gap-6"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Select
          id="daily-register-type"
          label="Record type"
          placeholder="Select a record type"
          value={recordTypeId}
          disabled={isEditing}
          error={hasFieldError("recordType")}
          onChange={(event) => {
            handleRecordTypeChange(event.target.value);
            clearFieldError("recordType");
          }}
          options={recordTypes.map((recordType) => ({
            label: recordType.name,
            value: recordType.id,
          }))}
        />

        <Input
          id="daily-register-name"
          label="Name"
          placeholder="Supermarket, salary..."
          value={name}
          error={hasFieldError("name")}
          onChange={(event) => {
            setName(event.target.value);
            clearFieldError("name");
          }}
        />

        <DateInput
          id="daily-register-date"
          label="Date"
          value={createdAt}
          error={hasFieldError("createdAt")}
          onChange={(value) => {
            setCreatedAt(value);
            clearFieldError("createdAt");
          }}
        />

        <NumberInput
          id="daily-register-amount"
          label="Total amount"
          step="0.01"
          placeholder="0.00"
          value={visibleAmount}
          disabled={hasItems}
          error={hasFieldError("amount")}
          onChange={(event) => {
            setAmount(event.target.value);
            clearFieldError("amount");
          }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select
          id="daily-register-category"
          label="Category"
          placeholder={hasItems ? "Defined by items" : "Select a category"}
          value={hasItems ? "" : categoryId}
          disabled={hasItems}
          error={hasFieldError("category")}
          onChange={(event) => {
            setCategoryId(event.target.value);
            clearFieldError("category");
          }}
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />

        <Input
          id="daily-register-notes"
          label="Notes"
          placeholder="Optional notes"
          value={notes}
          error={hasFieldError("notes")}
          onChange={(event) => {
            setNotes(event.target.value);
            clearFieldError("notes");
          }}
        />
      </div>

      {isExpense && (
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
          <div className="flex items-center justify-between gap-4 p-4">
            <div>
              <h2 className="text-lg font-semibold text-text-primary">
                Expense items
              </h2>
              <p className="text-sm text-text-secondary">
                Add products when the expense is split by category.
              </p>
            </div>

            <Button
              type="button"
              onClick={() => {
                setItems((currentItems) => [...currentItems, emptyItem()]);
                setCategoryId("");
                clearFormError();
              }}
            >
              Add item
            </Button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
            {items.length === 0 ? (
              <p className="text-sm text-text-secondary">
                No items added. The expense will use the main category.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[2.5fr_1.5fr_1fr_auto] gap-3"
                  >
                    <Input
                      id={`expense-item-product-${index}`}
                      value={item.product}
                      placeholder="Product"
                      error={hasFieldError(`item.${index}.product`)}
                      onChange={(event) => {
                        const value = event.target.value;
                        setItems((currentItems) =>
                          currentItems.map((currentItem, currentIndex) =>
                            currentIndex === index
                              ? { ...currentItem, product: value }
                              : currentItem,
                          ),
                        );
                        clearFieldError(`item.${index}.product`);
                      }}
                    />

                    <Select
                      id={`expense-item-category-${index}`}
                      placeholder="Select a category"
                      value={item.categoryId}
                      options={expenseCategories.map((category) => ({
                        label: category.name,
                        value: category.id,
                      }))}
                      error={hasFieldError(`item.${index}.category`)}
                      onChange={(event) => {
                        const value = event.target.value;
                        setItems((currentItems) =>
                          currentItems.map((currentItem, currentIndex) =>
                            currentIndex === index
                              ? { ...currentItem, categoryId: value }
                              : currentItem,
                          ),
                        );
                        clearFieldError(`item.${index}.category`);
                      }}
                    />

                    <NumberInput
                      id={`expense-item-amount-${index}`}
                      step="0.01"
                      placeholder="0.00"
                      value={item.amount}
                      error={hasFieldError(`item.${index}.amount`)}
                      onChange={(event) => {
                        const value = event.target.value;
                        setItems((currentItems) =>
                          currentItems.map((currentItem, currentIndex) =>
                            currentIndex === index
                              ? { ...currentItem, amount: value }
                              : currentItem,
                          ),
                        );
                        clearFieldError(`item.${index}.amount`);
                      }}
                    />

                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => {
                        setItems((currentItems) =>
                          currentItems.filter(
                            (_, currentIndex) => currentIndex !== index,
                          ),
                        );
                        clearFormError();
                      }}
                    >
                      Remove item
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
              ? "Save changes"
              : "Create"}
        </Button>

        <Button type="button" variant="secondary" onClick={onClose}>
          Close
        </Button>

        {formError && <p className="w-full text-sm text-error">{formError}</p>}
      </div>
    </form>
  );
};

export default DailyRegisterForm;
