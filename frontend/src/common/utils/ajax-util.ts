import { Observable, throwError } from "rxjs";
import { ajax, AjaxError } from "rxjs/ajax";
import { catchError, retry, switchMap } from "rxjs/operators";

import { getUserCookie } from "./get-cookie";

const DEFAULT_REQUEST_TIMEOUT = 1000 * 30;
const DEFAULT_REQUEST_RETRIES = 1;

export interface RequestOptions {
  readonly baseURL?: string;
  readonly headers?: Record<string, unknown>;
  readonly timeout?: number;
  readonly retries?: number;
  readonly url: string;
  readonly params?: Record<string, unknown>;
}

export interface ResponseHeaders {
  readonly [key: string]: string;
}

export interface ApiResponse<
  R,
  H extends ResponseHeaders = Record<string, string>,
> {
  readonly response: R;
  readonly data?: R;
  readonly headers: H;
}

export interface AjaxState {
  success: boolean;
  loading: boolean;
  error: boolean;
}

export type AjaxStateObject<T> = Omit<AjaxState, "success" | "error"> & {
  success?: T;
  error?: AjaxError;
};

const setupAuthorizationHeader = (
  token: string,
): Record<string, string> => {
  const authorizationHeader = {
    Authorization: `Bearer ${token}`,
  };

  return authorizationHeader;
};

const getHeaders = (
  headers: Record<string, unknown> | undefined,
  token: string,
): Record<string, string> => {
  return Object.assign(
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    headers,
    setupAuthorizationHeader(token),
  );
};

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

const _request = <R>(
  method: HTTPMethod,
  requestOptions: RequestOptions,
  body?: unknown,
): Observable<ApiResponse<R>> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
    return getUserCookie().pipe(
        switchMap((session) =>
        ajax<R>({
            method,
            body,
            url: requestOptions.url,
            headers: getHeaders(requestOptions.headers, session.token),
            responseType: "json",
            timeout: DEFAULT_REQUEST_TIMEOUT,
            ...(requestOptions.params !== undefined
            ? { queryParams: Object.assign(requestOptions.params) }
            : {}),
        }),
        ),
        retry(requestOptions.retries ?? DEFAULT_REQUEST_RETRIES),
        catchError((error: AjaxError) => {
        return throwError(error);
        }),
    );

};

export const ajaxGet = <R>(
  requestOptions: RequestOptions,
): Observable<ApiResponse<R>> => {
  return _request<R>("GET", requestOptions);
};

export const ajaxPost = <R>(
  requestOptions: RequestOptions,
  body: unknown,
): Observable<ApiResponse<R>> => {
  return _request<R>("POST", requestOptions, body);
};

export const ajaxPut = <R>(
  requestOptions: RequestOptions,
  body: unknown,
): Observable<ApiResponse<R>> => {
  return _request<R>("PUT", requestOptions, body);
};

export const ajaxDelete = <R>(
  requestOptions: RequestOptions,
  body?: unknown,
): Observable<ApiResponse<R>> => {
  return _request<R>("DELETE", requestOptions, body);
};
