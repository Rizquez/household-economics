import { useState } from "react";

import useDeleteCategory from "@/ui/pages/Categories/hooks/useDeleteCategory";
import useUpdateCategory from "@/ui/pages/Categories/hooks/useUpdateCategory";
import useCreateBudgetGroupFromCategory from "@/ui/pages/Categories/hooks/useCreateBudgetGroupFromCategory";

const useCategoriesByRecordType = (recordTypeId: number) => {
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
  };
};

export default useCategoriesByRecordType;
