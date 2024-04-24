import { axios, axiosPrivate } from './axios';
import { ResponseCallback, responseCallback } from './responseCallback';
import {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  Method,
  RawAxiosRequestHeaders,
} from 'axios';

import { ApiPaths } from './apiPaths';
import { store } from '../Stores';
import { setLoading } from '../Stores/slices/common.slice';
import { asyncSignOut } from '../Stores/actions/user.action';

export interface CallApi<T> {
  path?: ApiPaths;
  method?: Method;
  body?: T;
  token?: string;
  isFormData?: boolean;
  axiosSecure?: boolean;
  options?: AxiosRequestConfig;
  headers?: RawAxiosRequestHeaders | AxiosHeaders;
}

export const callApi = async <RT, T = undefined>({
  path,
  method = 'GET',
  body,
  token,
  isFormData = false,
  axiosSecure = true,
  options: ops = {},
  headers: customHeaders = {},
}: CallApi<T>): Promise<ResponseCallback<RT>> => {
  let headers: RawAxiosRequestHeaders | AxiosHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'en-US',
  };

  console.log(path, 'path');

  const options: AxiosRequestConfig = {
    method,
    ...ops,
  };

  if (isFormData) {
    headers = {
      'Content-Type': 'multipart/form-data',
    };
  }

  if (axiosSecure) {
    const { token: userToken } = store.getState().user ?? {};
    if (userToken) {
      token = userToken;
    }
  }

  if (token && axiosSecure) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (!token && axiosSecure) {
    await store.dispatch(asyncSignOut()).unwrap();
    return { status: false, message: 'Token Expired, Signing you out!' };
  }

  options.headers = { ...headers, ...customHeaders };

  if (body) {
    options.data = body;
  }

  options.url = path;

  const axiosInstance: AxiosInstance = axiosSecure ? axiosPrivate : axios;

  return axiosInstance(options)
    .then(responseCallback<RT>)
    .catch((err: AxiosError<ResponseCallback<RT>>) => {
      console.log(err, 'api Error');
      store.dispatch(setLoading(false));
      if (err.response) {
        return responseCallback<RT>(err.response);
      }
    }) as Promise<ResponseCallback<RT>>;
};
