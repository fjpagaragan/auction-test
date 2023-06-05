import type { Epic as _Epic } from "redux-observable";
import { MakeBidState } from "./reducers";
import { MakeBidActions } from "./actions";


export interface State {
    readonly makeBid?: MakeBidState;
};

export type Actions =
    | MakeBidActions;

export type Epic = _Epic<Actions, Actions, State>;
