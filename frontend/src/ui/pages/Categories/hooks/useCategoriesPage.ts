import { useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import useRecordTypes from "./useRecordTypes";
import { CATEGORIES_QUERY_KEY } from "./constants";
import { listCategories } from "@/core/business/category/services";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";

const useCategoriesPage = () => {
  const { recordTypes, isPending, isError, error } = useRecordTypes();
  const { showLoading, showModal, closeModal } = useModal();

  const categoryQueries = useQueries({
    queries: recordTypes.map((recordType) => ({
      queryKey: [CATEGORIES_QUERY_KEY, recordType.id],
      queryFn: () => listCategories.execute(recordType.id),
      enabled: recordTypes.length > 0,
    })),
  });

  const isLoadingCategories = categoryQueries.some((query) => query.isPending);
  const categoryError = categoryQueries.find((query) => query.isError)?.error;

  const isLoading = isPending || isLoadingCategories;
  const hasError = isError || Boolean(categoryError);

  useEffect(() => {
    if (isLoading) {
      showLoading("Loading categories", "Please wait...");
      return;
    }

    if (hasError) {
      showModal({
        type: "error",
        title: "Error loading categories",
        message: error?.message ?? categoryError?.message ?? "Unexpected error",
      });
      return;
    }

    closeModal();
  }, [
    isLoading,
    hasError,
    error,
    categoryError,
    showLoading,
    showModal,
    closeModal,
  ]);

  const categoriesByRecordType = recordTypes.map((recordType, index) => ({
    recordType,
    categories: categoryQueries[index]?.data ?? [],
  }));

  return {
    isReady: !isLoading && !hasError,
    categoriesByRecordType,
  };
};

export default useCategoriesPage;
