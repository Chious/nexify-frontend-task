import axios, { AxiosResponse } from 'axios';

interface ApiResponse<T> {
  Success: boolean;
  Msg: string | null;
  Data: T | null;
}

const req = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000 * 15,
});

req.interceptors.response.use(
  response => {
    if (response.data) {
      const { Success, Msg, Data } = response.data;
      if (Success === false) {
        throw new Error(Msg || 'An error occurred');
      }
      return Data;
    }

    return response;
  },
  error => {
    return Promise.reject(error.response?.data?.Msg || 'An error occurred');
  }
);
async function apiRequest<T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any
): Promise<T> {
  try {
    const response = await req[method]<ApiResponse<T>>(url, data);
    return response as T;
  } catch (error: string | any) {
    throw error;
  }
}

export { apiRequest };
export default req;
