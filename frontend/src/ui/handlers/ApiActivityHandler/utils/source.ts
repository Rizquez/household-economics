export const getRequestSource = (url?: string) => {
  if (!url) return "unknown-repository";

  return url;
};
