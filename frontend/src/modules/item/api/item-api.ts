import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ItemApiParameters, ItemApiResponse } from "@item/response";
import { ajaxGet } from "@utils/ajax-util";
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
}