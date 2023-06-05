import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CreateItemApiParameters, ItemApiParameters, ItemApiResponse } from "@item/response";
import { ajaxGet, ajaxPost } from "@utils/ajax-util";
import { ITEM_API } from "@utils/api/api-url";



export const getItems = (
    payload: ItemApiParameters,
): Observable<ItemApiResponse[]> => {
    const url = ITEM_API;
    const params = {
        status: payload.status
    }

    return ajaxGet<ItemApiResponse[]>({ url, params }).pipe(
        map((response) => response.response),
    );
};


export const createItem = (
    payload: CreateItemApiParameters,
): Observable<ItemApiResponse> => {
    const url = ITEM_API;
    const body = {
        ...payload
    };

    return ajaxPost<ItemApiResponse>({ url }, { ...body }).pipe(
        map((response) => response.response)
    );
}