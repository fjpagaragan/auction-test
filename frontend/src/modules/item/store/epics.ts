import { of } from "rxjs";
import { filter, switchMap, map, catchError } from "rxjs/operators";

import { State, Epic } from "./";
import { ItemsState } from "@item/reducers";
import { 
    GET_ITEMS, 
    GetItemsAction, 
    GetItemsFail, 
    GetItemsSuccess
} from "@item/actions";
import { getItems } from "@item/api/item-api";



export const selectItems = (state: State): ItemsState | undefined =>
    state.items;

export const getItemsEpic: Epic = (actions$) => {
    return actions$.pipe(
        filter(
            (action): action is GetItemsAction => action.type === GET_ITEMS,
        ),
        switchMap(({ payload: params }) =>
            getItems(params).pipe(
                map((response) => GetItemsSuccess(response)),
                catchError((error) => of(GetItemsFail(error))),
            ),
        ),
    );
}