import { Reducer } from "redux";
import { DepositApiResponse } from "@deposit/response";
import { AjaxStateObject } from "@utils/ajax-util";
import { 
    CLEAR_DEPOSIT,
    DepositAction, 
    GET_DEPOSIT, 
    GET_DEPOSIT_FAIL, 
    GET_DEPOSIT_SUCCESS 
} from "@deposit/actions";


export interface DepositState {
    deposit?: AjaxStateObject<DepositApiResponse>;
};

export const depositReducer: Reducer<
    DepositState,
    DepositAction
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