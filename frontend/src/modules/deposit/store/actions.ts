import { DepositApiParameters, DepositApiResponse } from "@deposit/response";
import { Action, ActionCreator } from "redux";
import { AjaxError } from "rxjs/ajax";


export const GET_DEPOSIT = "GET_DEPOSTI";
export const GET_DEPOSIT_SUCCESS = "GET_DEPOSIT_SUCCESS";
export const GET_DEPOSIT_FAIL = "GET_DEPOSIT_FAIL";

export const MAKE_DEPOSIT = "MAKE_DEPOSIT";
export const MAKE_DEPOSIT_SUCCESS = "MAKE_DEPOSIT_SUCCESS";
export const MAKE_DEPOSIT_FAIL = "MAKE_DEPOSIT_FAIL";

export const CLEAR_DEPOSIT = "CLEAR_DEPOSIT";

export type GetDepositActions =
    | GetDepositAction
    | GetDepositSuccessAction
    | GetDepositFailAction
    | ClearDepositAction;

export type MakeDepositActions =
    | MakeDepositAction
    | MakeDepositSuccessAction
    | MakeDepositFailAction;


export interface GetDepositAction extends Action {
    type: typeof GET_DEPOSIT;
};

export interface GetDepositSuccessAction extends Action {
    type: typeof GET_DEPOSIT_SUCCESS;
    payload: DepositApiResponse;
};

export interface GetDepositFailAction extends Action {
    type: typeof GET_DEPOSIT_FAIL;
    payload: AjaxError;
};

export interface MakeDepositAction extends Action {
    type: typeof MAKE_DEPOSIT;
    payload: DepositApiParameters;
}

export interface MakeDepositSuccessAction extends Action {
    type: typeof MAKE_DEPOSIT_SUCCESS,
    payload: DepositApiResponse;
};

export interface MakeDepositFailAction extends Action {
    type: typeof MAKE_DEPOSIT_FAIL,
    payload: AjaxError;
}

export interface ClearDepositAction extends Action {
    type: typeof CLEAR_DEPOSIT;
}

export const GetDeposit: ActionCreator<GetDepositAction> = (
) => ({
    type: GET_DEPOSIT,
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

export const MakeDeposit: ActionCreator<MakeDepositAction> = (
    payload: DepositApiParameters,
) => ({
    type: MAKE_DEPOSIT,
    payload,
});

export const MakeDepositSuccess: ActionCreator<MakeDepositSuccessAction> = (
    payload: DepositApiResponse,
) => ({
    type: MAKE_DEPOSIT_SUCCESS,
    payload,
});

export const MakeDepositFail: ActionCreator<MakeDepositFailAction> = (
    payload: AjaxError,
) => ({
    type: MAKE_DEPOSIT_FAIL,
    payload,
});

export const ClearDeposit: ActionCreator<ClearDepositAction> = () => ({
    type: CLEAR_DEPOSIT,
});

