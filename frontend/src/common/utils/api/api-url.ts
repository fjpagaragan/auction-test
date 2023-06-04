import { getPublicRuntimeConfig } from "@utils/get-config";

export const APP_DOMAIN =
  getPublicRuntimeConfig("APP_DOMAIN") ?? "http://localhost:3000";

export const API_BASE_URL =
  getPublicRuntimeConfig("NEXT_PUBLIC_API_BASE_URL") ??
  "http://localhost:3030/v1";

export const AUTH_SESSION_URL = "/cookies";
export const FRONT_END_INTEGRATION_API_IRL = `${APP_DOMAIN}/api`;


export const AUTHENTICATE_API = `${API_BASE_URL}/authenticate`;
export const USER_API = `${API_BASE_URL}/users`;
export const ITEM_API = `${API_BASE_URL}/items`;