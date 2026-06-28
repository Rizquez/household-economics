let getTokenHandler: (() => Promise<string | null>) | null = null;

export const setGetTokenHandler = (handler: () => Promise<string | null>) => {
  getTokenHandler = handler;
};

export const getAuthToken = async () => {
  if (!getTokenHandler) return null;

  return getTokenHandler();
};