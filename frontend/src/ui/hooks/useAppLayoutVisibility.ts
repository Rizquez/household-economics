import { useIsFetching } from "@tanstack/react-query";

const useAppLayoutVisibility = (hasCondition: boolean = true) => {
  const blockingQueries = useIsFetching({
    predicate: (query) =>
      query.state.fetchStatus === "fetching" &&
      query.state.data === undefined &&
      query.meta?.blocksAppLayout !== false,
  });

  return {
    isVisible: blockingQueries === 0 && hasCondition,
  };
};

export default useAppLayoutVisibility;
