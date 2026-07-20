import { useEffect } from "react";
import useFamilyUser from "@/ui/components/Sidebar/hooks/useFamilyUser";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import useFamilyMembers from "../components/FamilyMembers/hooks/useFamilyMembers";

const useFamilyManagementPage = () => {
  const {
    family,
    isPending: isFamilyPending,
    isError: isFamilyError,
    error: familyError,
  } = useFamilyUser();
  const {
    familyMembers,
    isPending: areMembersPending,
    isError: areMembersError,
    error: membersError,
  } = useFamilyMembers();

  const { showLoading, showModal, closeModal } = useModal();

  const isPending = isFamilyPending || areMembersPending;
  const isError = isFamilyError || areMembersError;
  const error = familyError ?? membersError;

  useEffect(() => {
    if (isPending) {
      showLoading("Loading family", "Please wait...");
      return;
    }

    if (isError) {
      showModal({
        type: "error",
        title: "Error loading family",
        message: error?.message ?? "Unexpected error",
      });

      return;
    }

    closeModal();
  }, [isPending, isError, error, showLoading, showModal, closeModal]);

  return {
    family,
    familyMembers,
    isReady: !isPending && !isError,
  };
};

export default useFamilyManagementPage;
