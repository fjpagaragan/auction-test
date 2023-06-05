import type { Epic as _Epic } from "redux-observable";
import { DepositState } from "@deposit/reducers";
import { DepositAction } from "@deposit/actions";



export interface State {
    readonly deposit?: DepositState;
}

export type Actions =
    | DepositAction;

export type Epic = _Epic<Actions, Actions, State>;