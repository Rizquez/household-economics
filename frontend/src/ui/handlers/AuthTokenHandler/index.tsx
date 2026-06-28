import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

import { setGetTokenHandler } from "@/core/auth/token";

const AuthTokenHandler = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    setGetTokenHandler(getToken);
  }, [getToken]);

  return null;
};

export default AuthTokenHandler;