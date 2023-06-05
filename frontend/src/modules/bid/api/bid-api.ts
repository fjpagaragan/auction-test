import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MakeBidApiParameters, MakeBidApiResponse } from "@bid/response";
import { BID_API } from "@utils/api/api-url";
import { ajaxPost } from "@utils/ajax-util";



export const makeBid = (
    payload: MakeBidApiParameters,
): Observable<MakeBidApiResponse> => {
    const url = BID_API;

    const body = {
        ...payload
    };

    return ajaxPost<MakeBidApiResponse>({ url }, { ...body }).pipe(
        map((response) => response.response)
    );
}