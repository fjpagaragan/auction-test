import type { Epic as _Epic } from "redux-observable";
import { CreateItemActions, ItemsActions } from "@item/actions";
import { CreateItemState, ItemsState } from "@item/reducers";


export interface State {
    readonly items?: ItemsState;
    readonly createItem?: CreateItemState;
}

export type Actions =
    | ItemsActions
    | CreateItemActions;

export type Epic = _Epic<Actions, Actions, State>;