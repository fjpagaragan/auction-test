import { ItemApiResponse } from "@item/response";
import { AjaxStateObject } from "@utils/ajax-util";
import { Reducer } from "redux";
import { CLEAR_ITEMS, GET_ITEMS, GET_ITEMS_FAIL, GET_ITEMS_SUCCESS, ItemsActions } from "./actions";



export interface ItemsState {
    items?: AjaxStateObject<ItemApiResponse[]>;
};

export const itemsReducer: Reducer<ItemsState, ItemsActions> = (
    state = {},
    action,
) => {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: {
                    loading: true,
                }
            };

        case GET_ITEMS_SUCCESS:
            return {
                ...state,
                items: {
                    loading: false,
                    success: action.payload,
                }
            };
        
        case GET_ITEMS_FAIL:
            return {
                ...state,
                items: {
                    loading: false,
                    error: action.payload,
                }
            };
        
        case CLEAR_ITEMS:
            return {};

        default:
            return state;
    }
};