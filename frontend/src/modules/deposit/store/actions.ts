import { DepositApiParameters, DepositApiResponse } from "@deposit/response";
import { Action, ActionCreator } from "redux";
import { AjaxError } from "rxjs/ajax";


export const GET_DEPOSIT = "GET_DEPOSTI";
export const GET_DEPOSIT_SUCCESS = "GET_DEPOSIT_SUCCESS";
export const GET_DEPOSIT_FAIL = "GET_DEPOSIT_FAIL";

export const CLEAR_DEPOSIT = "CLEAR_DEPOSIT";

export type DepositAction =
    | GetDepositAction
    | GetDepositSuccessAction
    | GetDepositFailAction
    | ClearDepositAction;


export interface GetDepositAction extends Action {
    type: typeof GET_DEPOSIT;
    payload: DepositApiParameters;
};

export interface GetDepositSuccessAction extends Action {
    type: typeof GET_DEPOSIT_SUCCESS;
    payload: DepositApiResponse;
};

export interface GetDepositFailAction extends Action {
    type: typeof GET_DEPOSIT_FAIL;
    payload: AjaxError;
};

export interface ClearDepositAction extends Action {
    type: typeof CLEAR_DEPOSIT;
}

export const GetDeposit: ActionCreator<GetDepositAction> = (
    payload: DepositApiParameters,
) => ({
    type: GET_DEPOSIT,
    payload,
});


export const GetDepositSuccess: ActionCreator<GetDepositSuccessAction> = (
    payload: DepositApiResponse,
) => ({
    type: GET_DEPOSIT_SUCCESS,
    payload,
});

export const GetDepositFail: ActionCreator<GetDepositFailAction> = (
    payload: AjaxError,
) => ({
    type: GET_DEPOSIT_FAIL,
    payload,
});

export const ClearDeposit: ActionCreator<ClearDepositAction> = () => ({
    type: CLEAR_DEPOSIT,
});

