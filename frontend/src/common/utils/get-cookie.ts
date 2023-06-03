import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { AUTH_SESSION_URL, FRONT_END_INTEGRATION_API_IRL } from "./api/api-url";


export const getUserCookie = (): Observable<{ token: string }> =>
    ajax.getJSON<{ token: string;}>(
        `${FRONT_END_INTEGRATION_API_IRL}${AUTH_SESSION_URL}`
    );