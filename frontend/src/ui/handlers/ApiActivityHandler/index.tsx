import { useEffect } from "react";
import httpClient from "@/core/client/httpClient";
import { useApiActivity } from "@/ui/contexts/ApiActivityContext/hooks/useApiActivity";
import { getRequestSource } from "./utils/source";

const ApiActivityHandler = () => {
  const { registerApiActivity } = useApiActivity();

  useEffect(() => {
    const responseInterceptorId = httpClient.interceptors.response.use(
      (response) => {
        registerApiActivity({
          source: getRequestSource(response.config.url),
          status: "success",
        });

        return response;
      },
      (error) => {
        registerApiActivity({
          source: getRequestSource(error.config?.url),
          status: "error",
        });

        return Promise.reject(error);
      },
    );

    return () => {
      httpClient.interceptors.response.eject(responseInterceptorId);
    };
  }, [registerApiActivity]);

  return null;
};

export default ApiActivityHandler;
