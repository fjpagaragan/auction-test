import { AuthenticateUserResponse, CreateUserResponse, UserApiParameters } from "@login/response";
import type { Action, ActionCreator } from "redux";
import { AjaxError } from "rxjs/ajax";


export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAIL = "CREATE_USER_FAIL";

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
export const AUTHENTICATE_USER_FAIL = "AUTHENTICATE_USER_FAIL";

export type CreateUserActions =
    | CreateUserAction
    | CreateUserSuccessAction
    | CreateUserFailAction;

export type AuthenticateUserActions =
    | AuthenticateUserAction
    | AuthenticateUserSuccessAction
    | AuthenticateUserFailAction;

export interface CreateUserAction extends Action {
    type: typeof CREATE_USER;
    payload: UserApiParameters
};

export interface CreateUserSuccessAction extends Action {
    type: typeof CREATE_USER_SUCCESS;
    payload: CreateUserResponse;
};

export interface CreateUserFailAction extends Action {
    type: typeof CREATE_USER_FAIL;
    payload: AjaxError;
}

export interface AuthenticateUserAction extends Action {
    type: typeof AUTHENTICATE_USER;
    payload: UserApiParameters;
}

export interface AuthenticateUserSuccessAction extends Action {
    type: typeof AUTHENTICATE_USER_SUCCESS;
    payload: AuthenticateUserResponse;
}

export interface AuthenticateUserFailAction extends Action {
    type: typeof AUTHENTICATE_USER_FAIL;
    payload: AjaxError;
}

export const CreateUser: ActionCreator<CreateUserAction> = (
    payload: UserApiParameters,
) => ({
    type: CREATE_USER,
    payload,
});

export const CreateUserSuccess: ActionCreator<CreateUserSuccessAction> = (
    payload: CreateUserResponse,
) => ({
    type: CREATE_USER_SUCCESS,
    payload,
});

export const CreateUserFail: ActionCreator<CreateUserFailAction> = (
    payload: AjaxError,
) => ({
    type: CREATE_USER_FAIL,
    payload,
});

export const AuthenticateUser: ActionCreator<AuthenticateUserAction> = (
    payload: UserApiParameters,
) => ({
    type: AUTHENTICATE_USER,
    payload,
});

export const AuthenticateUserSuccess: ActionCreator<AuthenticateUserSuccessAction> = (
    payload: AuthenticateUserResponse,
) => ({
    type: AUTHENTICATE_USER_SUCCESS,
    payload,
});

export const AuthenticateUserFail: ActionCreator<AuthenticateUserFailAction> = (
    payload: AjaxError,
) => ({
    type: AUTHENTICATE_USER_FAIL,
    payload,
});