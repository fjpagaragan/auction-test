import { MakeBidApiParameters, MakeBidApiResponse } from "@bid/response";
import { Action, ActionCreator } from "redux";
import { AjaxError } from "rxjs/ajax";


export const MAKE_BID = "MAKE_BID";
export const MAKE_BID_SUCCESS = "MAKE_BID_SUCCESS";
export const MAKE_BID_FAIL = "MAKE_BID_FAIL";

export type MakeBidActions =
    | MakeBidAction
    | MakeBidSuccessAction
    | MakeBidFailAction;

export interface MakeBidAction extends Action {
    type: typeof MAKE_BID;
    payload: MakeBidApiParameters;
};

export interface MakeBidSuccessAction extends Action {
    type: typeof MAKE_BID_SUCCESS;
    payload: MakeBidApiResponse;
};

export interface MakeBidFailAction extends Action {
    type: typeof MAKE_BID_FAIL;
    payload: AjaxError;
};

export const MakeBid: ActionCreator<MakeBidAction> = (
    payload: MakeBidApiParameters,
) => ({
    type: MAKE_BID,
    payload,
});

export const MakeBidSuccess: ActionCreator<MakeBidSuccessAction> = (
    payload: MakeBidApiResponse,
) => ({
    type: MAKE_BID_SUCCESS,
    payload,
});

export const MakeBidFail: ActionCreator<MakeBidFailAction> = (
    payload: AjaxError,
) => ({
    type: MAKE_BID_FAIL,
    payload,
});