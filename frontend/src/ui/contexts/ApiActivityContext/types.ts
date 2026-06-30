export type ApiActivityStatus = "success" | "error";

export type ApiActivityState = {
  lastExecutionAt: Date | null;
  lastSource: string | null;
  lastStatus: ApiActivityStatus | null;
};

export type RegisterApiActivityPayload = {
  source: string;
  status: ApiActivityStatus;
};

export type ApiActivityContextValue = {
  activity: ApiActivityState;
  registerApiActivity: (payload: RegisterApiActivityPayload) => void;
};
