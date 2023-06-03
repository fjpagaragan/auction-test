import { of } from "rxjs";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { State, Epic } from "@login/store";
import { 
    AuthenticateUserState, 
    CreateUserState 
} from "@login/reducers";

import { AUTHENTICATE_USER, AuthenticateUserAction, AuthenticateUserFail, AuthenticateUserSuccess, CREATE_USER, CreateUserAction, CreateUserFail, CreateUserSuccess } from "@login/actions";
import { authUser, createUser } from "@login/api/logins-api";

export const selectCreateUser = (state: State): CreateUserState | undefined =>
    state.createUser;

export const selectAuthenticateUser = (state: State): AuthenticateUserState | undefined =>
    state.authenticateUser;

export const createUserEpic: Epic = (actions$) => {
    return actions$.pipe(
        filter(
            (action): action is CreateUserAction => action.type === CREATE_USER,
        ),
        switchMap(({ payload }) =>
            createUser(payload).pipe(
                map((response) => CreateUserSuccess(response)),
                catchError((error) => of(CreateUserFail(error))),
            ),
        ),
    );
};

export const authenticateUserEpic: Epic = (actions$) => {
    return actions$.pipe(
        filter(
            (action): action is AuthenticateUserAction => action.type === AUTHENTICATE_USER,
        ),
        switchMap(({ payload }) =>
            authUser(payload).pipe(
                map((response) => AuthenticateUserSuccess(response)),
                catchError((error) => of(AuthenticateUserFail(error))),
            ),
        ),
    );
}
