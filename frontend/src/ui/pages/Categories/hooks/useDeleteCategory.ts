import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCategory } from "@/core/business/category/services";
import { CATEGORIES_QUERY_KEY } from "./constants/keys";
import { useModal } from "@/ui/contexts/ModalContext/useModal";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { showLoading, showModal, closeModal } = useModal();

  return useMutation({
    mutationFn: deleteCategory.execute,

    onMutate: () => {
      showLoading("Deleting category", "Please wait...");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [CATEGORIES_QUERY_KEY],
      });

      closeModal();
    },

    onError: (error) => {
      showModal({
        type: "error",
        title: "Delete category",
        message: error.message,
      });
    },
  });
};

export default useDeleteCategory;
