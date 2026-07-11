import { useState } from "react";

import useDeleteCategory from "@/ui/pages/Categories/components/CategoriesByRecordType/hooks/useDeleteCategory";
import useUpdateCategory from "@/ui/pages/Categories/components/CategoriesByRecordType/hooks/useUpdateCategory";
import useCreateBudgetGroupFromCategory from "@/ui/pages/Categories/components/CategoriesByRecordType/hooks/useCreateBudgetGroupFromCategory";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";

const useCategoriesByRecordType = (
  recordTypeId: number,
  recordTypeName: string,
) => {
  const { showModal } = useModal();
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null,
  );
  const [editingCategoryName, setEditingCategoryName] = useState("");

  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  const {
    mutate: createBudgetGroupFromCategory,
    isPending: isExportingToAnnualBudget,
  } = useCreateBudgetGroupFromCategory();

  const handleEdit = (categoryId: number, categoryName: string) => {
    setEditingCategoryId(categoryId);
    setEditingCategoryName(categoryName);
  };

  const handleCancel = () => {
    setEditingCategoryId(null);
    setEditingCategoryName("");
  };

  const handleSave = () => {
    if (!editingCategoryId || !editingCategoryName.trim()) return;

    updateCategory(
      {
        id: editingCategoryId,
        name: editingCategoryName.trim(),
        recordTypeId,
      },
      {
        onSuccess: handleCancel,
      },
    );
  };

  const exportToAnnualBudget = (categoryId: number) => {
    createBudgetGroupFromCategory(categoryId);
  };

  const confirmDelete = (categoryId: number) => {
    showModal({
      type: "warning",
      title: "Delete category",
      message:
        recordTypeName === "Expenses"
          ? "When you delete this category, its annual budget groups will also be deleted. This action cannot be undone."
          : "Are you sure you want to delete this category?",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: () => deleteCategory(categoryId),
    });
  };

  return {
    editingCategoryId,
    editingCategoryName,
    isDeleting,
    isUpdating,
    isExportingToAnnualBudget,
    setEditingCategoryName,
    handleEdit,
    handleCancel,
    handleSave,
    deleteCategory,
    exportToAnnualBudget,
    confirmDelete,
  };
};

export default useCategoriesByRecordType;
