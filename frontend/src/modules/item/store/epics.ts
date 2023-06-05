import { of } from "rxjs";
import { filter, switchMap, map, catchError } from "rxjs/operators";

import { State, Epic } from "@item/store";
import { CreateItemState, ItemsState } from "@item/reducers";
import { 
    CREATE_ITEM,
    CreateItemAction,
    CreateItemFail,
    CreateItemSuccess,
    GET_ITEMS, 
    GetItemsAction, 
    GetItemsFail, 
    GetItemsSuccess
} from "@item/actions";
import { 
    createItem, 
    getItems 
} from "@item/api/item-api";



export const selectItems = (state: State): ItemsState | undefined =>
    state.items;

export const selectCreateItem = (state: State): CreateItemState | undefined =>
    state.createItem;

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

export const createItemEpic: Epic = (action$) => {
    return action$.pipe(
        filter(
            (action): action is CreateItemAction => action.type === CREATE_ITEM,
        ),
        switchMap(({ payload }) =>
            createItem(payload).pipe(
                map((response) => CreateItemSuccess(response)),
                catchError((error) => of(CreateItemFail(error))),
            ),  
        ),  
    );
}