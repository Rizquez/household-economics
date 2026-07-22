import { useEffect } from "react";
import useFamilyUser from "@/ui/hooks/useFamilyUser";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import useFamilyMembers from "../components/FamilyMembers/hooks/useFamilyMembers";
import useCurrencyTypes from "./useCurrencyTypes";

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

  const {
    currencyTypes,
    isPending: areCurrencyTypesPending,
    isError: areCurrencyTypesError,
    error: currencyTypesError,
  } = useCurrencyTypes();

  const { showLoading, showModal, closeModal } = useModal();

  const isPending =
    isFamilyPending || areMembersPending || areCurrencyTypesPending;
  const isError = isFamilyError || areMembersError || areCurrencyTypesError;
  const error = familyError ?? membersError ?? currencyTypesError;

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
    currencyTypes,
    isReady: !isPending && !isError,
  };
};

export default useFamilyManagementPage;
