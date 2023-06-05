import type { Epic as _Epic } from "redux-observable";
import { GetDepositState, MakeDepositState } from "@deposit/reducers";
import { GetDepositActions, MakeDepositActions } from "@deposit/actions";



export interface State {
    readonly deposit?: GetDepositState;
    readonly makeDeposit?: MakeDepositState;
}

export type Actions =
    | GetDepositActions
    | MakeDepositActions;

export type Epic = _Epic<Actions, Actions, State>;