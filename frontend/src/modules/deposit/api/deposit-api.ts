import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { DepositApiParameters, DepositApiResponse } from "@deposit/response";
import { ajaxGet, ajaxPost } from "@utils/ajax-util";
import { DEPOSIT_API } from "@utils/api/api-url";



export const getDeposit = (
): Observable<DepositApiResponse> => {
    const url = DEPOSIT_API;

    return ajaxGet<DepositApiResponse>({ url }).pipe(
        map((response) => response.response),
    );
}

export const makeDeposit = (
    payload: DepositApiParameters,
): Observable<DepositApiResponse> => {
    const url = DEPOSIT_API;
    const body = {
        ...payload
    };

    return ajaxPost<DepositApiResponse>({ url }, { ...body }).pipe(
        map((response) => response.response),
    );
}