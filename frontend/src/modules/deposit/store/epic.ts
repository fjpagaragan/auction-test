import { of } from "rxjs";
import { filter, switchMap, map, catchError } from "rxjs/operators";

import { Epic, State } from "@deposit/store";
import { GetDepositState, MakeDepositState } from "@deposit/reducers";
import { GET_DEPOSIT, GetDepositAction, GetDepositFail, GetDepositSuccess, MAKE_DEPOSIT, MakeDepositAction, MakeDepositFail, MakeDepositSuccess } from "@deposit/actions";
import { getDeposit, makeDeposit } from "@deposit/api/deposit-api";


export const selectDeposit = (state: State): GetDepositState | undefined =>
    state.deposit;

export const selectMakeDeposit = (state: State): MakeDepositState | undefined =>
    state.makeDeposit;

export const getDepositEpic: Epic = (actions$) => {
    return actions$.pipe(
        filter(
            (action): action is GetDepositAction => action.type === GET_DEPOSIT,
        ),
        switchMap(({ }) =>
            getDeposit().pipe(
                map((response) => GetDepositSuccess(response)),
                catchError((error) => of(GetDepositFail(error))),
            ),
        ),
    );
};

export const makeDepositEpic: Epic = (actions$) => {
    return actions$.pipe(
        filter(
            (action): action is MakeDepositAction => action.type === MAKE_DEPOSIT,
        ),
        switchMap(({ payload }) =>
            makeDeposit(payload).pipe(
                map((response) => MakeDepositSuccess(response)),
                catchError((error) => of(MakeDepositFail(error))),
            ),
        ),
    );
};
