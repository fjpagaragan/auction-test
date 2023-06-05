import { Reducer } from "redux";
import { DepositApiResponse } from "@deposit/response";
import { AjaxStateObject } from "@utils/ajax-util";
import { 
    CLEAR_DEPOSIT,
    GetDepositActions, 
    GET_DEPOSIT, 
    GET_DEPOSIT_FAIL, 
    GET_DEPOSIT_SUCCESS, 
    MakeDepositActions,
    MAKE_DEPOSIT,
    MAKE_DEPOSIT_SUCCESS,
    MAKE_DEPOSIT_FAIL
} from "@deposit/actions";


export interface GetDepositState {
    deposit?: AjaxStateObject<DepositApiResponse>;
};

export interface MakeDepositState {
    makeDeposit?: AjaxStateObject<DepositApiResponse>;
}

export const depositReducer: Reducer<
    GetDepositState,
    GetDepositActions
> = (
    state = {},
    action
) => {
    switch (action.type) {
        case GET_DEPOSIT:
            return {
                ...state,
                deposit: {
                    loading: true,
                }
            };

        case GET_DEPOSIT_SUCCESS:
            return {
                ...state,
                deposit: {
                    loading: false,
                    success: action.payload,
                }
            };

        case GET_DEPOSIT_FAIL:
            return {
                ...state,
                deposit: {
                    loading: false,
                    error: action.payload,
                }
            };

        case CLEAR_DEPOSIT:
            return {};
    
        default:
            return state;
    }
}

export const makeDepositReducer: Reducer<
    MakeDepositState,
    MakeDepositActions
> = (
    state = {},
    action
) => {
    switch (action.type) {
        case MAKE_DEPOSIT:
            return {
                ...state,
                makeDeposit: {
                    loading: true,
                }
            };

        case MAKE_DEPOSIT_SUCCESS:
            return {
                ...state,
                makeDeposit: {
                    loading: false,
                    success: action.payload,
                }
            };

        case MAKE_DEPOSIT_FAIL:
            return {
                ...state,
                makeDeposit: {
                    loading: false,
                    error: action.payload,
                }
            }
    
        default:
            return state;
    }
}