import axios from "axios";
import { ApiError } from "../utils/errorTypes";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
export const getAPIPath = (path: string) => `${API_BASE_URL}/api/${path}`;

export async function request<TData>(
  path: string,
  params = {},
): Promise<TData> {
  return axios({ ...params, url: path })
    .then(({ data }) => data as TData)
    .catch(error => {
      throw new ApiError(error, "src/api/index.js");
    });
}

export async function postFormData(
  path: string,
  formData: FormData,
): Promise<void> {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  return axios.post<any, void>(path, formData, config).catch(error => {
    throw new ApiError(error, "src/api/index.js");
  });
}
