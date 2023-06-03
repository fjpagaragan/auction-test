import type { Reducer } from "redux";

import { AjaxStateObject } from "@utils/ajax-util";

import { 
    AuthenticateUserResponse, 
    CreateUserResponse 
} from "@login/response";

import { 
    AUTHENTICATE_USER,
    AUTHENTICATE_USER_FAIL,
    AUTHENTICATE_USER_SUCCESS,
    AuthenticateUserActions,
    CREATE_USER, 
    CREATE_USER_FAIL, 
    CREATE_USER_SUCCESS, 
    CreateUserActions 
} from "@login/actions";

export interface CreateUserState {
    createUser?: AjaxStateObject<CreateUserResponse>;
}

export interface AuthenticateUserState {
    authenicateUser?: AjaxStateObject<AuthenticateUserResponse>;
}

export const createUserReducer: Reducer<
    CreateUserState, 
    CreateUserActions
> = (
    state = {},
    action
) => {
    switch(action.type) {
        case CREATE_USER:
            return {
                ...state,
                createUser: {
                    loading: true,
                },
            };

        case CREATE_USER_SUCCESS:
            return {
                ...state,
                createUser: {
                    loading: false,
                    success: action.payload,
                },
            };

        case CREATE_USER_FAIL:
            return {
                ...state,
                createUser: {
                    loading: false,
                    error: action.payload
                },
            };
        
        default:
            return state;
    }
}

export const authenticateUserReducer: Reducer<
    AuthenticateUserState,
    AuthenticateUserActions
> = (
    state = {},
    action
) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return {
                ...state,
                authenicateUser: {
                    loading: true,
                },
            };

        case AUTHENTICATE_USER_SUCCESS:
            return {
                ...state,
                authenicateUser: {
                    loading: false,
                    success: action.payload
                },
            };
    
        case AUTHENTICATE_USER_FAIL:
            return {
                ...state,
                authenicateUser: {
                    loading: false,
                    error: action.payload,
                },
            };

        default:
            return state;
    }
}
