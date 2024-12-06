import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
import { tokenManager } from "./tokenManagement";


export const baseURL = import.meta.env.VITE_API_BASE_URL;
// export const baseURL='https://dev.epay.sbi/2.0'

const tm = tokenManager();

const createApiClient = (retries: number): AxiosInstance => {
  const authToken = tm.getToken();
  const apiClient: AxiosInstance = axios.create({
    baseURL: baseURL, //API base URL
    timeout: 10000, // Request timeout in milliseconds
  });

  // Request interseptor for setting Authentication header.
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = authToken
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  //Response interseptor for error handling.
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      //you can handel specific error statuses here
      if (error.response?.status === 401) {
        console.error('Unauthorized, redicrecting to home pagge')
      }
      return Promise.reject(error)
    }
  )

  axiosRetry(apiClient, {
    retries,
    retryDelay: (retryCount) => {
      return axiosRetry.exponentialDelay(retryCount); // Exponential backoff
    },
    retryCondition: (error) => {
      return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status == 500;
    },
  });

  return apiClient;
};

export default createApiClient;
