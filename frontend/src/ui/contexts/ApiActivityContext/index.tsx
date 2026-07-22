import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { API_URL } from "@/core/env";
import { ApiActivityContext } from "./context";
import type { ApiActivityState, RegisterApiActivityPayload } from "./types";

const KEEP_ALIVE_DELAY_MS = 14 * 60 * 1000;

const INITIAL_STATE: ApiActivityState = {
  lastExecutionAt: null,
  lastSource: null,
  lastStatus: null,
};

export const ApiActivityProvider = ({ children }: { children: ReactNode }) => {
  const [activity, setActivity] = useState<ApiActivityState>(INITIAL_STATE);

  const registerApiActivity = useCallback(
    ({ source, status }: RegisterApiActivityPayload) => {
      setActivity({
        lastExecutionAt: new Date(),
        lastSource: source,
        lastStatus: status,
      });
    },
    [],
  );

  const keepAlive = useCallback(async () => {
    try {
      await fetch(`${API_URL}/`, {
        method: "GET",
      });

      registerApiActivity({
        source: "root-api",
        status: "success",
      });
    } catch {
      registerApiActivity({
        source: "root-api",
        status: "error",
      });
    }
  }, [registerApiActivity]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void keepAlive();
    }, KEEP_ALIVE_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activity.lastExecutionAt, keepAlive]);

  const value = useMemo(
    () => ({
      activity,
      registerApiActivity,
    }),
    [activity, registerApiActivity],
  );

  return (
    <ApiActivityContext.Provider value={value}>
      {children}
    </ApiActivityContext.Provider>
  );
};
