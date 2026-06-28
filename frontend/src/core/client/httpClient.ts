import axios from "axios";
import { API_URL } from "@/core/env";
import ApplicationError from "@/core/errors";
import { getAuthToken } from "@/core/auth/token";

const httpClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

httpClient.interceptors.request.use(async (config) => {
  const token = await getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const detail = error.response?.data?.detail;
    const message = typeof detail === "string" ? detail : error.message;

    throw new ApplicationError(
      message,
      error.response?.status,
      error.response?.data,
    );
  },
);

export default httpClient;
