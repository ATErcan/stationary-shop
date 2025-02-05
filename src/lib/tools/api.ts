import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { STATIONERY_API, STATIONERY_API_TIMEOUT } from "../constants/api";
import { ILoginRequest, ISignUpRequest, IUpdateProfileRequest } from "../types/requests/user.type";
import { ILoginResponse, ISignUpResponse, IUserResponse } from "../types/responses/user.type";
import { getCookie } from "./cookies";
import { IAllProductsResponse, IProductResponse } from "../types/responses/product.type";
import { buildParams } from "../utils";
import { ProductQueryParams } from "../types/product.type";
import { ICartResponse, IUpdatedCartResponse } from "../types/responses/cart.type";

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
export const fetchData = async <T>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await Stationery_API.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error || "An unknown error occurred.";
      throw new Error(errorMessage);
    }
    throw new Error("Could not get data");
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
      const errorMessage =
        error.response?.data?.error || "An unknown error occurred.";
        throw new Error(errorMessage);
    } else {
      throw new Error('Unknown error while request');
    }
  }
};

export const patchData = async <T>(
  url: string,
  options: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await Stationery_API.patch(
      url,
      options,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error || "An unknown error occurred.";
      throw new Error(errorMessage);
    } else {
      throw new Error("Unknown error while request");
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

export const login = async (
  user: ILoginRequest,
): Promise<ILoginResponse> => {
  return postData<ILoginResponse>('/auth/login', {
    ...user,
  });
};

export const getUser = async (): Promise<IUserResponse | null> => {
  const token = await getCookie(process.env.NEXT_PUBLIC_TOKEN_NAME!);
  if(!token) return null;
  return fetchData<IUserResponse>('/users/me', {
    headers: {
      'Authorization': `Bearer ${token.value}`
    }
  });
}

export const updateProfile = async (
  user: IUpdateProfileRequest
): Promise<IUserResponse | null> => {
  const token = await getCookie(process.env.NEXT_PUBLIC_TOKEN_NAME!);
  if (!token) return null;
  return patchData<IUserResponse>(
    "/users/me",
    { ...user },
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
};

export const getAllProducts = async (params: ProductQueryParams = {}): Promise<IAllProductsResponse> => {
  const queryString = buildParams(params);
  const url = `/products${queryString ? `?${queryString}` : ""}`;
  return fetchData<IAllProductsResponse>(url);
};

export const getProduct = async (id: string): Promise<IProductResponse> => {
  return fetchData<IProductResponse>(`products/${id}`)
}

export const getCart = async (): Promise<ICartResponse | null> => {
  const token = await getCookie(process.env.NEXT_PUBLIC_TOKEN_NAME!);
  if (!token) return null;
  return fetchData<ICartResponse>("/cart", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
};

export const updateCart = async (
  data: { productId: string, quantity: number }
): Promise<IUpdatedCartResponse | null> => {
  const token = await getCookie(process.env.NEXT_PUBLIC_TOKEN_NAME!);
  if (!token) return null;
  return postData<IUpdatedCartResponse>(
    "/cart",
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
}