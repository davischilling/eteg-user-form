import axios, { AxiosInstance } from 'axios';

import { errorVerifier } from '../utils/error-verifier';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 6000,
}) as AxiosInstance;

api.interceptors.response.use(
  (response) => response,
  async (RequestError) => {
    const errorResponse = RequestError.response;
    if (errorResponse && errorResponse.data) {
      return Promise.reject(errorVerifier(errorResponse));
    } else {
      return Promise.reject(RequestError);
    }
  },
);

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

export { api };
