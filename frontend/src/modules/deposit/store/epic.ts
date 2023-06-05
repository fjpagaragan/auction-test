import { of } from "rxjs";
import { filter, switchMap, map, catchError } from "rxjs/operators";

import { Epic, State } from "@deposit/store";
import { DepositState } from "@deposit/reducers";
import { GET_DEPOSIT, GetDepositAction, GetDepositFail, GetDepositSuccess } from "@deposit/actions";
import { getDeposit } from "@deposit/api/deposit-api";


export const selectDeposit = (state: State): DepositState | undefined =>
    state.deposit;

export const getDepositEpic: Epic = (actions$) => {
    return actions$.pipe(
        filter(
            (action): action is GetDepositAction => action.type === GET_DEPOSIT,
        ),
        switchMap(({ payload: params }) =>
            getDeposit(params).pipe(
                map((response) => GetDepositSuccess(response)),
                catchError((error) => of(GetDepositFail(error))),
            ),
        ),
    );
}