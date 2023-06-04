import type { Epic as _Epic } from "redux-observable";
import { ItemsActions } from "./actions";
import { ItemsState } from "./reducers";


export interface State {
    readonly items?: ItemsState;
}

export type Actions =
    | ItemsActions;

export type Epic = _Epic<Actions, Actions, State>;