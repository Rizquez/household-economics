import type { FamilyMember } from "@/core/business/family/types";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import useRemoveFamilyMember from "./useRemoveFamilyMember";

const useFamilyMembersControls = () => {
  const { showModal } = useModal();

  const { mutate: removeFamilyMember, isPending: isRemoving } =
    useRemoveFamilyMember();

  const confirmRemove = (member: FamilyMember) => {
    showModal({
      type: "warning",
      title: "Remove family member",
      message: `${member.name} will lose access to the application until they are invited again. Are you sure you want to remove this member?`,
      confirmText: "Remove",
      cancelText: "Cancel",
      onConfirm: () => removeFamilyMember(member.userId),
    });
  };

  return {
    isRemoving,
    confirmRemove,
  };
};

export default useFamilyMembersControls;
