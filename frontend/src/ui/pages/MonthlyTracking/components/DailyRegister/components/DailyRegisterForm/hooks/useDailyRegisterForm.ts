import { useMemo, useState, type ComponentProps } from "react";

import useCreateDailyRegister from "./useCreateDailyRegister";
import useUpdateDailyRegister from "./useUpdateDailyRegister";
import type { DailyRegisterFormProps } from "../types";
import type {
  DailyRegisterErrorField,
  DailyRegisterValidationError,
  ItemForm,
} from "./types";
import useFormFieldError from "@/ui/hooks/useFormFieldError";

const emptyItem = (): ItemForm => ({
  product: "",
  categoryId: "",
  amount: "",
});

const useDailyRegisterForm = ({
  recordTypes,
  incomeCategories,
  expenseCategories,
  onSuccess,
  record,
}: DailyRegisterFormProps) => {
  const initialRecordTypeId = record
    ? String(
        recordTypes.find((recordType) => recordType.name === record.type)?.id ??
          "",
      )
    : "";

  const initialItems: ItemForm[] =
    record?.type === "Expenses"
      ? record.record.items.map((item) => ({
          product: item.product,
          categoryId: item.categoryId !== null ? String(item.categoryId) : "",
          amount: String(item.amount),
        }))
      : [];

  const [recordTypeId, setRecordTypeId] = useState(initialRecordTypeId);

  const [name, setName] = useState(record?.record.name ?? "");

  const [createdAt, setCreatedAt] = useState(
    record?.record.createdAt.slice(0, 10) ?? "",
  );

  const [categoryId, setCategoryId] = useState(
    record?.record.categoryId !== null &&
      record?.record.categoryId !== undefined
      ? String(record.record.categoryId)
      : "",
  );

  const [amount, setAmount] = useState(
    record ? String(record.record.amount) : "",
  );

  const [notes, setNotes] = useState(record?.record.notes ?? "");

  const [items, setItems] = useState<ItemForm[]>(initialItems);

  const {
    errorMessage: formError,
    showFieldError,
    clearFieldError,
    clearFormError,
    hasFieldError,
  } = useFormFieldError<DailyRegisterErrorField>();

  const { mutate: createRecord, isPending: isCreating } =
    useCreateDailyRegister();

  const { mutate: updateRecord, isPending: isUpdating } =
    useUpdateDailyRegister();

  const isEditing = Boolean(record);
  const isPending = isCreating || isUpdating;

  const selectedRecordType = recordTypes.find(
    (recordType) => String(recordType.id) === recordTypeId,
  );

  const isIncome = selectedRecordType?.name === "Income";
  const isExpense = selectedRecordType?.name === "Expenses";

  const hasItems = isExpense && items.length > 0;

  const categories = isExpense ? expenseCategories : incomeCategories;

  const calculatedAmount = useMemo(
    () =>
      items.reduce((total, item) => {
        const itemAmount = Number(item.amount);

        return total + (Number.isFinite(itemAmount) ? itemAmount : 0);
      }, 0),
    [items],
  );

  const visibleAmount = hasItems ? String(calculatedAmount) : amount;

  const resetForm = () => {
    setRecordTypeId("");
    setName("");
    setCreatedAt("");
    setCategoryId("");
    setAmount("");
    setNotes("");
    setItems([]);
    clearFormError();
  };

  const validate = (): DailyRegisterValidationError | null => {
    if (!recordTypeId) {
      return {
        field: "recordType",
        message: "Please select a record type.",
      };
    }

    if (!name.trim()) {
      return {
        field: "name",
        message: "Please enter a name.",
      };
    }

    if (name.length > 50) {
      return {
        field: "name",
        message: "Name cannot contain more than 50 characters.",
      };
    }

    if (!createdAt) {
      return {
        field: "createdAt",
        message: "Please select a date.",
      };
    }

    if (!isIncome && !isExpense) {
      return {
        field: "recordType",
        message: "Selected record type is not supported.",
      };
    }

    if (!hasItems && !categoryId) {
      return {
        field: "category",
        message: "Please select a category.",
      };
    }

    if (!hasItems && Number(visibleAmount) <= 0) {
      return {
        field: "amount",
        message: "Please enter an amount greater than 0.",
      };
    }

    if (notes.length > 50) {
      return {
        field: "notes",
        message: "Notes cannot contain more than 50 characters.",
      };
    }

    for (const [index, item] of items.entries()) {
      if (!item.product.trim()) {
        return {
          field: `item.${index}.product`,
          message: "Please enter all item products.",
        };
      }

      if (item.product.length > 50) {
        return {
          field: `item.${index}.product`,
          message: "Product cannot contain more than 50 characters.",
        };
      }

      if (!item.categoryId) {
        return {
          field: `item.${index}.category`,
          message: "Please select all item categories.",
        };
      }

      if (Number(item.amount) <= 0) {
        return {
          field: `item.${index}.amount`,
          message: "Each item amount must be greater than 0.",
        };
      }
    }

    return null;
  };

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();

    const validationError = validate();

    if (validationError) {
      showFieldError(validationError.field, validationError.message);

      return;
    }

    clearFormError();

    const mutationOptions = {
      onSuccess: () => {
        onSuccess(createdAt);
        resetForm();
      },
    };

    if (isIncome) {
      const incomePayload = {
        name: name.trim(),
        createdAt,
        amount: Number(visibleAmount),
        notes: notes.trim() || null,
        categoryId: Number(categoryId),
      };

      if (record?.type === "Income") {
        updateRecord(
          {
            type: "Income",
            payload: {
              id: record.record.id,
              ...incomePayload,
            },
          },
          mutationOptions,
        );

        return;
      }

      createRecord(
        {
          type: "Income",
          payload: incomePayload,
        },
        mutationOptions,
      );

      return;
    }

    const expensePayload = {
      name: name.trim(),
      createdAt,
      amount: Number(visibleAmount),
      notes: notes.trim() || null,
      categoryId: hasItems ? null : Number(categoryId),
      items: hasItems
        ? items.map((item) => ({
            product: item.product.trim(),
            amount: Number(item.amount),
            categoryId: Number(item.categoryId),
          }))
        : isEditing
          ? []
          : null,
    };

    if (record?.type === "Expenses") {
      updateRecord(
        {
          type: "Expenses",
          payload: {
            id: record.record.id,
            ...expensePayload,
          },
        },
        mutationOptions,
      );

      return;
    }

    createRecord(
      {
        type: "Expenses",
        payload: expensePayload,
      },
      mutationOptions,
    );
  };

  const handleRecordTypeChange = (value: string) => {
    setRecordTypeId(value);
    setCategoryId("");
    setAmount("");
    setItems([]);
    clearFormError();
  };

  return {
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
  };
};

export default useDailyRegisterForm;
