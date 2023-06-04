import { ItemApiParameters, ItemApiResponse } from "@item/response";
import { Action, ActionCreator } from "redux";
import { AjaxError } from "rxjs/ajax";

export const GET_ITEMS = "GET_ITEMS";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAIL = "GET_ITEMS_FAIL";

export const CLEAR_ITEMS = "CLEAR_ITEMS";

export type ItemsActions =
    | GetItemsAction
    | GetItemsSuccessAction
    | GetItemsFailAction
    | ClearItemsAction

export interface GetItemsAction extends Action {
    type: typeof GET_ITEMS;
    payload: ItemApiParameters;
};

export interface GetItemsSuccessAction extends Action {
    type: typeof GET_ITEMS_SUCCESS;
    payload: ItemApiResponse[];
};

export interface GetItemsFailAction extends Action {
    type: typeof GET_ITEMS_FAIL;
    payload: AjaxError;
};

export interface ClearItemsAction extends Action {
    type: typeof CLEAR_ITEMS;
};

export const GetItems: ActionCreator<GetItemsAction> = (
    payload: ItemApiParameters,
) => ({
    type: GET_ITEMS,
    payload
});

export const GetItemsSuccess: ActionCreator<GetItemsSuccessAction> = (
    payload: ItemApiResponse[],
) => ({
    type: GET_ITEMS_SUCCESS,
    payload
});

export const GetItemsFail: ActionCreator<GetItemsFailAction> = (
    payload: AjaxError,
) => ({
    type: GET_ITEMS_FAIL,
    payload,
});

export const ClearItems: ActionCreator<ClearItemsAction> = () => ({
    type: CLEAR_ITEMS,
});