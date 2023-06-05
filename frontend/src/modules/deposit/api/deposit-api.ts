import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { DepositApiParameters, DepositApiResponse } from "@deposit/response";
import { ajaxGet } from "@utils/ajax-util";
import { DEPOSIT_API } from "@utils/api/api-url";



export const getDeposit = (
    payload: DepositApiParameters,
): Observable<DepositApiResponse> => {
    const url = DEPOSIT_API;
    const params = {
        ...payload
    };

    return ajaxGet<DepositApiResponse>({ url, params }).pipe(
        map((response) => response.response),
    );
}