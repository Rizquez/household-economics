import { useState } from "react";

import useDeleteCategory from "@/ui/pages/Categories/hooks/useDeleteCategory";
import useUpdateCategory from "@/ui/pages/Categories/hooks/useUpdateCategory";

const useCategoriesByRecordType = (recordTypeId: number) => {
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null,
  );
  const [editingCategoryName, setEditingCategoryName] = useState("");

  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

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

  return {
    editingCategoryId,
    editingCategoryName,
    isDeleting,
    isUpdating,
    setEditingCategoryName,
    handleEdit,
    handleCancel,
    handleSave,
    deleteCategory,
  };
};

export default useCategoriesByRecordType;