import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ItemsState, itemsReducer } from "@item/reducers";
import { selectItems } from "@item/epics";
import { useReducer } from "@hooks/useReducer";
import { ClearItems, GetItems } from "@item/actions";
import { selectAuthenticateUser } from "@login/epics";
import { isUndefined } from "lodash";


export const useItems = (): ItemsState["items"] => {
    const dispatch = useDispatch();

    // const user = useSelector(selectAuthenticateUser)?.authenicateUser?.success?.user;
    const itemsState = useSelector(selectItems)?.items;

    useReducer("items", itemsReducer);

    // useEffect(() => {
    //     return () => {
    //         dispatch(ClearItems());
    //     };
        
    // }, []);

    useEffect(() => {
        dispatch(GetItems({ status: "ongoing" }));
    }, []);
    
    return itemsState;
}