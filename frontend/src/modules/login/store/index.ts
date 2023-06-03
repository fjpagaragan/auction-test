import type { Epic as _Epic } from "redux-observable";
import { AuthenticateUserState, CreateUserState } from "@login/reducers";
import { AuthenticateUserActions, CreateUserActions } from "./actions";


export interface State {
    readonly createUser?: CreateUserState,
    readonly authenticateUser?: AuthenticateUserState
};

export type Actions =
    | CreateUserActions
    | AuthenticateUserActions;

export type Epic = _Epic<Actions, Actions, State>;