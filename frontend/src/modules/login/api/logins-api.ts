import { Observable, map } from "rxjs";
import { AuthenticateUserResponse, CreateUserResponse, UserApiParameters } from "@login/response";
import { ajaxPost } from "@utils/ajax-util";
import { AUTHENTICATE_API, USER_API } from "@utils/api/api-url";


export const createUser = (
    params: UserApiParameters,
): Observable<CreateUserResponse> => {
    const url = USER_API;
    const body = { ...params.user };

    return ajaxPost<CreateUserResponse>({ url }, { ...body })
        .pipe(
            map(({response}) => response),
        );
}

export const authUser = (
    params: UserApiParameters,
): Observable<AuthenticateUserResponse> => {
    const url = AUTHENTICATE_API;
    const body = { ...params.user };

    return ajaxPost<AuthenticateUserResponse>({ url }, { ...body })
        .pipe(
            map(({response}) => response),
        );
}