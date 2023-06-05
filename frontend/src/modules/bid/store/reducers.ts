import { Reducer } from "redux";
import { MakeBidApiResponse } from "@bid/response";
import { AjaxStateObject } from "@utils/ajax-util";
import { 
    MAKE_BID, 
    MAKE_BID_FAIL, 
    MAKE_BID_SUCCESS, 
    MakeBidActions 
} from "@bid/actions";


export interface MakeBidState {
    makeBid?: AjaxStateObject<MakeBidApiResponse>;
};

export const makeBidReducer: Reducer<
    MakeBidState,
    MakeBidActions
> = (
    state = {},
    action,
) => {
    switch (action.type) {
        case MAKE_BID:
            return {
                ...state,
                makeBid: {
                    loading: true,
                }
            };

        case MAKE_BID_SUCCESS:
            return {
                ...state,
                makeBid: {
                    loading: false,
                    success: action.payload,
                }
            };

        case MAKE_BID_FAIL:
            return {
                ...state,
                makeBid: {
                    loading: false,
                    error: action.payload,
                }
            };
    
        default:
            return state;
    }
};