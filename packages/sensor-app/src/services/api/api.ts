import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const http = axios.create({
  baseURL: `/api/`,
});

export async function get<T>(url: string, config?: AxiosRequestConfig) {
  try {
    const resp: AxiosResponse<T> = await http.get<T>(url, config);
    return resp.data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function post<T>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig
) {
  try {
    const resp: AxiosResponse<T> = await http.post<T>(url, data, config);
    return resp.data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function del<T>(url: string, config?: AxiosRequestConfig) {
  try {
    const resp: AxiosResponse<T> = await http.delete<T>(url, config);
    return resp.data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function put<T>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig
) {
  try {
    const resp: AxiosResponse<T> = await http.put<T>(url, data, config);
    return resp.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
