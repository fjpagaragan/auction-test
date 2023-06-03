import { getPublicRuntimeConfig } from "@utils/get-config";

export const APP_DOMAIN =
  getPublicRuntimeConfig("APP_DOMAIN") ?? "http://localhost:3000";

export const AUTH_SESSION_URL = "/auth/session";
export const FRONT_END_INTEGRATION_API_IRL = `${APP_DOMAIN}/api`;