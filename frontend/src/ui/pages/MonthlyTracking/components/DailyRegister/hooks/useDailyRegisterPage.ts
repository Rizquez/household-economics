import { useEffect } from "react";
import { useQueries } from "@tanstack/react-query";

import { listRecordTypes } from "@/core/business/record-type/services";
import { listCategories } from "@/core/business/category/services";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import {
  CATEGORIES_QUERY_KEY,
  RECORD_TYPES_QUERY_KEY,
} from "../../../hooks/constants";

const useDailyRegisterPage = () => {
  const { showLoading, showModal, closeModal } = useModal();

  const recordTypesQuery = useQueries({
    queries: [
      {
        queryKey: [RECORD_TYPES_QUERY_KEY],
        queryFn: () => listRecordTypes.execute(),
        meta: {
          blocksAppLayout: false,
        },
      },
    ],
  })[0];

  const recordTypes = recordTypesQuery.data ?? [];

  const incomeRecordType = recordTypes.find(
    (recordType) => recordType.name === "Income",
  );

  const expenseRecordType = recordTypes.find(
    (recordType) => recordType.name === "Expenses",
  );

  const categoryQueries = useQueries({
    queries: [incomeRecordType, expenseRecordType]
      .filter(Boolean)
      .map((recordType) => ({
        queryKey: [CATEGORIES_QUERY_KEY, recordType!.id],
        queryFn: () => listCategories.execute(recordType!.id),
        enabled: Boolean(recordType),
        meta: {
          blocksAppLayout: false,
        },
      })),
  });

  const isLoading =
    recordTypesQuery.isPending ||
    categoryQueries.some((query) => query.isPending);

  const error =
    recordTypesQuery.error ??
    categoryQueries.find((query) => query.isError)?.error;

  useEffect(() => {
    if (isLoading) {
      showLoading("Loading daily register", "Please wait...");
      return;
    }

    if (error) {
      showModal({
        type: "error",
        title: "Daily register",
        message: error.message,
      });
      return;
    }

    closeModal();
  }, [isLoading, error, showLoading, showModal, closeModal]);

  return {
    isReady: !isLoading && !error,
    recordTypes,
    incomeCategories: categoryQueries[0]?.data ?? [],
    expenseCategories: categoryQueries[1]?.data ?? [],
  };
};

export default useDailyRegisterPage;
