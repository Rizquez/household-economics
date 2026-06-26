import { useHead } from "@unhead/react";
import type { PageLoaderProps } from "./types";
const PageLoader = ({
  component: Component,
  title,
}: Readonly<PageLoaderProps>) => {
  useHead({ title });

  return <Component />;
};

export default PageLoader;
