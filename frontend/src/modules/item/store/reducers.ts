import { ItemApiResponse } from "@item/response";
import { AjaxStateObject } from "@utils/ajax-util";
import { Reducer } from "redux";
import { 
    CLEAR_ITEMS, 
    CREATE_ITEM, 
    CREATE_ITEM_FAIL, 
    CREATE_ITEM_SUCCESS, 
    CreateItemActions, 
    GET_ITEMS, 
    GET_ITEMS_FAIL, 
    GET_ITEMS_SUCCESS, 
    ItemsActions 
} from "@item/actions";



export interface ItemsState {
    items?: AjaxStateObject<ItemApiResponse[]>;
};

export interface CreateItemState {
    createItem?: AjaxStateObject<ItemApiResponse>;
}

export const itemsReducer: Reducer<
    ItemsState, 
    ItemsActions
> = (
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

export const createItemReducer: Reducer<
    CreateItemState, 
    CreateItemActions
> = (
    state = {},
    action,
) => {
    switch (action.type) {
        case CREATE_ITEM:
            return {
                ...state,
                createItem: {
                    loading: true
                }
            };
        
        case CREATE_ITEM_SUCCESS:
            return {
                ...state,
                createItem: {
                    loading: false,
                    success: action.payload,
                }
            };
        
        case CREATE_ITEM_FAIL:
            return {
                ...state,
                createItem: {
                    loading: false,
                    error: action.payload,
                }
            };
        
        default:
            return state;
    }
}