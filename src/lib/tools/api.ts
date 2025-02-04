import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { STATIONERY_API, STATIONERY_API_TIMEOUT } from "../constants/api";
import { ISignUpRequest } from "../types/requests/user.type";
import { ISignUpResponse, IUserResponse } from "../types/responses/user.type";
import { getCookie } from "./cookies";

const Stationery_API = axios.create({
  baseURL: STATIONERY_API,
  timeout: STATIONERY_API_TIMEOUT,
});

/**
 * Fetches data from a given URL using axios and handles any errors.
 *
 * @template T - Expected response data type.
 * @template E - Expected error type.
 * @param {string} url - The API endpoint to fetch data from.
 * @param {AxiosRequestConfig} [options={}] - Optional axios request configuration.
 * @returns {Promise<T>} - The data retrieved from the API.
 * @throws {E} - Throws an error of type `E` if the request fails.
 */
export const fetchData = async <T, E = unknown>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await Stationery_API.get(url, options);
    return response.data;
  } catch (error) {
    console.error('Error retrieving data:', error);

    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as E;
    }

    throw new Error('Could not get data') as E;
  }
};

/**
 * Sends a POST request to a given URL using axios and handles errors.
 *
 * @template T
 * @param {string} url - The API endpoint to post data to.
 * @param {Record<string, any>} options - The data to be sent in the POST request.
 * @param {AxiosRequestConfig<any>} [config] - The axios request config to be sent in the POST request.
 * @returns {Promise<T>} - The response data.
 * @throws Will throw an error if the request fails.
 */
export const postData = async <T>(
  url: string,
  options: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await Stationery_API.post(
      url,
      options,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data.error;
    } else {
      throw new Error('Unknown error while request');
    }
  }
};

export const signUp = async (
  user: ISignUpRequest,
): Promise<ISignUpResponse> => {
  return postData<ISignUpResponse>('/auth/signup', {
    ...user,
  });
};

export const checkUser = async (): Promise<IUserResponse | null> => {
  const token = await getCookie(process.env.NEXT_PUBLIC_TOKEN_NAME!);
  if(!token) return null;
  return fetchData<IUserResponse>('/users/me', {
    headers: {
      'Authorization': `Bearer ${token.value}`
    }
  });
}